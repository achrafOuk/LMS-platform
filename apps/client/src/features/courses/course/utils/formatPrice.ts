const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

export function formatPrice(price: number) {
    return price === 0 ? "Free" : currencyFormatter.format(price);
}
