import { useState, useEffect } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { formSchema } from "@/utils/validation.schema";
import { useLoginMutation } from "../api/auth.api";
import { storeToken } from "@/config/token";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/app/app.hooks";
import { clearEmail, setEmail } from "@/app/features/app.slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const navigate = useNavigate();
  const [doLogin] = useLoginMutation();
  const dispatch = useAppDispatch();
  const emailState = useAppSelector((state) => state.app.email);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      dispatch(setEmail(username));
      form.setValue("email", username);
      setShowPassword(true);
    }
  }, []); // Empty dependency array

  async function handleNextClick() {
    try {
      // Trigger validation only for the email field
      const result = await form.trigger("email");

      if (result) {
        const email = form.getValues("email");
        dispatch(setEmail(email));
        setShowPassword(true);
      }
      // If validation fails, the error will be displayed automatically
    } catch (error) {
      console.error("Validation error:", error);
    }
  }

  function handleBack() {
    dispatch(clearEmail(""));
    setShowPassword(false);
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await doLogin(data).unwrap();
     if (response.token) {
       storeToken("access_token", response.token);
       toast.success("Login successful");
       setTimeout(() => navigate("/admin/dashboard"), 0); // Adjust timing if needed
     } else {
     }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null) {
        if ("status" in error) {
          // This is a FetchBaseQueryError
          const fetchError = error as FetchBaseQueryError;
          if (
            typeof fetchError.data === "object" &&
            fetchError.data !== null &&
            "message" in fetchError.data
          ) {
            toast.error(fetchError.data.message as string);
          } else {
            toast.error("An error occurred during login.");
          }
        } else if ("message" in error) {
          // This might be a SerializedError
          toast.error(error.message as string);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container flex flex-col gap-4 lg:w-[50%] h-auto">
      <h1 className="text-3xl capitalize font-bold w-fit mx-auto mb-10">
        Welcome back
      </h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          {!showPassword ? (
            <motion.div
              key="username"
              initial={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <Input placeholder=" Email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button
                className="w-full mt-4"
                type="button"
                onClick={handleNextClick}
              >
                Next
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="password"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {emailState && (
                <p className="mb-4">Logging in as: {emailState}</p>
              )}
              <div>
                <div className="relative">
                  <Input
                    type={showPasswordText ? "text" : "password"}
                    placeholder="Password"
                    {...form.register("password")}
                  />

                  <div
                    className="absolute right-2 top-2"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                  >
                    {showPasswordText ? <HiEyeOff /> : <HiEye />}
                  </div>
                </div>
                {form.formState.errors.password && (
                  <p className="text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button className="w-full mt-4" type="submit">
                Submit
              </Button>
              <Button
                className="w-full mt-4"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
