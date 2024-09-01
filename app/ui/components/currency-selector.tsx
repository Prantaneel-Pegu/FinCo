"use client";

import { useCallback, useContext, useMemo } from "react";
import { CurrencyContext, CurrencyContextType } from "./currency-provider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/ui/shadcn-components/ui/select";
import getSymbolFromCurrency from "currency-symbol-map";

export default function CurrencySelector() {
    const { currencyData, updateCurrencyData } =
        useContext<CurrencyContextType>(CurrencyContext);

    const changeCurrency = useCallback(
        (targetCurrency: string) => {
            updateCurrencyData({ ...currencyData, currency: targetCurrency });
            console.log("UPDATED", targetCurrency);
        },
        [currencyData, updateCurrencyData],
    );

    const currencyItems = useMemo(() => {
        return Object.keys(currencyData.currenciesList).map(
            (currency, index) => {
                const currencySymbol = getSymbolFromCurrency(currency);

                return currency !== "USD" && currencySymbol ? (
                    <SelectItem value={currency} key={index}>
                        ({currencySymbol}) {currency}
                    </SelectItem>
                ) : null;
            },
        );
    }, [currencyData.currenciesList]);

    return (
        <div className="flex justify-end">
            <Select onValueChange={(selection) => changeCurrency(selection)}>
                <SelectTrigger className="w-max">
                    <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="USD" key={"defaultCurrency"}>
                        ($) USD
                    </SelectItem>

                    {currencyItems}
                </SelectContent>
            </Select>
        </div>
    );
}
