'use client';

import { useState } from 'react';
import { LeadStats, Lead } from '@/types/lead';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Pastel teal-theme palette per status
const STATUS_META = [
  { key: 'New' as const,       label: 'New',       color: '#5aadd4', light: '#89c4e1' },
  { key: 'Contacted' as const, label: 'Contacted', color: '#d4b45a', light: '#e8c97b' },
  { key: 'Qualified' as const, label: 'Qualified', color: '#9b88c2', light: '#b8a9d4' },
  { key: 'Converted' as const, label: 'Converted', color: '#66c288', light: '#8ed4a8' },
  { key: 'Lost' as const,      label: 'Lost',      color: '#e07560', light: '#f09e8c' },
];

// ── Smooth bezier area chart (expanded width for full-screen span) ──
function smoothCubic(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const midX = (pts[i].x + pts[i + 1].x) / 2;
    d += ` C ${midX} ${pts[i].y}, ${midX} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
  }
  return d;
}

function AreaChart({ stats }: { stats: LeadStats | undefined }) {
  const W = 800, H = 160;
  const PAD = { t: 16, b: 24, l: 20, r: 20 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;

  const vals = STATUS_META.map((s) => stats?.[s.key] ?? 0);
  const maxV = Math.max(...vals, 1);

  const xs = STATUS_META.map((_, i) => PAD.l + (i / (STATUS_META.length - 1)) * iW);
  const toY = (v: number) => PAD.t + iH - (v / maxV) * iH;

  // Primary line: actual status counts
  const pts1 = vals.map((v, i) => ({ x: xs[i], y: toY(v) }));
  // Secondary line: shifted version for visual depth
  const pts2 = vals.map((v, i) => ({ x: xs[i], y: toY(v * 0.55 + maxV * 0.08) }));

  const line1 = smoothCubic(pts1);
  const line2 = smoothCubic(pts2);
  const baseY = PAD.t + iH;
  const area1 = `${line1} L ${xs[xs.length - 1]} ${baseY} L ${xs[0]} ${baseY} Z`;
  const area2 = `${line2} L ${xs[xs.length - 1]} ${baseY} L ${xs[0]} ${baseY} Z`;

  const gridYs = [0.25, 0.5, 0.75, 1].map((f) => PAD.t + iH * (1 - f));
  const gridVals = [0.25, 0.5, 0.75, 1].map((f) => Math.round(f * maxV));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5aadd4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#5aadd4" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9b88c2" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#9b88c2" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Horizontal grid */}
      {gridYs.map((y, i) => (
        <g key={i}>
          <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y}
            stroke="rgba(91,191,181,0.09)" strokeWidth={1} strokeDasharray="3 4" />
          <text x={PAD.l - 6} y={y + 3.5} textAnchor="end" fontSize={9}
            fill="rgba(91,191,181,0.3)">{gridVals[i]}</text>
        </g>
      ))}

      {/* Area fills */}
      <path d={area2} fill="url(#grad2)" />
      <path d={area1} fill="url(#grad1)" />

      {/* Lines */}
      <path d={line2} fill="none" stroke="#9b88c2" strokeWidth={2}
        strokeLinecap="round" opacity={0.65} />
      <path d={line1} fill="none" stroke="#5aadd4" strokeWidth={2.5}
        strokeLinecap="round" />

      {/* Data dots on primary line */}
      {pts1.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={4.5}
          fill="#5aadd4" stroke="rgba(11,30,36,0.9)" strokeWidth={1.5} />
      ))}

      {/* X-axis labels */}
      {STATUS_META.map((s, i) => (
        <text key={i} x={xs[i]} y={H - 4} textAnchor="middle" fontSize={10}
          fill="rgba(91,191,181,0.35)">
          {s.label}
        </text>
      ))}
    </svg>
  );
}

// ── Mini bar indicator (5 columns like reference) ─────────────────
function MiniBarGroup({ value, max, color }: { value: number; max: number; color: string }) {
  const BARS = 5;
  const filled = max > 0 ? Math.ceil((value / max) * BARS) : 0;
  return (
    <div className="flex items-end gap-px" style={{ height: 16 }}>
      {Array.from({ length: BARS }).map((_, i) => {
        const h = [55, 70, 85, 100, 70][i];
        return (
          <div key={i} style={{
            width: 6,
            height: `${h}%`,
            borderRadius: 2,
            background: i < filled ? color : 'rgba(91,191,181,0.1)',
            transition: 'background 0.35s ease',
          }} />
        );
      })}
    </div>
  );
}

// ── Trend triangle arrow (matches reference design) ───────────────
function TrendArrow({ up }: { up: boolean }) {
  return up ? (
    <span style={{
      display: 'inline-block',
      width: 0, height: 0,
      borderLeft: '4.5px solid transparent',
      borderRight: '4.5px solid transparent',
      borderBottom: '7.5px solid #66c288',
    }} />
  ) : (
    <span style={{
      display: 'inline-block',
      width: 0, height: 0,
      borderLeft: '4.5px solid transparent',
      borderRight: '4.5px solid transparent',
      borderTop: '7.5px solid #e07560',
    }} />
  );
}

// ── Main component ────────────────────────────────────────────────
interface LeadStatsPanelProps {
  stats: LeadStats | undefined;
  recentLeads: Lead[];
  isLoading: boolean;
}

export function LeadStatsPanel({ stats, recentLeads, isLoading }: LeadStatsPanelProps) {
  const [chartTab, setChartTab] = useState<'month' | 'year' | 'all'>('all');
  const [leadsTab, setLeadsTab] = useState<'week' | 'last'>('week');

  const total   = stats?.total      ?? 0;
  const newC    = stats?.New        ?? 0;
  const conv    = stats?.Converted  ?? 0;
  const lost    = stats?.Lost       ?? 0;
  const maxStat = Math.max(newC, conv, lost, 1);

  const newPct  = total > 0 ? Math.round((newC  / total) * 100) : 0;
  const convPct = total > 0 ? Math.round((conv  / total) * 100) : 0;
  const lostPct = total > 0 ? Math.round((lost  / total) * 100) : 0;

  const miniStats = [
    { label: 'TOTAL LEADS',  value: total, pct: null,    trend: null,   color: '#5bbfb5' },
    { label: 'NEW LEADS',    value: newC,  pct: newPct,  trend: true,   color: '#5aadd4' },
    { label: 'CONVERTED',    value: conv,  pct: convPct, trend: true,   color: '#66c288' },
    { label: 'LOST',         value: lost,  pct: lostPct, trend: false,  color: '#e07560' },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="glass-card h-96 skeleton" />
        <div className="glass-card h-80 skeleton" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* ── TOP PANEL: Lead Trends (Full Width) ───────────────── */}
      <div className="glass-card p-6 md:p-8 fade-in flex flex-col gap-6">

        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold" style={{ color: '#c5e8e4', fontSize: 16 }}>Lead trends</h3>
          <div className="flex items-center gap-1">
            
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-1">
          {[
            { label: 'Active leads', color: '#5aadd4', filled: true },
            { label: 'New leads',    color: '#9b88c2', filled: false },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                border: `2px solid ${l.color}`,
                background: l.filled ? l.color : 'transparent',
              }} />
              <span style={{ fontSize: 12, color: '#3a6e6a' }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Area chart */}
        <div className="py-2">
          <AreaChart stats={stats} />
        </div>

        {/* Mini-stat columns */}
        <div className="grid grid-cols-4 gap-4 pt-6 mt-2"
          style={{ borderTop: '1px solid rgba(91,191,181,0.09)' }}>
          {miniStats.map((s) => (
            <div key={s.label} className="space-y-1">
              <p style={{ fontSize: 9, letterSpacing: '0.08em', color: '#2e5c58', marginBottom: 4 }}>
                {s.label}
              </p>
              <p style={{ fontSize: 24, fontWeight: 700, color: '#c5e8e4', lineHeight: 1, marginBottom: 4 }}>
                {s.value}
              </p>
              {s.pct !== null ? (
                <div className="flex items-center gap-1.5 pb-2">
                  <TrendArrow up={s.trend as boolean} />
                  <span style={{
                    fontSize: 10,
                    color: s.trend ? '#66c288' : '#e07560',
                    fontWeight: 500,
                  }}>
                    {s.pct}%
                  </span>
                </div>
              ) : (
                <div style={{ height: 20 }} />
              )}
              <MiniBarGroup value={s.value} max={s.label === 'TOTAL LEADS' ? s.value : maxStat} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM PANEL: Best Leads So Far (Full Width) ──────── */}
      <div className="glass-card p-6 md:p-8 fade-in" style={{ animationDelay: '80ms' }}>

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold" style={{ color: '#c5e8e4', fontSize: 16 }}>Best leads so far</h3>
          <div className="flex items-center gap-1">
          </div>
        </div>

        {/* Column headers */}
        <div className="grid mb-2 pb-3 px-6 md:px-8"
          style={{
            gridTemplateColumns: '1.5fr 1.2fr 1fr 60px',
            borderBottom: '1px solid rgba(91,191,181,0.09)',
          }}>
          {['Lead', 'Company', 'Status', ''].map((col) => (
            <span key={col} style={{ fontSize: 11, letterSpacing: '0.04em', color: '#2e5c58', fontWeight: 600 }}>
              {col}
            </span>
          ))}
        </div>

        {/* Lead rows */}
        <div className="space-y-1">
          {recentLeads.slice(0, 7).map((lead, idx) => {
            const meta = STATUS_META.find((s) => s.key === lead.leadStatus);
            const positive = lead.leadStatus === 'Converted' || lead.leadStatus === 'Qualified';
            return (
              <div key={lead._id}
                className="grid items-center py-4 px-6 md:px-8 transition-all duration-150 rounded-xl hover:bg-[rgba(91,191,181,0.03)]"
                style={{
                  gridTemplateColumns: '1.5fr 1.2fr 1fr 60px',
                  borderBottom: idx < recentLeads.slice(0, 7).length - 1
                    ? '1px solid rgba(91,191,181,0.04)' : 'none',
                }}
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${meta?.color ?? '#5bbfb5'}2a, ${meta?.color ?? '#5bbfb5'}50)`,
                      color: meta?.light ?? '#c5e8e4',
                      border: `1.5px solid ${meta?.color ?? '#5bbfb5'}40`,
                    }}>
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-xs font-semibold truncate" style={{ color: '#e2f0ee' }}>
                    {lead.name}
                  </p>
                </div>

                {/* Company */}
                <p className="text-xs truncate" style={{ color: '#8ab5af' }}>
                  {lead.companyName}
                </p>

                {/* Status badge */}
                <span className="text-xs px-2.5 py-1 rounded-full font-medium w-fit"
                  style={{ background: `${meta?.color ?? '#5bbfb5'}1a`, color: meta?.light ?? '#c5e8e4' }}>
                  {lead.leadStatus}
                </span>

                {/* Trend triangle arrow */}
                <div className="flex justify-start pl-2">
                  <TrendArrow up={positive} />
                </div>
              </div>
            );
          })}

          {recentLeads.length === 0 && (
            <p className="text-xs text-center py-10" style={{ color: '#2e5c58' }}>
              No leads yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
