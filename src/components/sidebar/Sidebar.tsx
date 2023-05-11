import { getCurrentUser } from '@/actions/getCurrentUser';

import { DesktopSidebar } from '@/components/sidebar/DesktopSidebar';

import { MobileFooter } from './MobileFooter';

interface SidebarProps {
  children: React.ReactNode;
}

export async function Sidebar({ children }: SidebarProps) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
}
