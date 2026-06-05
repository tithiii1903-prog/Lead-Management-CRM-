import { LeadStatus } from '@/types/lead';
import { cn } from '@/lib/utils';

// Pastel palette that pops on the teal glassmorphism background
const statusConfig: Record<
  LeadStatus,
  { label: string; bg: string; color: string; dot: string }
> = {
  New: {
    label: 'New',
    bg: 'rgba(137, 196, 225, 0.15)',
    color: '#89c4e1',
    dot: '#5aadd4',
  },
  Contacted: {
    label: 'Contacted',
    bg: 'rgba(232, 201, 123, 0.15)',
    color: '#e8c97b',
    dot: '#d4b45a',
  },
  Qualified: {
    label: 'Qualified',
    bg: 'rgba(184, 169, 212, 0.15)',
    color: '#b8a9d4',
    dot: '#9b88c2',
  },
  Converted: {
    label: 'Converted',
    bg: 'rgba(142, 212, 168, 0.15)',
    color: '#8ed4a8',
    dot: '#66c288',
  },
  Lost: {
    label: 'Lost',
    bg: 'rgba(240, 158, 140, 0.15)',
    color: '#f09e8c',
    dot: '#e07560',
  },
};

interface StatusBadgeProps {
  status: LeadStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'
      )}
      style={{ background: config.bg, color: config.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: config.dot }}
      />
      {config.label}
    </span>
  );
}

export { statusConfig };
