import { WifiOff, Loader2 } from 'lucide-react';

export type SSEConnectionState = 'connecting' | 'connected' | (string & {});

interface StatusBadgeProps {
    state: SSEConnectionState;
    error?: Error | null;
}

export default function StatusBadge({ state, error }: StatusBadgeProps) {
    if (error) return (
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wide uppercase text-red-500">
            <WifiOff size={12} />
            <span>Error</span>
        </div>
    );

    if (state === 'connecting') return (
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wide uppercase text-amber-500">
            <Loader2 size={12} className="animate-spin" />
            <span>Connecting</span>
        </div>
    );

    return (
        <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wide uppercase text-emerald-600">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Live</span>
        </div>
    );
}
