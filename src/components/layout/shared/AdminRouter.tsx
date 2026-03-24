"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../Home/shared/loading";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";

const AdminRouter = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useLoggedInUserQuery();
  const user = data?.payload;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user?.email) {
        router.push("/login");
      } else if (user?.role !== "admin" && user?.role !== "moderator") {
        router.push("/");
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (user?.role === "admin" || user?.role === "moderator") {
    return <>{children}</>;
  }

  return null;
};

export default AdminRouter;
