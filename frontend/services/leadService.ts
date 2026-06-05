import api from './api';
import { Lead, LeadFormData, LeadsQueryParams, LeadsResponse } from '@/types/lead';

export async function getLeads(params: LeadsQueryParams = {}): Promise<LeadsResponse> {
  const { data } = await api.get<LeadsResponse>('/api/leads', { params });
  return data;
}

export async function getLeadById(id: string): Promise<Lead> {
  const { data } = await api.get<Lead>(`/api/leads/${id}`);
  return data;
}

export async function createLead(payload: LeadFormData): Promise<Lead> {
  const { data } = await api.post<Lead>('/api/leads', payload);
  return data;
}

export async function updateLead(id: string, payload: Partial<LeadFormData>): Promise<Lead> {
  const { data } = await api.put<Lead>(`/api/leads/${id}`, payload);
  return data;
}

export async function deleteLead(id: string): Promise<void> {
  await api.delete(`/api/leads/${id}`);
}
