'use client';

import { useSSE } from 'use-next-sse';

interface FeedstockItem {
    id: string;
    product_id: string;
    product_name: string;
    source: string;
    price: number;
    currency: string;
    unit: string;
    timestamp: string;
    volume: number;
}

export default function FeedstockStream() {
    const { data, error, connectionState } = useSSE<FeedstockItem[]>({
        url: '/api/feedstock-stream',
        eventName: 'feedstock',
        reconnect: { interval: 1000, maxAttempts: 5 },
    });

    if (error) return <div>Error: {error.message}</div>;
    if (connectionState === 'connecting') return <div>Connecting…</div>;
    if (!data) return <div>Waiting for feed…</div>;

    return <>
    </>; // TODO: render UI (cards, chart, data table)
}
