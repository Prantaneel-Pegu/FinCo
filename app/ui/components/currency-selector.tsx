"use client";

import { useCallback, useContext, useMemo } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/ui/shadcn-components/ui/select";
import getSymbolFromCurrency from "currency-symbol-map";
import { CurrencyData, UpdateCurrencyData } from "@/app/lib/types";

export default function CurrencySelector({
    currencyData,
    updateCurrencyDataContainer,
}: {
    currencyData: CurrencyData;
    updateCurrencyDataContainer: { updateCurrencyData: UpdateCurrencyData }; // Since functions cannot be passed to client components
}) {
    const updateCurrencyData = updateCurrencyDataContainer.updateCurrencyData;

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
            <Select
                onValueChange={(selection) => changeCurrency(selection)}
                defaultValue="USD"
            >
                <SelectTrigger className="w-max">
                    <SelectValue placeholder={"($) USD"} />
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
