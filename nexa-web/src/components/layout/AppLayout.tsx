import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full min-w-0">
          <Topbar />
          <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
