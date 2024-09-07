export type AssetsData = {
    name: string;
    value: number;
    riskValue: number;
}[];

export type LocalisedAssetsData = {
    name: string;
    value: string;
    riskValue: number;
}[];

export type UserData = {
    name: string;
    userName: string;
    avatarLink: string;
    netWorth: number;
    assets: AssetsData;
};

export type LocalisedUserData = {
    name: string;
    userName: string;
    avatarLink: string;
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
    riskContribution: number
}[];

export type AssetsRiskBarChartData = {
    asset: string;
    riskPoints: number
}[];

export const userDataSkeleton: UserData = {
    name: "",
    userName: "",
    avatarLink: "",
    netWorth: 0,
    assets: [
        {
            name: "cash",
            value: 0,
            riskValue: 0.2,
        },
        {
            name: "stocks",
            value: 0,
            riskValue: 0.55,
        },
        {
            name: "bonds",
            value: 0,
            riskValue: 0.15,
        },
        {
            name: "properties",
            value: 0,
            riskValue: 0.1,
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
