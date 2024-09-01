"use client";

import {
    getConversionRate,
    getCurrenciesList,
} from "@/app/lib/exchange-rate-api/utils";
import getSymbolFromCurrency from "currency-symbol-map";
import isEqual from "lodash.isequal";
import { createContext, useCallback, useEffect, useState } from "react";

export type CurrencyData = {
    currency: string;
    currencySybmol: string;
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
        currencySybmol: "$",
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
        currencySybmol: "$",
        conversionRate: 1,
        currenciesList: { USD: "USD" },
    });

    const updateCurrencyData = useCallback(
        (newCurrencyData: CurrencyData) => {
            getConversionRate(
                currencyData.currency,
                newCurrencyData.currency,
            ).then((result) => {
                const currencySymbol =
                    getSymbolFromCurrency(newCurrencyData.currency) || " ";
                setCurrencyData({
                    ...newCurrencyData,
                    currencySybmol: currencySymbol,
                    conversionRate: result.conversionRate,
                });
                console.log("SET TO", newCurrencyData);
            });
        },
        [currencyData.currency],
    );

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
