import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

const DashboardAdminPage = () => {
    return (
        <DashboardLayout title="Acara | Admin" description="Dashboard admin" type="admin">
           <Dashboard />
        </DashboardLayout>
    );
};

export default DashboardAdminPage;