import { Suspense } from 'react';
import { LoginForm } from '@/components/admin/LoginForm';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <Suspense fallback={<div className="text-sm text-gray-500">Chargement…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
