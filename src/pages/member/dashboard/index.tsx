import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";

const DashboardMemberPage = () => {
    return (
        <DashboardLayout title="Acara | Member" description="Dashboard member" type="member">
           <Dashboard />
        </DashboardLayout>
    );
};

export default DashboardMemberPage;