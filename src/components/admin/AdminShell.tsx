'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';

type AdminShellProps = {
  children: ReactNode;
};

export const AdminShell = ({ children }: AdminShellProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const linkClasses = (path: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      pathname === path ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
        <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">DNS Service</p>
              <h1 className="text-xl font-bold text-text-dark">Panneau administrateur</h1>
            </div>
            <button
              type="button"
              onClick={logout}
              disabled={isLoggingOut}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60"
            >
              {isLoggingOut ? 'Déconnexion…' : 'Se déconnecter'}
            </button>
          </div>

          <nav className="mt-4 flex flex-wrap gap-2">
            <Link href="/admin" className={linkClasses('/admin')}>
              Tableau de bord
            </Link>
            <Link href="/admin/a-propos" className={linkClasses('/admin/a-propos')}>
              Médias À propos
            </Link>
          </nav>
        </div>

        {children}
      </div>
    </div>
  );
};
