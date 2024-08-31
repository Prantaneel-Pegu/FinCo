"use client";

import { getCurrenciesList } from "@/app/lib/exchange-rate-api/utils";
import isEqual from "lodash.isequal";
import { createContext, useCallback, useEffect, useState } from "react";

export type CurrencyData = {
    currency: string;
    conversionRate: number;
    currenciesList: any;
};

export type CurrencyContextType = {
    currencyData: CurrencyData;
    updateCurrencyData: (newCurrencyData: CurrencyData) => void;
};

export const CurrencyContext = createContext<CurrencyContextType>({
    currencyData: {
        currency: "USD",
        conversionRate: 1,
        currenciesList: {},
    },
    updateCurrencyData: () => {},
});

export default function CurrencyProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [currencyData, setCurrencyData] = useState<CurrencyData>({
        currency: "USD",
        conversionRate: 1,
        currenciesList: { USD: "USD" },
    });

    const updateCurrencyData = useCallback((newCurrencyData: CurrencyData) => {
        setCurrencyData(newCurrencyData);
    }, []);

    const fetchCurrenciesList = useCallback(() => {
        getCurrenciesList().then((response) => {
            const { data, error } = response;
            const newCurrenciesData = {
                ...currencyData,
                error: error,
                currenciesList: data,
            };
            if (!isEqual(currencyData, newCurrenciesData)) {
                updateCurrencyData(newCurrenciesData);
            }
        });
    }, [updateCurrencyData, currencyData]);

    useEffect(() => {
        fetchCurrenciesList();
    }, [fetchCurrenciesList]);

    return (
        <CurrencyContext.Provider
            value={{
                currencyData: currencyData,
                updateCurrencyData: updateCurrencyData,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}
