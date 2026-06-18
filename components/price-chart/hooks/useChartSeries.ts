import { useMemo } from 'react';
import type { ApexAxisChartSeries } from 'apexcharts';
import type { FeedstockItem } from '@/components/feed-stock-table/FeedstockTable';
import { ONE_WEEK_MS } from '@/app/constants';

export function useChartSeries(
    items: FeedstockItem[],
    name: string,
    source: string,
    durationMs: number = ONE_WEEK_MS,
): ApexAxisChartSeries {
    return useMemo((): ApexAxisChartSeries => {
        const cutoff = Date.now() - durationMs;
        const filtered = items
            .filter((item): boolean => item.product_name === name && item.source === source)
            .filter((item): boolean => new Date(item.timestamp).getTime() >= cutoff);

        const priceData = filtered.map((item): { x: number; y: number } => ({
            x: new Date(item.timestamp).getTime(),
            y: item.price,
        }));

        const volumeData = filtered.map((item): { x: number; y: number } => ({
            x: new Date(item.timestamp).getTime(),
            y: item.volume,
        }));

        return [
            { name: 'Price',  type: 'line', data: priceData },
            { name: 'Volume', type: 'bar',  data: volumeData },
        ];
    }, [items, name, source, durationMs]);
}
