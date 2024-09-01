"use client";

import { CurrencyContextType, UserDataContextType } from "@/app/lib/types";
import DashboardComponent from "@/app/ui/dashboard/dashboard-component";
import { UserDataContext } from "@/app/ui/demo/user-data-provider";
import { CurrencyContext } from "@/app/ui/demo/currency-provider";
import { useContext } from "react";

export default function DemoDashboard() {
    const { userData, updateUserData } =
        useContext<UserDataContextType>(UserDataContext);
    const { currencyData, updateCurrencyData } =
        useContext<CurrencyContextType>(CurrencyContext);

    return (
        <DashboardComponent
            userData={userData}
            currencyData={currencyData}
            updateCurrencyDataContainer={{
                updateCurrencyData: updateCurrencyData,
            }}
        />
    );
}
