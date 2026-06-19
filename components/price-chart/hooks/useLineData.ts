import { useMemo } from 'react';
import type { ApexAxisChartSeries } from 'apexcharts';
import type { FeedstockItem } from '@/components/feed-stock-table/FeedstockTable';
import { ONE_WEEK_MS } from '@/app/constants';

// TODO: 
    // - Needs refactorig, for curtain products there are multiple points returned.
    // - Duration should be longer than 1 week. 
export function useLineData(items: FeedstockItem[], name: string, source: string, durationMs: number = ONE_WEEK_MS): ApexAxisChartSeries {
    return useMemo((): ApexAxisChartSeries => {
        // eslint-disable-next-line react-hooks/purity
        const cutoff = Date.now() - durationMs;
        const data: Array<{ x: number; y: number }> = items
            .filter((item: FeedstockItem): boolean => item.product_name === name && item.source === source)
            .map((item: FeedstockItem): { x: number; y: number } => ({
                x: new Date(item.timestamp).getTime(),
                y: item.price,
            }))
            .filter((point): boolean => point.x >= cutoff);

        return [{ data }];
    }, [items, name, source, durationMs]);
}
