import { getCurrentUser } from '@/auth/nextjs/current-user';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getCurrentUser({ redirectIfNotFound: true });

  return <>{children}</>;
}
