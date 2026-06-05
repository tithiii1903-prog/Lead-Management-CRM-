'use client';

import { LeadStatus } from '@/types/lead';
import { ChevronDown, SortAsc, SortDesc } from 'lucide-react';

const STATUS_OPTIONS = ['all', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'] as const;
const SORT_FIELDS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'name', label: 'Name' },
  { value: 'companyName', label: 'Company' },
] as const;

interface LeadFiltersProps {
  status: string;
  onStatusChange: (s: string) => void;
  sortField: string;
  onSortFieldChange: (f: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (o: 'asc' | 'desc') => void;
}

export function LeadFilters({
  status,
  onStatusChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
}: LeadFiltersProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Status filter */}
      <div className="relative">
        <select
          id="filter-status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="input-glass pr-8 appearance-none cursor-pointer text-sm"
          style={{ paddingTop: '8px', paddingBottom: '8px', minWidth: '130px' }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} style={{ background: '#0b1e24', color: '#e2f0ee' }}>
              {s === 'all' ? 'All Statuses' : s}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: '#3a6e6a' }}
        />
      </div>

      {/* Sort field */}
      <div className="relative">
        <select
          id="filter-sort-field"
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value)}
          className="input-glass pr-8 appearance-none cursor-pointer text-sm"
          style={{ paddingTop: '8px', paddingBottom: '8px', minWidth: '140px' }}
        >
          {SORT_FIELDS.map((f) => (
            <option key={f.value} value={f.value} style={{ background: '#0b1e24', color: '#e2f0ee' }}>
              {f.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: '#3a6e6a' }}
        />
      </div>

      {/* Sort order toggle */}
      <button
        id="toggle-sort-order"
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="btn-ghost"
        style={{ padding: '8px 12px' }}
        title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
      </button>
    </div>
  );
}
