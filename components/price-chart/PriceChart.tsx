'use client';

import ReactApexChart from 'react-apexcharts';
import type { ApexAxisChartSeries } from 'apexcharts';
import { useLineData } from './hooks/useLineData';
import { useChartOptions } from './hooks/useChartOptions';
import { usePriceChartData, productKey } from './hooks/usePriceChartData';

export default function PriceChart() {
    const {
        items,
        products,
        setSelectedKey,
        effectiveKey,
        effectiveName,
        effectiveSource,
        selectedItems,
        currency,
    } = usePriceChartData();

    const series: ApexAxisChartSeries = useLineData(items, effectiveName, effectiveSource);
    const options: ApexCharts.ApexOptions = useChartOptions(currency);

    const hasSufficientData: boolean = selectedItems.length >= 1;

    return (
        <div className="px-5 py-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold tracking-tight text-foreground">
                    Price Chart
                </span>
                <select
                    value={effectiveKey}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setSelectedKey(e.target.value)}
                    className="font-mono text-xs border border-border rounded px-2 py-1 bg-background text-foreground"
                >
                    {products.map(p => {
                        const key = productKey(p.name, p.source);
                        return (
                            <option key={key} value={key}>
                                {p.name} — {p.source}
                            </option>
                        );
                    })}
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
