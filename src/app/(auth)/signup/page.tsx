"use client";

import Loading from "@/components/layout/Home/shared/loading";
import PublicRoute from "@/components/layout/shared/PublicRouter";
import { Button } from "@/components/ui/button";
// Removed custom Input import to fix react-hook-form ref bug
import { useHandleProcessSingUpMutation } from "@/redux/features/users/userApi";
import { Github, Leaf } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const SignUp = () => {
  const [setSignUp, { isLoading }] = useHandleProcessSingUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      await setSignUp(userData).unwrap();
      toast.success("Account created successfully!");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message || "Failed to sign up. Please try again.",
      );
    }
  };

  const handleGithubSignIn = () => {
    console.log("GitHub Sign In Triggered");
  };

  return (
    <PublicRoute>
      {isLoading && <Loading />}
      <div className="flex items-center justify-center min-h-screen bg-[#f8faf9] px-4 font-sans">
        {/* Card redesign: Flat design matching the Login page */}
        <div className="w-full max-w-md p-8 bg-white rounded-2xl border-t-4 border-t-forest-green border border-gray-200">
          {/* Header matched to brand identity */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mb-3">
              <Leaf className="text-forest-green w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-midnight-navy text-center mb-1">
              Create Account
            </h2>
            <p className="text-gray-500 text-center text-sm">
              Enter your details below to join Borkotmoy Ponno
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-all bg-gray-50/50 focus:bg-white`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters long",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1.5 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
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

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
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
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1.5 flex items-center">
                    <span className="mr-1">⚠️</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 bg-forest-green text-white rounded-lg font-semibold hover:bg-deepGreen hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Sign Up with Email"}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center my-6">
            <span className="w-full border-t border-gray-200"></span>
            <span className="px-3 text-gray-400 text-xs font-medium uppercase tracking-wider bg-white">
              or continue with
            </span>
            <span className="w-full border-t border-gray-200"></span>
          </div>

          {/* GitHub Button */}
          <Button
            onClick={handleGithubSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 rounded-lg py-3 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium"
          >
            <Github size={18} /> GitHub
          </Button>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              By clicking continue, you agree to our{" "}
              <Link
                href="#"
                className="text-forest-green hover:text-deepGreen hover:underline transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-forest-green hover:text-deepGreen hover:underline transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-forest-green font-semibold hover:text-deepGreen hover:underline transition-all"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default SignUp;
