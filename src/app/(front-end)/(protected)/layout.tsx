import { getCurrentUser } from '@/auth/nextjs/current-user';

export const dynamic = 'force-dynamic';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getCurrentUser({ redirectIfNotFound: true });

  return <>{children}</>;
}
