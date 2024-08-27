import { userDataSkeleton } from "../lib/types";
import DashboardComponent from "../ui/dashboard/dashboard-component";

export default function Dashboard() {
    return <DashboardComponent userData={userDataSkeleton} />;
}
