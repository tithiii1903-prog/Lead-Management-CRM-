'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLeads, useDebounce, useDeleteLead } from '@/hooks/useLeads';
import { LeadStatsPanel } from '@/components/dashboard/LeadStatsPanel';
import { Lead } from '@/types/lead';
import { PlusCircle, RefreshCw, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { data, isLoading, isFetching, refetch } = useLeads({
    page: 1,
    limit: 7,
    sortField: 'createdAt',
    sortOrder: 'desc',
  });

  return (
    <div className="p-8 md:p-12 lg:p-16 space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#c5e8e4' }}>
            Dashboard
          </h1>
          <p className="text-sm mt-2" style={{ color: '#3a6e6a' }}>
            Track and manage your leads in one place
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="btn-ghost"
            style={{ padding: '9px 12px' }}
            title="Refresh data"
          >
            <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
          </button>
          <Link href="/leads/new" className="btn-primary">
            <PlusCircle size={16} />
            Add Lead
          </Link>
        </div>
      </div>

      {/* Stats Panel — donut + status breakdown + recent leads */}
      <LeadStatsPanel
        stats={data?.stats}
        recentLeads={data?.leads ?? []}
        isLoading={isLoading}
      />

      {/* Quick-link to full leads page */}
      <div className="flex justify-end pt-2">
        <Link
          href="/leads"
          className="btn-ghost text-sm"
          style={{ color: '#5bbfb5', borderColor: 'rgba(91, 191, 181, 0.2)' }}
        >
          View all leads
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
