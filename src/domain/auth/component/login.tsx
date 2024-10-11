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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [storedEmail, setStoredEmail] = useState("");
  const [showPasswordText, setShowPasswordText] = useState(false);
  const navigate = useNavigate();
  const [doLogin] = useLoginMutation();

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
      setStoredEmail(username);
      setShowPassword(true);
    }
  }, []); // Empty dependency array

  function handleNextClick() {
    const username = form.getValues("email");
    if (username.length >= 2) {
      localStorage.setItem("username", username);
      setStoredEmail(username);
      setShowPassword(true);
    } else {
      form.setError("email", {
        type: "manual",
        message: "Username must be at least 2 characters.",
      });
    }
  }

  function handleBack() {
    setShowPassword(false);
    setStoredEmail("");
    localStorage.removeItem("username");
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await doLogin(data).unwrap();
      if (response.access_token) {
        storeToken("access_token", response.access_token);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[50%] h-auto">
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
              {storedEmail && (
                <p className="mb-4">Logging in as: {storedEmail}</p>
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
