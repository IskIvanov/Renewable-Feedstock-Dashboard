'use client';

import ReactApexChart from 'react-apexcharts';
import type { ApexAxisChartSeries } from 'apexcharts';
import { useChartOptions } from './hooks/useChartOptions';
import { usePriceChartData, productKey } from './hooks/usePriceChartData';
import { useChartSeries } from './hooks/useChartSeries';
import { ONE_DAY_MS } from '@/app/constants';

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

    const series: ApexAxisChartSeries = useChartSeries(items, effectiveName, effectiveSource, ONE_DAY_MS)
    const options: ApexCharts.ApexOptions = useChartOptions(currency);

    const hasSufficientData: boolean = selectedItems.length >= 1;

    return (
        <div className="px-5 py-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold tracking-tight text-foreground">
                    Historical Price Chart
                </span>
                <div className='flex items-center gap-2'>
                  <p className="text-xs font-mono font-light tracking-tight text-foreground">Select a product</p>
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
