import { AppSidebar } from '@/components/app-sidebar';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset className="p-4 sm:p-6 lg:p-8">{children}</SidebarInset>
    </SidebarProvider>
  );
}
