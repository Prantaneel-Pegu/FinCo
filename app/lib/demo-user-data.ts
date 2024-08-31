import { UserData } from "./types";

const name = "Adelaide Robbins";
const userName = "Adelaide";
const avatarLink = "/demoUserAvatar.jpg";
const netWorth = "$926350";

// 8 + 32 + 12 + 44 + 4 = 100
const cashAmount =
    "$" + ((parseFloat(netWorth.substring(1)) * 8) / 100).toFixed(2).toString();

const stocksValue =
    "$" +
    parseFloat(
        ((parseFloat(netWorth.substring(1)) * 32) / 100).toFixed(2),
    ).toString();
const bondsValue =
    "$" +
    parseFloat(
        ((parseFloat(netWorth.substring(1)) * 12) / 100).toFixed(2),
    ).toString();
const propertiesValue =
    "$" +
    parseFloat(
        ((parseFloat(netWorth.substring(1)) * 44) / 100).toFixed(2),
    ).toString();
const otherAssetsValue =
    "$" +
    parseFloat(
        ((parseFloat(netWorth.substring(1)) * 4) / 100).toFixed(2),
    ).toString();

export const demoUserData: UserData = {
    name: name,
    userName: userName,
    avatarLink: avatarLink,
    netWorth: netWorth,
    cashAmount: cashAmount,
    stocksValue: stocksValue,
    bondsValue: bondsValue,
    propertiesValue: propertiesValue,
    otherAssetsValue: otherAssetsValue,
};
