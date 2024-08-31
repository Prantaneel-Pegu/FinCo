export type UserData = {
    name: string;
    userName: string;
    avatarLink: string;
    netWorth: string;

    cashAmount: string;
    stocksValue: string;
    bondsValue: string;
    propertiesValue: string;
    otherAssetsValue: string;
};

export const userDataSkeleton: UserData = {
    name: "",
    userName: "",
    avatarLink: "",
    netWorth: "",

    cashAmount: "",
    stocksValue: "",
    bondsValue: "",
    propertiesValue: "",
    otherAssetsValue: "",
};
