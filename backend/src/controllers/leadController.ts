import { Request, Response, NextFunction } from 'express';
import { Lead, LeadStatus } from '../models/Lead';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  companyName: z.string().min(1, 'Company name is required'),
  leadStatus: z.enum(['New', 'Contacted', 'Qualified', 'Converted', 'Lost']).default('New'),
  notes: z.string().optional().default(''),
  createdDate: z.string().optional(),
});

export async function getLeads(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const skip = (page - 1) * limit;

    const status = req.query.status as string;
    const search = req.query.search as string;
    const sortField = (req.query.sortField as string) || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const filter: Record<string, unknown> = {};

    if (status && status !== 'all') {
      filter.leadStatus = status as LeadStatus;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: regex }, { email: regex }, { companyName: regex }];
    }

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(filter),
    ]);

    const stats = await Lead.aggregate([
      {
        $group: {
          _id: '$leadStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = stats.reduce(
      (acc, s) => {
        acc[s._id] = s.count;
        return acc;
      },
      {} as Record<string, number>
    );

    res.json({
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        total: await Lead.countDocuments(),
        New: statusCounts['New'] || 0,
        Contacted: statusCounts['Contacted'] || 0,
        Qualified: statusCounts['Qualified'] || 0,
        Converted: statusCounts['Converted'] || 0,
        Lost: statusCounts['Lost'] || 0,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function createLead(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() });
    }

    const lead = await Lead.create({
      ...parsed.data,
      createdDate: parsed.data.createdDate ? new Date(parsed.data.createdDate) : new Date(),
    });

    return res.status(201).json(lead);
  } catch (err) {
    next(err);
  }
}

export async function updateLead(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = leadSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { ...parsed.data },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    return res.json(lead);
  } catch (err) {
    next(err);
  }
}

export async function deleteLead(req: Request, res: Response, next: NextFunction) {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    return res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    next(err);
  }
}

export async function getLeadById(req: Request, res: Response, next: NextFunction) {
  try {
    const lead = await Lead.findById(req.params.id).lean();
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    return res.json(lead);
  } catch (err) {
    next(err);
  }
}
