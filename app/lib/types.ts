export type AssetsData = {
    name: string;
    value: number;
    riskValue: number;
    interest: number;
    interestRate: number; // in decimal form: e.g. 15% p.a. = 15/100 = 0.15
}[];

export type LocalisedAssetsData = {
    name: string;
    value: string;
    riskValue: number;
    interest: string;
    interestRate: number; // in decimal form: e.g. 15% p.a. = 15/100 = 0.15
}[];

export type UserData = {
    name: string;
    userName: string;
    email: string;
    avatarLink: string;
    netWorth: number;
    assets: AssetsData;
};

export type LocalisedUserData = {
    name: string;
    userName: string;
    avatarLink: string;
    email: string;
    netWorth: string;
    assets: LocalisedAssetsData;
};

export type AssetsTableData = {
    name: string;
    value: string;
    percentageOfNetWorth: number;
}[];

export type AssetsPieChartData = {
    name: string;
    value: number;
    percentageOfNetWorth: number;
}[];

export type AssetsRiskData = {
    name: string;
    percentageOfNetWorth: number;
    riskValue: number;
    riskContribution: number;
}[];

export type AssetsRiskBarChartData = {
    asset: string;
    riskPoints: number;
}[];

export type AssetsInterestData = {
    name: string;
    value: number;
    interest: string;
    interestRate: number;
    percentageOfNetWorth: number;
}[];

export const userDataSkeleton: UserData = {
    name: "",
    userName: "",
    avatarLink: "",
    email: "",
    netWorth: 0,
    assets: [
        {
            name: "Cash",
            value: 0,
            riskValue: 0,
            interest: 0,
            interestRate: 0,
        },
        {
            name: "Stocks",
            value: 0,
            riskValue: 0,
            interest: 0,
            interestRate: 0,
        },
        {
            name: "Bonds",
            value: 0,
            riskValue: 0,
            interest: 0,
            interestRate: 0,
        },
        {
            name: "Properties",
            value: 0,
            riskValue: 0.1,
            interest: 0,
            interestRate: 0,
        },
    ],
};

export type UserDataContextType = {
    userData: UserData;
    updateUserData: UpdateUserData;
};

export type UpdateUserData = (newUserData: UserData) => void;

export type CurrencyData = {
    currency: string;
    currencySybmol: string;
    conversionRate: number;
    currenciesList: any;
};

export type UpdateCurrencyData = (newCurrencyData: CurrencyData) => void;

export type CurrencyContextType = {
    currencyData: CurrencyData;
    updateCurrencyData: UpdateCurrencyData;
};
