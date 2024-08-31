"use client";

import { useContext } from "react";
import { CurrencyContext, CurrencyContextType } from "./currency-provider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/ui/shadcn-components/ui/select";

export default function CurrencySelector() {
    const { currencyData, updateCurrencyData } =
        useContext<CurrencyContextType>(CurrencyContext);

    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                {Object.keys(currencyData.currenciesList).map(
                    (currency, index) =>
                        currency !== "USD" ? (
                            <SelectItem value={currency} key={index}>
                                {currency}
                            </SelectItem>
                        ) : null,
                )}
            </SelectContent>
        </Select>
    );
}
