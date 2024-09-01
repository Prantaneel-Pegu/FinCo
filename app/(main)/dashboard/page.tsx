import { CurrencyContextType } from "@/app/lib/types";
import DashboardComponent from "@/app/ui/dashboard/dashboard-component";
import { UserDataContext } from "@/app/ui/main/user-data-provider";
import { CurrencyContext } from "@/app/ui/main/currency-provider";
import { UserDataContextType } from "@/app/ui/main/user-data-provider";
import { useContext } from "react";

export default function Dashboard() {
    const { userData, updateUserData } =
        useContext<UserDataContextType>(UserDataContext);
    const { currencyData, updateCurrencyData } =
        useContext<CurrencyContextType>(CurrencyContext);

    return (
        <DashboardComponent
            userData={userData}
            currencyData={currencyData}
            updateCurrencyData={updateCurrencyData}
        />
    );
}
