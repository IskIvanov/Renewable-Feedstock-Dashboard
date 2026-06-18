import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPrice, formatVolume, formatTime } from './formatters';

export interface FeedstockItem {
    id: string;
    product_id: string;
    product_name: string;
    source: string;
    price: number;
    currency: string;
    unit: string;
    timestamp: string;
    volume: number;
}

interface FeedstockTableProps {
    items: FeedstockItem[];
    emptyMessage: string;
}

const HEADER_BASE = 'text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground';

const COLUMNS: { label: string; padding: string }[] = [
    { label: 'Product', padding: 'pl-5 pr-3' },
    { label: 'Source',  padding: 'px-3' },
    { label: 'Price',   padding: 'px-3' },
    { label: 'Unit',    padding: 'px-3' },
    { label: 'Volume',  padding: 'px-3' },
    { label: 'Updated', padding: 'pl-3 pr-5' },
];

export default function FeedstockTable({ items, emptyMessage }: FeedstockTableProps) {
    return (
        <Table>
            <TableHeader className="bg-muted/40">
                <TableRow className="hover:bg-transparent border-border">
                    {COLUMNS.map(col => (
                        <TableHead key={col.label} className={`${col.padding} ${HEADER_BASE}`}>
                            {col.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <TableRow className="border-border hover:bg-transparent">
                        <TableCell colSpan={6} className="py-12 text-center font-mono text-sm text-muted-foreground">
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    items.map(item => (
                        <TableRow key={item.id} className="border-border hover:bg-muted/30 transition-colors">
                            <TableCell className="pl-5 pr-3 font-medium text-foreground">{item.product_name}</TableCell>
                            <TableCell className="px-3 text-sm text-muted-foreground font-mono">{item.source}</TableCell>
                            <TableCell className="px-3 font-mono font-semibold tabular-nums text-foreground">{formatPrice(item.price, item.currency)}</TableCell>
                            <TableCell className="px-3">
                                <span className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-mono border border-border bg-muted text-muted-foreground">
                                    {item.unit}
                                </span>
                            </TableCell>
                            <TableCell className="px-3 font-mono tabular-nums text-sm text-foreground">{formatVolume(item.volume)}</TableCell>
                            <TableCell className="pl-3 pr-5 font-mono text-xs text-muted-foreground">{formatTime(item.timestamp)}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
