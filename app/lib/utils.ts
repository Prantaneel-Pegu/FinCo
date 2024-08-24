export function reloadClientPage(preserveScroll?: boolean) {
    if (!preserveScroll) history.scrollRestoration = "manual";
    location.reload();
}
