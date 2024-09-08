export function reloadClientPage(preserveScroll?: boolean) {
    if (!preserveScroll) history.scrollRestoration = "manual";
    location.reload();
}

export function localiseCurrency(
    amount: number | string,
    currency: string,
    toFixed2: boolean,
) {
    if (toFixed2) {
        let value = "";
        if (currency !== "inr") {
            value = Intl.NumberFormat("en-US", {
                maximumFractionDigits: 2,
            }).format(parseFloat(amount.toString()));

            if (!value.split(".")[1]) {
                value.replace(".", "");
                value += ".00";
            } else if (value.split(".")[1].length === 1) {
                value += "0";
            }

            return value;
        } else {
            value = Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 2,
            }).format(parseFloat(amount.toString()));

            if (!value.split(".")[1]) {
                value.replace(".", "");
                value += ".00";
            } else if (value.split(".")[1].length === 1) {
                value += "0";
            }

            return value;
        }
    } else {
        if (currency !== "inr") {
            return Intl.NumberFormat("en-US", {
                maximumFractionDigits: 2,
            }).format(parseFloat(amount.toString()));
        } else {
            return Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 2,
            }).format(parseFloat(amount.toString()));
        }
    }
}
