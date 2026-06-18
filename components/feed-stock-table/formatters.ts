export function formatPrice(price: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

export function formatVolume(volume: number) {
    return new Intl.NumberFormat('en-US').format(volume);
}

export function formatTime(ts: string) {
    return new Date(ts).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}
