import { useMemo } from 'react';
import type { ApexAxisChartSeries } from 'apexcharts';
import type { FeedstockItem } from '@/components/feed-stock-table/FeedstockTable';

export function useLineData(items: FeedstockItem[], productId: string): ApexAxisChartSeries {
    return useMemo((): ApexAxisChartSeries => {
        const data: Array<{ x: Date; y: number }> = items
            .filter((item: FeedstockItem): boolean => item.product_id === productId)
            .map((item: FeedstockItem): { x: Date; y: number } => ({
                x: new Date(item.timestamp),
                y: item.price,
            }));

        return [{ data }];
    }, [items, productId]);
}
