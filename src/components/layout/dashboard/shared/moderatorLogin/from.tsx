"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useHandleMakeModeratorMutation } from "@/redux/features/auth/authApi";
import { useGetAllUserQuery } from "@/redux/features/users/userApi";

export default function ModeratorLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [handleMakeModerator, { isLoading }] = useHandleMakeModeratorMutation();
  // const router = useRouter();
  const { refetch } = useGetAllUserQuery({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      await handleMakeModerator(payload).unwrap();
      toast.success("Login successful");
      refetch();

      window.location.reload();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center  p-4">
      <div className="w-full max-w-sm space-y-8 backdrop-blur-sm bg-white p-8 rounded-2xl shadow-lg border border-border/50">
        <div className="">
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </div>
        <div className="space-y-4 text-center">
          <div className="mx-auto w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center ring-8 ring-primary/5">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Make Moderator</h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to give access the moderator
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="name"
                placeholder="Enter moderator name"
                className="w-full bg-background/50 border-border/50 focus:border-primary/50 pl-10"
                disabled={isLoading}
                {...register("name", {
                  required: "name is required",
                })}
              />
              <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter admin email"
                className="w-full bg-background/50 border-border/50 focus:border-primary/50 pl-10"
                disabled={isLoading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                className="w-full bg-background/50 border-border/50 focus:border-primary/50 pr-10 pl-10"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full text-base font-medium h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                <span>Please Wait...</span>
              </div>
            ) : (
              "access"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
