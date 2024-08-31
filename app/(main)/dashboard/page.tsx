import { userDataSkeleton } from "@/app/lib/types";
import DashboardComponent from "@/app/ui/dashboard/dashboard-component";

export default function Dashboard() {
    return <DashboardComponent userData={userDataSkeleton} />;
}
