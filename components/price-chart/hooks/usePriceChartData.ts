import { useState, useMemo } from 'react';
import { useSSE } from 'use-next-sse';
import type { FeedstockItem } from '@/components/feed-stock-table/FeedstockTable';

function productKey(name: string, source: string): string {
    return `${name}::${source}`;
}

export interface Product {
    name: string;
    source: string;
}

export interface PriceChartData {
    items: FeedstockItem[];
    products: Product[];
    selectedKey: string;
    setSelectedKey: (key: string) => void;
    effectiveKey: string;
    effectiveName: string;
    effectiveSource: string;
    selectedItems: FeedstockItem[];
    currency: string;
}

export function usePriceChartData(): PriceChartData {
    const [selectedKey, setSelectedKey] = useState<string>('');

    const { data } = useSSE<{ prices: FeedstockItem[] }>({
        url: '/api/feedstock-stream/bulk',
        eventName: 'feedstock-bulk',
        reconnect: false,
    });

    const items: FeedstockItem[] = useMemo(() => data?.prices ?? [], [data]);

    const products = useMemo((): Product[] => {
        const seen = new Set<string>();
        const result: Product[] = [];
        for (const item of items) {
            const key = productKey(item.product_name, item.source);
            if (!seen.has(key)) {
                seen.add(key);
                result.push({ name: item.product_name, source: item.source });
            }
        }
        return result;
    }, [items]);

    console.log("These are the items",items)

    const effectiveKey: string = selectedKey || (products[0] ? productKey(products[0].name, products[0].source) : '');

    const [effectiveName, effectiveSource] = useMemo((): [string, string] => {
        const parts = effectiveKey.split('::');
        return [parts[0] ?? '', parts[1] ?? ''];
    }, [effectiveKey]);

    const selectedItems: FeedstockItem[] = useMemo(
        (): FeedstockItem[] =>
            items.filter((item): boolean => item.product_name === effectiveName && item.source === effectiveSource),
        [items, effectiveName, effectiveSource],
    );

    const currency: string = selectedItems[0]?.currency ?? '';

    return {
        items,
        products,
        selectedKey,
        setSelectedKey,
        effectiveKey,
        effectiveName,
        effectiveSource,
        selectedItems,
        currency,
    };
}

export { productKey };
