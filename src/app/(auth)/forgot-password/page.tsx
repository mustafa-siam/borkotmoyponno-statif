"use client";

import Loading from "@/components/layout/Home/shared/loading";
import PublicRoute from "@/components/layout/shared/PublicRouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHandleForgotPasswordMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

const ForgotPassword = () => {
  const [setForgotPasswordData, { isLoading }] =
    useHandleForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const userInfo = {
      email: data.email,
    };

    try {
      await setForgotPasswordData(userInfo).unwrap();
      toast.success("Forgot password Check your email");
    } catch (error: any) {
      console.error("Error login", error);

      toast.error(error?.data?.message || "failed Forgot Password");
    }
  };


  return (
    <PublicRoute>
      {isLoading && <Loading />}
      <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
        <div className="w-full max-w-sm p-8 bg-white border border-gray-100 shadow-sm mx-4">
          <h2 className="text-2xl font-bold text-midnight-navy text-center mb-1">
            Forgot Password
          </h2>
          <p className="text-gray-400 text-center text-sm mb-8">
            Enter your email to reset your password
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 bg-forest-green text-white font-medium hover:bg-deepGreen transition-colors cursor-pointer"
              >
                Send Email
              </Button>
            </div>
          </form>
          <div className="text-center mt-5">
            <p className="text-xs text-gray-400">
              Back to Login?{" "}
              <Link href="/login" className="text-forest-green hover:text-deepGreen transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default ForgotPassword;
