# LeadFlow CRM

A production-ready **Lead Management CRM** for small businesses. Built with a modern luxury glassmorphism design, full CRUD, server-side pagination, filtering, and search.

### Live working url 
- https://lead-management-crm-awxt.vercel.app/

---

## Features

- **Dashboard** with animated statistics (Total, New, Qualified, Converted, Lost leads)
- **Full CRUD** — Add, Edit, Delete leads with confirmation modal
- **Real-time Search** — debounced, case-insensitive across name, email, company
- **Status Filtering** — New, Contacted, Qualified, Converted, Lost
- **Sorting** — by name, company, or date (asc/desc)
- **Server-side Pagination** — 10 records per page by default
- **Form Validation** — React Hook Form + Zod
- **Responsive** — mobile drawer nav, stacked cards on small screens
- **Color-coded Status Badges**
- **Glassmorphism Design** — dark premium theme, frosted glass, soft gradients

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React, TypeScript, Tailwind CSS v4 |
| State / Data | TanStack React Query |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB + Mongoose |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (DB) |

---

## Project Structure

```
CRM 2/
├── frontend/               # Next.js 15 app
│   ├── app/
│   │   ├── page.tsx         # Dashboard
│   │   ├── leads/
│   │   │   ├── page.tsx     # All leads
│   │   │   ├── new/page.tsx # Add lead
│   │   │   └── [id]/edit/page.tsx
│   ├── components/
│   │   ├── dashboard/       # StatCard
│   │   ├── leads/           # Table, Form, Filters, Pagination, Modal
│   │   └── layout/          # Sidebar, MobileHeader
│   ├── hooks/               # useLeads, useDebounce, useDeleteLead
│   ├── services/            # api.ts, leadService.ts
│   ├── types/               # lead.ts
│   └── lib/                 # utils.ts
│
├── backend/                # Express + Mongoose API
│   └── src/
│       ├── server.ts
│       ├── config/db.ts
│       ├── models/Lead.ts
│       ├── controllers/leadController.ts
│       ├── routes/leadRoutes.ts
│       ├── middleware/errorHandler.ts
│       └── seed.ts
│
└── postman/                # API collection
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install

```bash
# Backend
cd backend
npm install
cp .env.example .env      # fill in MONGODB_URI

# Frontend
cd ../frontend
npm install
cp .env.local.example .env.local
```

### 2. Environment Variables

**backend/.env**
```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/lead-crm
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Run Locally

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

Visit: `http://localhost:3000`

### 4. Seed Sample Data

```bash
cd backend && npm run seed
```

---

## API Documentation

Base URL: `http://localhost:5000`

### GET `/api/leads`

Fetch paginated leads with optional filters.

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Per page (default: 10, max: 100) |
| `status` | string | Filter by status (New/Contacted/Qualified/Converted/Lost) |
| `search` | string | Search name, email, company |
| `sortField` | string | Field to sort by (createdAt/name/companyName) |
| `sortOrder` | string | asc or desc |

**Response:**
```json
{
  "leads": [...],
  "pagination": { "total": 20, "page": 1, "limit": 10, "totalPages": 2 },
  "stats": { "total": 20, "New": 5, "Contacted": 4, "Qualified": 4, "Converted": 4, "Lost": 3 }
}
```

### POST `/api/leads`
Create a lead. Body: `{ name, email, phoneNumber, companyName, leadStatus, notes, createdDate }`

### GET `/api/leads/:id`
Get single lead by ID.

### PUT `/api/leads/:id`
Update a lead. Accepts partial body.

### DELETE `/api/leads/:id`
Delete a lead.

---

## Deployment

### Backend → Render

1. Push `backend/` to a GitHub repo
2. Create a new **Web Service** on Render
3. Set environment variables: `MONGODB_URI`, `PORT=10000`, `FRONTEND_URL`
4. Build command: `npm install && npm run build`
5. Start command: `node dist/server.js`

### Frontend → Vercel

1. Push `frontend/` to GitHub
2. Import project on Vercel
3. Set `NEXT_PUBLIC_API_URL` to your Render backend URL
4. Deploy

---

## Lead Status Reference

| Status | Color |
|---|---|
| New | 🔵 Blue |
| Contacted | 🟡 Yellow |
| Qualified | 🟣 Purple |
| Converted | 🟢 Green |
| Lost | 🔴 Red |
