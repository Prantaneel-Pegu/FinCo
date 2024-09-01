"use server";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config({
    path: `../../../.env.development.local`,
});

// https://openexchangerates.org/api/latest.json?app_id=b780dc49ba0d4c739a388c81218d0d4e

const apiKey = process.env.OPEN_EXCHANGE_API_KEY;
const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
const apiCurrenciesUrl = `https://openexchangerates.org/api/currencies.json`;
const requestTimeout = 15000; // 15s
// const abortSignal = {
//     signal: AbortSignal.timeout(requestTimeout),
// };
const abortSignal = {};

export async function getAllExchangeRates() {
    let result: {
        data: any;
        error: string;
    } = {
        data: {},
        error: "",
    };

    try {
        result.data = (await axios.get(apiUrl, abortSignal)).data;
    } catch (error) {
        if (error instanceof Error) result.error = error.message;
        console.error("A Fatal Error Occurred: ", error);
    }

    return result;
}

export async function getConversionRate(base: string, targetCurrency: string) {
    let result: {
        conversionRate: number;
        error: string;
    } = {
        conversionRate: 1,
        error: "",
    };

    if (base === "USD") {
        try {
            result.conversionRate = parseFloat(
                (await axios.get(apiUrl, abortSignal)).data.rates[
                    targetCurrency
                ],
            );
        } catch (error) {
            if (error instanceof Error) result.error = error.message;
            console.error("A Fatal Error Occurred: ", error);
        }
    } else {
        try {
            const exchangeRates = (await axios.get(apiUrl, abortSignal)).data
                .rates;
            const baseRate = parseFloat(exchangeRates[base]);
            const targetCurrencyRate = parseFloat(
                exchangeRates[targetCurrency],
            );

            // result.conversionRate = parseFloat(
            //     ((1 / baseRate) * targetCurrencyRate).toFixed(6),
            // );
            result.conversionRate = (1 / baseRate) * targetCurrencyRate;
        } catch (error) {
            if (error instanceof Error) result.error = error.message;
            console.error("A Fatal Error Occurred: ", error);
        }
    }

    return result;
}

export async function convertCurrency(
    base: string,
    targetCurrency: string,
    amount: number,
) {
    return [
        parseFloat(
            (
                (await getConversionRate(base, targetCurrency)).conversionRate *
                amount
            ).toFixed(2),
        ),
        (await getConversionRate(base, targetCurrency)).conversionRate,
    ];
}

export async function getCurrenciesList() {
    let result: {
        data: any;
        error: string;
    } = {
        data: {},
        error: "",
    };

    try {
        result.data = (await axios.get(apiCurrenciesUrl, abortSignal)).data;
    } catch (error) {
        if (error instanceof Error) result.error = error.message;
        console.error("A Fatal Error Occurred: ", error);
    }

    return result;
}

// console.log(await convertCurrency("INR", "USD", 6216597.75));
// console.log(await convertCurrency("USD", "INR", 74108));
// console.log(await convertCurrency("INR", "JPY", 6216597.75));
// console.log(await convertCurrency("JPY", "INR", 10833477.98));
// console.log(await convertCurrency("AFN", "USD", 5230798.31));
// console.log(await convertCurrency("USD", "AFN", 74108));
