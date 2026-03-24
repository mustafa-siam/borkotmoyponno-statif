"use client";

import PublicRoute from "@/components/layout/shared/PublicRouter";
import { useHandleSingUpMutation } from "@/redux/features/users/userApi";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ActiveAccount = () => {
  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
    } else {
      toast.error("Token not found in the URL");
    }
  }, [searchParams]);
  const [setActiveAccount] = useHandleSingUpMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [activationSuccess, setActivationSuccess] = useState<boolean | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const activateAccount = async () => {
      if (token) {
        setLoading(true);
        try {
          await setActiveAccount({ token }).unwrap();
          setActivationSuccess(true);
          setTimeout(() => router.push("/"), 2000);
        } catch (error: any) {
          console.log(error);
          toast.error(error?.data?.payload?.message || "Failed activation");
          setActivationSuccess(false);
        } finally {
          setLoading(false);
        }
      }
    };

    activateAccount();
  }, [token, setActiveAccount, router]);

  return (
    <PublicRoute>
      <div className="flex items-center justify-center h-screen bg-gray-50/50">
        <div
          className={`text-center p-8 border border-gray-100 shadow-sm transition-all duration-500 ${
            loading
              ? "bg-white"
              : activationSuccess === true
              ? "bg-white border-green-100"
              : activationSuccess === false
              ? "bg-white border-red-100"
              : "bg-white"
          } max-w-sm w-full mx-4`}
        >
          <div className="text-2xl font-bold text-midnight-navy">
            Account Activation
          </div>
          <div className="mt-5">
            {loading ? (
              <div className="text-base font-medium text-forest-green flex justify-center items-center space-x-2">
                <FaSpinner className="animate-spin" size={20} />
                <span>Activating your account...</span>
              </div>
            ) : activationSuccess === null ? (
              <div className="text-base font-medium text-gray-400">
                Activating...
              </div>
            ) : activationSuccess ? (
              <div className="text-base font-medium text-green-600 flex justify-center items-center space-x-2">
                <FaCheckCircle size={20} />
                <span>Account activated successfully!</span>
              </div>
            ) : (
              <div className="text-base font-medium text-red-500 flex justify-center items-center space-x-2">
                <FaTimesCircle size={20} />
                <span>Activation failed. Please try again.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default dynamic(() => Promise.resolve(ActiveAccount), { ssr: false });
