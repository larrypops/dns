import Link from 'next/link';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdminPageSession } from '@/lib/admin/guards';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const session = await requireAdminPageSession();

  return (
    <AdminShell>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Connecté en tant que</p>
        <h2 className="mt-1 text-2xl font-bold text-text-dark">{session.username}</h2>
        <p className="mt-3 text-gray-600">
          Gérez les médias de la page À propos: photos de terrain, vidéos de présentation et posters.
        </p>
        <Link
          href="/admin/a-propos"
          className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Ouvrir la section À propos
        </Link>
      </div>
    </AdminShell>
  );
}
