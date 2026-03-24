"use client";

import Loading from "@/components/layout/Home/shared/loading";
import PublicRoute from "@/components/layout/shared/PublicRouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHandleResetPasswordMutation } from "@/redux/features/auth/authApi";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  password: string;
};

const ResetPassword = () => {
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [resetPasswordData, { isLoading }] = useHandleResetPasswordMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
    } else {
      toast.error("Token not found in the URL");
    }
  }, [searchParams]);

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Token is missing. Please try again.");
      return;
    }
    const userInfo = {
      password: data.password,
      token,
    };

    try {
      await resetPasswordData(userInfo).unwrap();
      router.push("/login");
      toast.success("Password reset successfully");
    } catch (error: any) {
      console.error("Error login", error);

      toast.error(error?.data?.message || "Failure login");
    }
  };


  return (
    <PublicRoute>
      {isLoading && <Loading />}
      <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
        <div className="w-full max-w-sm p-8 bg-white border border-gray-100 shadow-sm mx-4">
          <h2 className="text-2xl font-bold text-midnight-navy text-center mb-1">
            Reset Password
          </h2>
          <p className="text-gray-400 text-center text-sm mb-8">
            Enter your new password below
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter your Password"
                  className="w-full px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green transition-colors"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 bg-forest-green text-white font-medium hover:bg-deepGreen transition-colors cursor-pointer"
              >
                Reset Your Password
              </Button>
            </div>

            <p className="text-xs text-gray-400 mt-5 text-center">
              Back to Login?{" "}
              <Link href="/login" className="text-forest-green hover:text-deepGreen transition-colors">
                Reset it here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </PublicRoute>
  );
};

export default dynamic(() => Promise.resolve(ResetPassword), { ssr: false });
