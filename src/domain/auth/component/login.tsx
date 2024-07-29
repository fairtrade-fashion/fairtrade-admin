import { useState, useEffect } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password is required",
  }),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [storedUsername, setStoredUsername] = useState("");
  const [showPasswordText, setShowPasswordText] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setStoredUsername(username);
      setShowPassword(true);
    }
  }, []); // Empty dependency array

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted", values);
    console.log("Form errors", form.formState.errors);
    localStorage.removeItem("username");
    navigate("/admin/dashboard");
  }

  function handleNextClick() {
    const username = form.getValues("username");
    if (username.length >= 2) {
      localStorage.setItem("username", username);
      setStoredUsername(username);
      setShowPassword(true);
    } else {
      form.setError("username", {
        type: "manual",
        message: "Username must be at least 2 characters.",
      });
    }
  }

  function handleBack() {
    setShowPassword(false);
    setStoredUsername("");
    localStorage.removeItem("username");
  }

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
                <Input
                  placeholder="Username or Email"
                  {...form.register("username")}
                />
                {form.formState.errors.username && (
                  <p className="text-red-500">
                    {form.formState.errors.username.message}
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
              {storedUsername && (
                <p className="mb-4">Logging in as: {storedUsername}</p>
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
