'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'All Leads', icon: Users },
  { href: '/leads/new', label: 'Add Lead', icon: PlusCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="hidden md:flex flex-col h-full transition-all duration-300 ease-in-out flex-shrink-0"
      style={{
        width: collapsed ? '72px' : '240px',
        background: 'rgba(8, 26, 32, 0.96)',
        borderRight: '1px solid rgba(91, 191, 181, 0.1)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5"
        style={{ borderBottom: '1px solid rgba(91, 191, 181, 0.08)' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #5bbfb5, #3da39a)' }}
        >
          <Zap size={18} color="#051216" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-sm leading-tight" style={{ color: '#c5e8e4' }}>LeadFlow</p>
            <p className="text-xs" style={{ color: '#3a6e6a' }}>CRM Dashboard</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {!collapsed && (
          <p className="text-xs font-medium px-3 mb-3" style={{ color: '#2e5c58', letterSpacing: '0.08em' }}>
            NAVIGATION
          </p>
        )}
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn('sidebar-item', isActive && 'active')}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer / collapse */}
      <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(91, 191, 181, 0.08)' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-item w-full justify-center"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight size={16} />
            : <><ChevronLeft size={16} /><span>Collapse</span></>
          }
        </button>
      </div>
    </aside>
  );
}
