import { getCurrentUser } from '@/auth/nextjs/current-user';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  if (user.role !== 'admin') {
    redirect('/');
  }

  return <>{children}</>;
}
