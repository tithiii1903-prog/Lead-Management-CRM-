'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap, LayoutDashboard, Users, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'All Leads', icon: Users },
  { href: '/leads/new', label: 'Add Lead', icon: PlusCircle },
];

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        className="md:hidden flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          background: 'rgba(8, 26, 32, 0.96)',
          borderBottom: '1px solid rgba(91, 191, 181, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #5bbfb5, #3da39a)' }}
          >
            <Zap size={15} color="#051216" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-sm" style={{ color: '#c5e8e4' }}>LeadFlow CRM</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg"
          style={{ color: '#6a9e99' }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <nav
            className="absolute left-0 top-0 bottom-0 w-64 flex flex-col py-4 px-3"
            style={{
              background: 'rgba(8, 26, 32, 0.98)',
              borderRight: '1px solid rgba(91, 191, 181, 0.1)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex items-center gap-3 px-3 py-2 mb-6">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #5bbfb5, #3da39a)' }}
              >
                <Zap size={18} color="#051216" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#c5e8e4' }}>LeadFlow</p>
                <p className="text-xs" style={{ color: '#3a6e6a' }}>CRM Dashboard</p>
              </div>
            </div>

            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn('sidebar-item', isActive && 'active')}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
