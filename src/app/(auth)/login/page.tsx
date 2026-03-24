"use client";

import Loading from "@/components/layout/Home/shared/loading";
import PublicRoute from "@/components/layout/shared/PublicRouter";
import { Button } from "@/components/ui/button";
import { useHandleLoginMutation } from "@/redux/features/auth/authApi";
import { Eye, EyeOff, Leaf } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [setLoadingData, { isLoading }] = useHandleLoginMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      await setLoadingData(loginInfo).unwrap();
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error login", error);
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <PublicRoute>
      {isLoading && <Loading />}
      <div className="flex items-center justify-center min-h-screen bg-[#f8faf9] px-4 font-sans">
        {/* Card redesign: Shadows removed, keeping a clean flat border */}
        <div className="w-full max-w-md p-8 bg-white rounded-2xl border-t-4 border-t-forest-green border border-gray-200">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mb-3">
              <Leaf className="text-forest-green w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-midnight-navy text-center mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-center text-sm">
              Sign in to your Borkotmoy Ponno account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-all bg-gray-50/50 focus:bg-white`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1.5 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-forest-green hover:text-deepGreen font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.password ? "border-red-400" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-all bg-gray-50/50 focus:bg-white`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-forest-green transition-colors p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1.5 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button: Shadows removed */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-4 bg-forest-green text-white rounded-lg font-semibold hover:bg-deepGreen hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-forest-green font-semibold hover:text-deepGreen hover:underline transition-all"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default Login;
