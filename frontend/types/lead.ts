export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  leadStatus: LeadStatus;
  notes: string;
  createdDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  leadStatus: LeadStatus;
  notes: string;
  createdDate: string;
}

export interface LeadStats {
  total: number;
  New: number;
  Contacted: number;
  Qualified: number;
  Converted: number;
  Lost: number;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeadsResponse {
  leads: Lead[];
  pagination: PaginationInfo;
  stats: LeadStats;
}

export interface LeadsQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}
