'use client';

import ClientLayout from './client-layout';

export default function DashboardTemplate({
  children
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
