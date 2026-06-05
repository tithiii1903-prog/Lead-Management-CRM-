'use client';

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search leads...' }: SearchBarProps) {
  return (
    <div className="relative flex-1 min-w-0">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: '#3a6e6a' }}
      />
      <input
        id="search-leads"
        type="text"
        className="input-glass pl-10 pr-10"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: '#3a6e6a' }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
