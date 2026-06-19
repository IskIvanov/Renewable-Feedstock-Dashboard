import { useMemo } from 'react';
import type ApexCharts from 'apexcharts';

function formatYLabel(currency: string): (val: number) => string {
    return (val: number): string => currency ? `${currency} ${val.toFixed(2)}` : val.toFixed(2);
}


export function useChartOptions(currency: string): ApexCharts.ApexOptions {
    return useMemo((): ApexCharts.ApexOptions => ({
        chart: {
            type: 'line',
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: false },
        },
        stroke: { curve: 'smooth', width: 2 },
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
                title: { text: `Price (${currency})`, style: { fontFamily: 'monospace', fontSize: '11px' } },
                labels: {
                    formatter: formatYLabel(currency),
                    style: { fontFamily: 'monospace', fontSize: '11px' },
                },
            },
            {
                opposite: true,
                title: { text: 'Volume', style: { fontFamily: 'monospace', fontSize: '11px' } },
                labels: {
                    formatter: (val: number): string => val.toFixed(0),
                    style: { fontFamily: 'monospace', fontSize: '11px' },
                },
            },
        ],
        grid: { borderColor: 'hsl(var(--border))' },
        tooltip: { enabled: true, x: { format: 'dd MMM HH:mm:ss' } },
        markers: { size: 3 },
    }), [currency]);
}
