'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getLeadById } from '@/services/leadService';
import { LeadForm } from '@/components/leads/LeadForm';
import Link from 'next/link';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function EditLeadPage() {
  const { id } = useParams<{ id: string }>();

  const { data: lead, isLoading, isError } = useQuery({
    queryKey: ['lead', id],
    queryFn: () => getLeadById(id),
    enabled: !!id,
  });

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-5xl space-y-10">
      <div className="mb-8">
        <Link href="/leads" className="btn-ghost inline-flex mb-6" style={{ padding: '7px 12px', fontSize: '13px' }}>
          <ArrowLeft size={14} />
          Back to Leads
        </Link>
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(91, 191, 181, 0.12)', border: '1px solid rgba(91, 191, 181, 0.2)' }}
          >
            <Pencil size={18} style={{ color: '#5bbfb5' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Lead</h1>
            <p className="text-sm mt-1" style={{ color: '#3a6e6a' }}>
              {lead ? `Editing: ${lead.name}` : 'Loading lead details...'}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 md:p-12">
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="skeleton h-3 w-24 rounded" />
                <div className="skeleton h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div
            className="p-4 rounded-xl text-sm"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            Failed to load lead. The lead may have been deleted.
          </div>
        )}

        {lead && <LeadForm lead={lead} />}
      </div>
    </div>
  );
}
