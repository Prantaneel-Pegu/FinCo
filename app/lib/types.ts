export type UserData = {
    name: string;
    userName: string;
    avatarLink: string;
    netWorth: number;
    currencySymbol: string;
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
    currencySymbol: "",
    cashAmount: 0,
    stocksValue: 0,
    bondsValue: 0,
    propertiesValue: 0,
    otherAssetsValue: 0,
};
