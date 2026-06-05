'use client';

import { Lead } from '@/types/lead';
import { StatusBadge } from './StatusBadge';
import { Pencil, Trash2, Building2, Mail, Phone } from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';
import Link from 'next/link';

interface LeadTableProps {
  leads: Lead[];
  onDelete: (lead: Lead) => void;
  isLoading?: boolean;
}

const SKELETON_WIDTHS = ['72%', '88%', '60%', '76%', '50%', '40%'];

function SkeletonRow({ rowIndex }: { rowIndex: number }) {
  return (
    <tr>
      {SKELETON_WIDTHS.map((w, i) => (
        <td key={i} className="px-4 py-4">
          <div
            className="skeleton h-4 rounded"
            style={{ width: w, animationDelay: `${rowIndex * 80 + i * 30}ms` }}
          />
        </td>
      ))}
    </tr>
  );
}

export function LeadTable({ leads, onDelete, isLoading }: LeadTableProps) {
  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <TableHead />
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} rowIndex={i} />)}
          </tbody>
        </table>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(12, 38, 48, 0.5)', border: '1px solid rgba(91, 191, 181, 0.1)' }}
        >
          <Building2 size={28} style={{ color: '#2e5c58' }} />
        </div>
        <p className="text-sm mb-1" style={{ color: '#c5e8e4' }}>No leads found</p>
        <p className="text-sm" style={{ color: '#3a6e6a' }}>Try adjusting your filters or add a new lead.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <TableHead />
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="table-row-hover border-b" style={{ borderColor: 'rgba(91, 191, 181, 0.07)' }}>
                <td className="pl-6 md:pl-8 pr-4 py-5.5">
                  <div>
                    <p className="text-white text-sm font-medium">{lead.name}</p>
                    <p className="text-sm mt-0.5" style={{ color: '#3a6e6a' }}>{formatDate(lead.createdDate || lead.createdAt)}</p>
                  </div>
                </td>
                <td className="px-4 py-5.5">
                  <a href={`mailto:${lead.email}`} className="text-sm hover:text-accent transition-colors" style={{ color: '#6a9e99' }}>
                    {lead.email}
                  </a>
                </td>
                <td className="px-4 py-5.5">
                  <span className="text-sm" style={{ color: '#6a9e99' }}>{lead.phoneNumber}</span>
                </td>
                <td className="px-4 py-5.5">
                  <div className="flex items-center gap-2">
                    <Building2 size={13} style={{ color: '#2e5c58' }} />
                    <span className="text-sm text-white">{lead.companyName}</span>
                  </div>
                </td>
                <td className="px-4 py-5.5">
                  <StatusBadge status={lead.leadStatus} />
                </td>
                <td className="pl-4 pr-6 md:pr-8 py-5.5">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/leads/${lead._id}/edit`}
                      className="p-2 rounded-lg transition-all duration-150 hover:scale-105"
                      style={{ background: 'rgba(91, 191, 181, 0.1)', color: '#7dd8d2' }}
                      title="Edit lead"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => onDelete(lead)}
                      className="p-2 rounded-lg transition-all duration-150 hover:scale-105"
                      style={{ background: 'rgba(240, 108, 103, 0.1)', color: '#f4a09b' }}
                      title="Delete lead"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-4 p-5">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="rounded-2xl p-6"
            style={{ background: 'rgba(12, 38, 48, 0.5)', border: '1px solid rgba(91, 191, 181, 0.08)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white font-semibold text-sm">{lead.name}</p>
                <p className="text-xs mt-0.5" style={{ color: '#3a6e6a' }}>{formatDate(lead.createdDate || lead.createdAt)}</p>
              </div>
              <StatusBadge status={lead.leadStatus} size="sm" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs" style={{ color: '#6a9e99' }}>
                <Mail size={12} style={{ color: '#2e5c58' }} />
                {lead.email}
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: '#6a9e99' }}>
                <Phone size={12} style={{ color: '#2e5c58' }} />
                {lead.phoneNumber}
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: '#6a9e99' }}>
                <Building2 size={12} style={{ color: '#2e5c58' }} />
                {lead.companyName}
              </div>
            </div>
            <div className="flex gap-2.5 pt-3" style={{ borderTop: '1px solid rgba(91, 191, 181, 0.08)' }}>
              <Link
                href={`/leads/${lead._id}/edit`}
                className="flex-1 btn-ghost justify-center text-xs"
                style={{ padding: '8px' }}
              >
                <Pencil size={13} />
                <span>Edit</span>
              </Link>
              <button
                onClick={() => onDelete(lead)}
                className="flex-1 btn-danger justify-center text-xs"
                style={{ padding: '8px' }}
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TableHead() {
  const cols = ['Lead', 'Email', 'Phone', 'Company', 'Status', 'Actions'];
  return (
    <tr style={{ borderBottom: '1px solid rgba(91, 191, 181, 0.08)' }}>
      {cols.map((col, index) => {
        const isFirst = index === 0;
        const isLast = index === cols.length - 1;
        return (
          <th
            key={col}
            className={cn(
              "py-4.5 text-left text-xs font-semibold uppercase tracking-wider",
              isFirst ? "pl-6 md:pl-8 pr-4" : isLast ? "pl-4 pr-6 md:pr-8" : "px-4"
            )}
            style={{ color: '#3a6e6a' }}
          >
            {col}
          </th>
        );
      })}
    </tr>
  );
}
