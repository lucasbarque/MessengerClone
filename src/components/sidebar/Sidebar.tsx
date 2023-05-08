import { DesktopSidebar } from "@/components/sidebar/DesktopSidebar";
import { MobileFooter } from "./MobileFooter";

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
