export type UserData = {
    name: string;
    userName: string;
    avatarLink: string;
    netWorth: number;
    cashAmount: number;
    stocksValue: number;
    bondsValue: number;
    propertiesValue: number;
    otherAssetsValue: number;
};

export const userDataSkeleton: UserData = {
    name: "",
    userName: "",
    avatarLink: "",
    netWorth: 0,
    cashAmount: 0,
    stocksValue: 0,
    bondsValue: 0,
    propertiesValue: 0,
    otherAssetsValue: 0,
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
