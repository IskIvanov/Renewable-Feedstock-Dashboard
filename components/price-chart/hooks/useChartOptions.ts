import { useMemo } from 'react';
import type ApexCharts from 'apexcharts';

function formatYLabel(currency: string): (val: number) => string {
    return (val: number): string => currency ? `${currency} ${val.toFixed(2)}` : val.toFixed(2);
}

function formatVolume(val: number): string {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1)}k`;
    return val.toFixed(0);
}

export function useChartOptions(currency: string): ApexCharts.ApexOptions {
    return useMemo((): ApexCharts.ApexOptions => ({
        chart: {
            type: 'line',
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: false },
        },
        stroke: { curve: 'smooth', width: [2, 0] },
        dataLabels: { enabled: false },
        theme: { mode: 'light' },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: true,
                datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd MMM',
                    hour: 'HH:mm',
                    minute: 'HH:mm',
                },
                style: { fontFamily: 'monospace', fontSize: '11px' },
            },
        },
        yaxis: [
            {
                seriesName: 'Price',
                labels: {
                    formatter: formatYLabel(currency),
                    style: { fontFamily: 'monospace', fontSize: '11px' },
                },
            },
            {
                seriesName: 'Volume',
                opposite: true,
                labels: {
                    formatter: formatVolume,
                    style: { fontFamily: 'monospace', fontSize: '11px' },
                },
            },
        ],
        grid: { borderColor: 'hsl(var(--border))' },
        tooltip: { enabled: true, x: { format: 'dd MMM HH:mm:ss' } },
        markers: { size: 0 },
    }), [currency]);
}
