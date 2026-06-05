'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationInfo } from '@/types/lead';

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { page, totalPages, total, limit } = pagination;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <p className="text-sm" style={{ color: '#3a6e6a' }}>
        Showing <span style={{ color: '#e2f0ee' }}>{start}–{end}</span> of{' '}
        <span style={{ color: '#e2f0ee' }}>{total}</span> leads
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ padding: '7px 10px' }}
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p, i) => {
          const prev = pages[i - 1];
          const showEllipsis = prev && p - prev > 1;
          return (
            <span key={p} className="flex items-center gap-1">
              {showEllipsis && (
                <span className="px-2 text-sm" style={{ color: '#2e5c58' }}>…</span>
              )}
              <button
                onClick={() => onPageChange(p)}
                className="w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  background: p === page ? 'linear-gradient(135deg, #5bbfb5, #4aada3)' : 'transparent',
                  color: p === page ? '#051216' : '#6a9e99',
                  border: p === page ? 'none' : '1px solid rgba(91, 191, 181, 0.14)',
                }}
              >
                {p}
              </button>
            </span>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ padding: '7px 10px' }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
