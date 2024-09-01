"use client";

import {
    getConversionRate,
    getCurrenciesList,
} from "@/app/lib/exchange-rate-api/utils";
import getSymbolFromCurrency from "currency-symbol-map";
import isEqual from "lodash.isequal";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    CurrencyContextType,
    CurrencyData,
    UserDataContextType,
} from "@/app/lib/types";
import { UserDataContext } from "./user-data-provider";

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
    const { userData, updateUserData } =
        useContext<UserDataContextType>(UserDataContext);

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
                const cSymbol =
                    getSymbolFromCurrency(newCurrencyData.currency) || " ";
                const cRate = result.conversionRate;

                const newUserData = Object.fromEntries(
                    Object.entries(userData).map(([key, value]) => {
                        if (typeof value === "number") {
                            return [
                                key,
                                parseFloat((value * cRate).toFixed(2)),
                            ];
                        } else return [key, value];
                    }),
                );
                setCurrencyData({
                    ...newCurrencyData,
                    currencySybmol: cSymbol,
                    conversionRate: cRate,
                });
                updateUserData({ ...newUserData });

                console.log("SET TO", newCurrencyData, newUserData, userData);
            });
        },
        [currencyData.currency, updateUserData, userData],
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
