import { createSSEHandler } from 'use-next-sse';
import type { FeedstockItem } from '@/components/feed-stock-table/FeedstockTable';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.FEEDSTOCK_API_BASE_URL!;
const BULK_ENDPOINT = `${BASE_URL}/feed/bulk`;
const HEALTH_ENDPOINT = `${BASE_URL}/health`;

export const GET = createSSEHandler((send, close) => {
    const start = async () => {
        console.log('[SSE/bulk] Health check →', HEALTH_ENDPOINT);
        const health = await fetch(HEALTH_ENDPOINT);
        console.log('[SSE/bulk] Health check ←', health.status);
        if (!health.ok) {
            send({ error: `Service unavailable (health check failed with ${health.status})` }, 'error');
            close();
            return;
        }

        console.log('[SSE/bulk] Fetching bulk →', BULK_ENDPOINT);
        const res = await fetch(BULK_ENDPOINT, { signal: AbortSignal.timeout(30000) });
        console.log('[SSE/bulk] Bulk response ←', res.status);
        if (!res.ok) {
            send({ error: `Bulk feed responded with ${res.status}` }, 'error');
            close();
            return;
        }

        const body = await res.json();
        const groups: { prices: FeedstockItem[] }[] = Array.isArray(body) ? body : [body];
        const items: FeedstockItem[] = groups.flatMap(g => g.prices ?? []);

        send({ prices: items }, 'feedstock-bulk');
        close();
    };

    start();
});
