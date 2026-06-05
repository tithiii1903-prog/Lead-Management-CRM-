import { Metadata } from 'next';
import Link from 'next/link';
import { LeadForm } from '@/components/leads/LeadForm';
import { ArrowLeft, PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Add New Lead — LeadFlow CRM',
  description: 'Create a new lead in your CRM pipeline',
};

export default function NewLeadPage() {
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
            <PlusCircle size={20} style={{ color: '#5bbfb5' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Lead</h1>
            <p className="text-sm mt-1" style={{ color: '#3a6e6a' }}>Fill in the details to create a new lead</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 md:p-12">
        <LeadForm />
      </div>
    </div>
  );
}
