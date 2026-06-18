import { useMemo } from 'react';
import type ApexCharts from 'apexcharts';

export function useChartOptions(currency: string): ApexCharts.ApexOptions {
    return useMemo((): ApexCharts.ApexOptions => ({
        chart: {
            type: 'line',
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: false },
        },
        stroke: { curve: 'smooth', width: 2 },
        theme: { mode: 'light' },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
                format: 'HH:mm',
                style: { fontFamily: 'monospace', fontSize: '11px' },
            },
        },
        yaxis: {
            labels: {
                formatter: (val: number): string =>
                    currency ? `${currency} ${val.toFixed(2)}` : val.toFixed(2),
                style: { fontFamily: 'monospace', fontSize: '11px' },
            },
        },
        grid: { borderColor: 'hsl(var(--border))' },
        tooltip: { enabled: true, x: { format: 'HH:mm:ss' } },
        markers: { size: 0 },
    }), [currency]);
}
