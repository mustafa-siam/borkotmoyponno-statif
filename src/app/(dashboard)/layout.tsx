import DashboardSidebar from "@/components/layout/dashboard/shared/Sidebar";
import AdminRouter from "@/components/layout/shared/AdminRouter";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AdminRouter>
      <div>
        <DashboardSidebar>{children}</DashboardSidebar>
      </div>
    </AdminRouter>
  );
};

export default DashboardLayout;
