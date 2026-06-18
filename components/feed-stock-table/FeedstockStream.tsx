'use client';

import { useSSE } from 'use-next-sse';
import { Zap } from 'lucide-react';
import FeedstockTable, { FeedstockItem } from './FeedstockTable';
import StatusBadge, { SSEConnectionState } from './StatusBadge';

export default function FeedstockStream() {
    const { data, error, connectionState } = useSSE<{ prices: FeedstockItem[] }>({
        url: '/api/feedstock-stream',
        eventName: 'feedstock',
        reconnect: { interval: 1000, maxAttempts: 5 },
    });

    const items: FeedstockItem[] = data?.prices ?? [];
    const count = items.length;

    const emptyMessage = error
        ? `Stream error: ${error.message}`
        : connectionState === 'connecting'
        ? 'Establishing connection…'
        : 'Awaiting feedstock data…';

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-8">
            <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded border border-border bg-muted">
                            <Zap size={14} className="text-primary" />
                        </div>
                        <div>
                            <h1 className="text-sm font-mono font-semibold tracking-tight text-foreground">
                                Feedstock Feed
                            </h1>
                            <p className="text-xs mt-0.5 font-mono text-muted-foreground">
                                Renewable Commodities · Live Stream
                            </p>
                        </div>
                    </div>
                    <StatusBadge state={connectionState as SSEConnectionState} error={error} />
                </div>

                <FeedstockTable items={items} emptyMessage={emptyMessage} />

                {count > 0 && (
                    <div className="px-5 py-3 border-t border-border bg-muted/30">
                        <p className="text-right text-xs font-mono text-muted-foreground">
                            {count} {count === 1 ? 'item' : 'items'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
