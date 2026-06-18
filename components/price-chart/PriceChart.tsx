'use client';

import { useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import type { ApexAxisChartSeries } from 'apexcharts';
import type { FeedstockItem } from '@/components/feed-stock-table/FeedstockTable';
import { useLineData } from './hooks/useLineData';
import { useChartOptions } from './hooks/useChartOptions';

interface PriceChartProps {
    items: FeedstockItem[];
}

interface Product {
    id: string;
    name: string;
}

export default function PriceChart({ items }: PriceChartProps) {
    // State
    const [selectedProductId, setSelectedProductId] = useState<string>('');

    // Memo
    // Derives the unique product list from the item stream.
    // Re-runs only when `items` reference changes (new SSE payload).
    // Uses a Map keyed by product_id to deduplicate — insertion order is
    // preserved, so the first product seen stays first in the selector.
    const products: Product[] = useMemo((): Product[] => {
        const seen = new Map<string, string>();
        for (const item of items) {
            if (!seen.has(item.product_id)) {
                seen.set(item.product_id, item.product_name);
            }
        }
        return Array.from(seen.entries()).map(([id, name]): Product => ({ id, name }));
    }, [items]);

    const effectiveProductId: string = selectedProductId || products[0]?.id || '';

    const selectedProductItems: FeedstockItem[] = useMemo(
        (): FeedstockItem[] => items.filter((item: FeedstockItem): boolean => item.product_id === effectiveProductId),
        [items, effectiveProductId],
    );

    const currency: string = selectedProductItems[0]?.currency ?? '';

    // Series
    const series: ApexAxisChartSeries = useLineData(items, effectiveProductId);

    // Options
    const options = useChartOptions(currency);

    // Derived logic
    const hasSufficientData: boolean = selectedProductItems.length >= 1;

    return (
        <div className="px-5 py-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold tracking-tight text-foreground">
                    Price Chart
                </span>
                <select
                    value={effectiveProductId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedProductId(e.target.value)}
                    className="font-mono text-xs border border-border rounded px-2 py-1 bg-background text-foreground"
                >
                    {products.map((p: Product) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            {hasSufficientData ? (
                <ReactApexChart
                    type="line"
                    series={series}
                    options={options}
                    height={280}
                />
            ) : (
                <div className="flex items-center justify-center h-70 font-mono text-sm text-muted-foreground">
                    Awaiting price data…
                </div>
            )}
        </div>
    );
}
