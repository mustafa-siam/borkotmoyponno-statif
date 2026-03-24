"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useHandleLogOutMutation } from "@/redux/features/auth/authApi";
import { LogOut, KeyRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import Loading from "@/components/layout/Home/shared/loading";
import toast from "react-hot-toast";

export default function DashboardSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const router = useRouter();
  const [path2] = path?.split("/")?.slice(2, 3);
  const path3 = path2?.split("-")?.join(" ");
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [handleLogOut, { isLoading: isLoggingOut }] = useHandleLogOutMutation();

  const handleLogout = async () => {
    try {
      // Close the modal and show loading
      setLogoutModalOpen(false);

      // Wait for logout API to complete
      await handleLogOut().unwrap();

      // Clear local storage
      if (typeof window !== "undefined") {
        localStorage.clear();
      }

      toast.success("Logged out successfully");

      // Small delay to ensure everything is cleared before redirect
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error: any) {
      console.error("Logout error:", error);

      // Even if API call fails, clear local storage and redirect
      if (typeof window !== "undefined") {
        localStorage.clear();
      }

      toast.error("Logged out");

      // Small delay before redirect
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  };

  return (
    <SidebarProvider className="relative">
      {isLoggingOut && <Loading />}
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList className="text-gray-500 no-underline">
                <BreadcrumbItem className="hidden md:block text-gray-500">
                  <Link
                    href="/dashboard"
                    className="no-underline capitalize cursor-pointer "
                  >
                    Dashboard
                  </Link>
                </BreadcrumbItem>
                {path3 && <BreadcrumbSeparator className="hidden md:block" />}
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-600 capitalize cursor-pointer">
                    {path3}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 px-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => router.push("/dashboard/update-password")}
            >
              <KeyRound size={16} />
              <span className="hidden sm:inline">Update Password</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setLogoutModalOpen(true)}
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>
        <div className="p-4 pt-0 z-2">{children}</div>
        <div
          className={`absolute bottom-0 right-0 w-full h-[calc(100vh-200px)] bg-linear-to-t `}
        />
      </SidebarInset>

      {/* Logout Confirmation Modal */}
      <AlertDialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will log you out of your account. You will need to
              sign in again to access your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoggingOut}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
            >
              {isLoggingOut ? "Logging out..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
