import { createSSEHandler } from 'use-next-sse';

export const dynamic = 'force-dynamic';

const FEED_LIMIT = 15; // Connection starts all over again afte 10 fetched feedbs
const BASE_URL = 'https://renewable-price-feed-mock.onrender.com';
const FEED_ENDPOINT = `${BASE_URL}/feed/latest?limit=${FEED_LIMIT}`;
const HEALTH_ENDPOINT = `${BASE_URL}/health`;
const POLL_INTERVAL_MS = 10000; // 600ms — stays within 100 req/60 sec rate limit
// TODO: After fetching all the da
export const GET = createSSEHandler((send, close, { onClose }) => {
    const start = async () => {
        console.log('[SSE] Health check →', HEALTH_ENDPOINT);
        const health = await fetch(HEALTH_ENDPOINT);
        console.log('[SSE] Health check ←', health.status);
        if (!health.ok) {
            send({ error: `Service unavailable (health check failed with ${health.status})` }, 'error');
            close();
            return;
        }

        const poll = async () => {
            console.log('[SSE] Polling feed →', new Date().toISOString());
            const res = await fetch(FEED_ENDPOINT);
            console.log('[SSE] Poll response ←', res.status);
            if (!res.ok) {
                send({ error: `Feed responded with ${res.status}` }, 'error');
                return;
            }
            send(await res.json(), 'feedstock');
        };

        poll();
        const interval = setInterval(poll, POLL_INTERVAL_MS);
        onClose(() => {
            console.log('[SSE] Client disconnected, clearing interval');
            clearInterval(interval);
        });
    };

    start();
});
