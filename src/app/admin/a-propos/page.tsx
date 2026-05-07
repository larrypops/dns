import { AdminShell } from '@/components/admin/AdminShell';
import { AboutMediaForm } from '@/components/admin/AboutMediaForm';
import { requireAdminPageSession } from '@/lib/admin/guards';

export const dynamic = 'force-dynamic';

export default async function AdminAboutPage() {
  await requireAdminPageSession();

  return (
    <AdminShell>
      <AboutMediaForm />
    </AdminShell>
  );
}
