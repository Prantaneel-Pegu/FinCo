"use client";

import { CurrencyContextType, UserDataContextType } from "@/app/lib/types";
import { UserDataContext } from "@/app/ui/demo/user-data-provider";
import { CurrencyContext } from "@/app/ui/demo/currency-provider";
import { useContext } from "react";
import SettingsComponent from "@/app/ui/account/settings/settings-component";

export default function DemoAccountSettings() {
    const { userData, updateUserData } =
        useContext<UserDataContextType>(UserDataContext);
    const { currencyData, updateCurrencyData } =
        useContext<CurrencyContextType>(CurrencyContext);

    return (
        <SettingsComponent
            userData={userData}
            updateUserData={{ updateUserData: updateUserData }}
            currencyData={currencyData}
            updateCurrencyData={{ updateCurrencyData: updateCurrencyData }}
        />
    );
}
