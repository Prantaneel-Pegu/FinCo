import { UserData } from "./types";

const name = "Adelaide Robbins";
const userName = "Adelaide";
const avatarLink = "/demoUserAvatar.jpg";
const netWorth = 926350;

// 8 + 32 + 12 + 48 = 100
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
    ((parseFloat(netWorth.toString()) * 48) / 100).toFixed(2),
);

export const demoUserData: UserData = {
    name: name,
    userName: userName,
    avatarLink: avatarLink,
    netWorth: netWorth,
    assets: [
        {
            name: "Cash",
            value: cashAmount,
            riskValue: 0.2,
        },
        {
            name: "Stocks",
            value: stocksValue,
            riskValue: 0.55,
        },
        {
            name: "Bonds",
            value: bondsValue,
            riskValue: 0.15,
        },
        {
            name: "Properties",
            value: propertiesValue,
            riskValue: 0.1,
        },
    ],
};
