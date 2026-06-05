'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLeads, useDebounce, useDeleteLead } from '@/hooks/useLeads';
import { LeadTable } from '@/components/leads/LeadTable';
import { SearchBar } from '@/components/leads/SearchBar';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { Pagination } from '@/components/leads/Pagination';
import { DeleteModal } from '@/components/leads/DeleteModal';
import { Lead } from '@/types/lead';
import { PlusCircle, ArrowLeft } from 'lucide-react';

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const debouncedSearch = useDebounce(search, 350);

  const { data, isLoading } = useLeads({
    page,
    limit: 10,
    search: debouncedSearch,
    status,
    sortField,
    sortOrder,
  });

  const deleteMutation = useDeleteLead();

  const handleDelete = async () => {
    if (!leadToDelete) return;
    await deleteMutation.mutateAsync(leadToDelete._id);
    setLeadToDelete(null);
  };

  return (
    <div className="p-8 md:p-12 lg:p-16 space-y-10">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/" className="btn-ghost" style={{ padding: '6px 10px', fontSize: '12px' }}>
              <ArrowLeft size={13} />
              Dashboard
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">All Leads</h1>
          <p className="text-sm mt-1" style={{ color: '#3a6e6a' }}>
            Browse and manage all your leads
          </p>
        </div>
        <Link href="/leads/new" className="btn-primary">
          <PlusCircle size={16} />
          Add Lead
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <div
          className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ borderBottom: '1px solid rgba(91, 191, 181, 0.1)' }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h2 className="text-white font-semibold text-base whitespace-nowrap">Leads</h2>
            {data?.pagination && (
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(91, 191, 181, 0.12)', color: '#5bbfb5' }}
              >
                {data.pagination.total}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
            <LeadFilters
              status={status}
              onStatusChange={(s) => { setStatus(s); setPage(1); }}
              sortField={sortField}
              onSortFieldChange={setSortField}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
            />
          </div>
        </div>

        <LeadTable
          leads={data?.leads ?? []}
          onDelete={setLeadToDelete}
          isLoading={isLoading}
        />

        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="p-6 md:p-8" style={{ borderTop: '1px solid rgba(91, 191, 181, 0.1)' }}>
            <Pagination pagination={data.pagination} onPageChange={setPage} />
          </div>
        )}
      </div>

      {leadToDelete && (
        <DeleteModal
          leadName={leadToDelete.name}
          isLoading={deleteMutation.isPending}
          onConfirm={handleDelete}
          onCancel={() => setLeadToDelete(null)}
        />
      )}
    </div>
  );
}
