'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  leadName: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({ leadName, isLoading, onConfirm, onCancel }: DeleteModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div
        className="glass-card relative w-full max-w-sm p-6 fade-in"
        style={{ zIndex: 1 }}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
          style={{ color: '#3a6e6a' }}
        >
          <X size={16} />
        </button>

        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.25)' }}
        >
          <AlertTriangle size={22} color="#f87171" />
        </div>

        <h2 className="text-white font-semibold text-lg mb-2">Delete Lead</h2>
        <p className="text-sm mb-6" style={{ color: '#6a9e99', lineHeight: '1.6' }}>
          Are you sure you want to delete{' '}
          <span className="text-white font-medium">"{leadName}"</span>?
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="btn-ghost flex-1 justify-center"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            id="confirm-delete"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 justify-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 flex items-center gap-2"
            style={{
              background: isLoading ? 'rgba(239,68,68,0.1)' : 'rgba(239, 68, 68, 0.9)',
              color: '#fff',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? 'Deleting…' : 'Delete Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}
