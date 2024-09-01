import { UserData } from "./types";

const name = "Adelaide Robbins";
const userName = "Adelaide";
const avatarLink = "/demoUserAvatar.jpg";
const netWorth = 926350;
const currencySybmol = "$";

// 8 + 32 + 12 + 44 + 4 = 100
const cashAmount = parseFloat(
    ((parseFloat(netWorth.toString()) * 8) / 100).toFixed(2),
);
const stocksValue = parseFloat(
    ((parseFloat(netWorth.toString()) * 32) / 100).toFixed(2),
);
const bondsValue = parseFloat(
    ((parseFloat(netWorth.toString()) * 12) / 100).toFixed(2),
);
const propertiesValue = parseFloat(
    ((parseFloat(netWorth.toString()) * 44) / 100).toFixed(2),
);
const otherAssetsValue = parseFloat(
    ((parseFloat(netWorth.toString()) * 4) / 100).toFixed(2),
);

export const demoUserData: UserData = {
    name: name,
    userName: userName,
    avatarLink: avatarLink,
    netWorth: netWorth,
    currencySymbol: currencySybmol,
    cashAmount: cashAmount,
    stocksValue: stocksValue,
    bondsValue: bondsValue,
    propertiesValue: propertiesValue,
    otherAssetsValue: otherAssetsValue,
};
