'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  delay?: number;
}

function AnimatedCounter({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (target === 0) { setCurrent(0); return; }
    const step = target / (duration / 16);
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCurrent(Math.floor(cur));
      if (cur >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{current.toLocaleString()}</>;
}

export function StatCard({ label, value, icon, color, gradientFrom, gradientTo, delay = 0 }: StatCardProps) {
  return (
    <div
      className="glass-card glass-card-hover p-5 flex flex-col gap-4 fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}22, ${gradientTo}33)`,
            border: `1px solid ${gradientFrom}33`,
          }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <div
          className="text-xs px-2 py-1 rounded-full"
          style={{ background: `${gradientFrom}15`, color }}
        >
          Live
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-white leading-none mb-1">
          <AnimatedCounter target={value} />
        </p>
        <p className="text-sm" style={{ color: '#a0a0a0' }}>{label}</p>
      </div>
      <div
        className="h-1 rounded-full"
        style={{ background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})` }}
      />
    </div>
  );
}
