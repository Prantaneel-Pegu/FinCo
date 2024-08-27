"use client";

import DashboardComponent from "@/app/ui/dashboard/dashboard-component";
import { demoUserData } from "@/app/lib/demo-user-data";

export default function DemoDashboard() {
    return <DashboardComponent userData={demoUserData} />;
}
