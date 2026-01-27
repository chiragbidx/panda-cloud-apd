import { getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  noStore(); // 🔑 Opt out of caching for THIS render

  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
