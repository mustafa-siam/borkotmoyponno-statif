"use client";

import Heading from "@/components/layout/dashboard/shared/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHandleUpdatePasswordMutation } from "@/redux/features/auth/authApi";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword = () => {
  const [handleUpdatePassword, { isLoading: updatePasswordLoading }] =
    useHandleUpdatePasswordMutation();

  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<IUpdatePasswordRequest>();

  // Watch the newPassword field to validate confirmPassword
  const newPassword = useWatch({ control, name: "newPassword" });

  const passwordUpdate = async (formData: IUpdatePasswordRequest) => {
    try {
      await handleUpdatePassword(formData).unwrap();
      toast.success("Password updated successfully");
      reset();
    } catch (error: any) {
      toast.error(error?.data?.payload?.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="max-w-screen-lg px-4">
      <Heading title="Add Review" subTitle="Add a new review to your website" />
      <form className="space-y-5 mt-10" onSubmit={handleSubmit(passwordUpdate)}>
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <div className="relative">
            <Input
              type={passwordVisibility.oldPassword ? "text" : "password"}
              placeholder="Old Password"
              {...register("oldPassword", {
                required: "Old password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                  message:
                    "Password must include a letter, a number, and a special character",
                },
              })}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("oldPassword")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisibility.oldPassword ? <FaEyeSlash /> : <IoEyeSharp />}
            </button>
          </div>
          {errors.oldPassword && (
            <span className="text-red-500 text-xs">
              {errors.oldPassword.message}
            </span>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <Input
              type={passwordVisibility.newPassword ? "text" : "password"}
              placeholder="New Password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password must include a letter, a number, and a special character",
                },
              })}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisibility.newPassword ? <FaEyeSlash /> : <IoEyeSharp />}
            </button>
          </div>
          {errors.newPassword && (
            <span className="text-red-500 text-xs">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              type={passwordVisibility.confirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPassword || "Confirm password does not match",
              })}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisibility.confirmPassword ? (
                <FaEyeSlash />
              ) : (
                <IoEyeSharp />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={updatePasswordLoading}>
          {updatePasswordLoading ? "Please Wait..." : "Set New Password"}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
