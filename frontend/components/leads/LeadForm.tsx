'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createLead, updateLead } from '@/services/leadService';
import { Lead, LeadFormData, LeadStatus } from '@/types/lead';
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  companyName: z.string().min(1, 'Company name is required'),
  leadStatus: z.enum(['New', 'Contacted', 'Qualified', 'Converted', 'Lost']),
  notes: z.string().optional().default(''),
  createdDate: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const STATUS_OPTIONS: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

interface LeadFormProps {
  lead?: Lead;
}

export function LeadForm({ lead }: LeadFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = !!lead;
  const [successMsg, setSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: lead
      ? {
          name: lead.name,
          email: lead.email,
          phoneNumber: lead.phoneNumber,
          companyName: lead.companyName,
          leadStatus: lead.leadStatus,
          notes: lead.notes || '',
          createdDate: lead.createdDate ? lead.createdDate.split('T')[0] : '',
        }
      : {
          leadStatus: 'New',
          notes: '',
          createdDate: new Date().toISOString().split('T')[0],
        },
  });

  const mutation = useMutation({
    mutationFn: (data: LeadFormData) =>
      isEditing ? updateLead(lead!._id, data) : createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setSuccessMsg(isEditing ? 'Lead updated successfully!' : 'Lead created successfully!');
      setTimeout(() => router.push('/leads'), 1200);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data as LeadFormData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Success */}
      {successMsg && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <CheckCircle2 size={18} color="#4ade80" />
          <span className="text-sm" style={{ color: '#4ade80' }}>{successMsg}</span>
        </div>
      )}

      {/* Error */}
      {mutation.isError && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <AlertCircle size={18} color="#f87171" />
          <span className="text-sm" style={{ color: '#f87171' }}>
            Something went wrong. Please try again.
          </span>
        </div>
      )}

      {/* Grid fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <FormField label="Full Name" error={errors.name?.message} required>
          <input
            {...register('name')}
            id="field-name"
            className="input-glass"
            placeholder="e.g. John Smith"
          />
        </FormField>

        <FormField label="Email Address" error={errors.email?.message} required>
          <input
            {...register('email')}
            id="field-email"
            type="email"
            className="input-glass"
            placeholder="john@company.com"
          />
        </FormField>

        <FormField label="Phone Number" error={errors.phoneNumber?.message} required>
          <input
            {...register('phoneNumber')}
            id="field-phone"
            type="tel"
            className="input-glass"
            placeholder="+1 (555) 000-0000"
          />
        </FormField>

        <FormField label="Company Name" error={errors.companyName?.message} required>
          <input
            {...register('companyName')}
            id="field-company"
            className="input-glass"
            placeholder="Acme Corp"
          />
        </FormField>

        <FormField label="Lead Status" error={errors.leadStatus?.message} required>
          <select
            {...register('leadStatus')}
            id="field-status"
            className="input-glass appearance-none cursor-pointer"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} style={{ background: '#0b1e24', color: '#e2f0ee' }}>
                {s}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Date Created" error={errors.createdDate?.message}>
          <input
            {...register('createdDate')}
            id="field-date"
            type="date"
            className="input-glass"
            style={{ colorScheme: 'dark' }}
          />
        </FormField>
      </div>

      {/* Notes */}
      <FormField label="Notes" error={errors.notes?.message}>
        <textarea
          {...register('notes')}
          id="field-notes"
          rows={5}
          className="input-glass resize-none"
          placeholder="Add any notes about this lead..."
          style={{ lineHeight: '1.6' }}
        />
      </FormField>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-6">
        <button
          type="submit"
          id="submit-lead-form"
          disabled={isSubmitting || mutation.isPending || !!successMsg}
          className="btn-primary"
          style={{ minWidth: '140px', justifyContent: 'center' }}
        >
          {(isSubmitting || mutation.isPending) && <Loader2 size={16} className="animate-spin" />}
          {isEditing ? 'Update Lead' : 'Create Lead'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-ghost"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <label className="block text-sm font-medium" style={{ color: '#8ab5af' }}>
        {label}
        {required && <span className="ml-1" style={{ color: '#5bbfb5' }}>*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs flex items-center gap-1.5" style={{ color: '#f87171' }}>
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}
