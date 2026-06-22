import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "../ui/sidebar";
import { Home, Briefcase, Users, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

import { Logo } from '../shared/Logo';

export function AppSidebar() {
  const { usuario, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { title: 'Dashboard', url: '/', icon: Home, roles: ['ADMIN', 'CONSULTOR'] },
    { title: 'Proyectos', url: '/proyectos', icon: Briefcase, roles: ['ADMIN', 'CONSULTOR'] },
    { title: 'Clientes', url: '/clientes', icon: LayoutDashboard, roles: ['ADMIN'] },
    { title: 'Consultores', url: '/consultores', icon: Users, roles: ['ADMIN'] },
  ];

  const filteredItems = menuItems.filter(item => 
    usuario && item.roles.includes(usuario.rol)
  );

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="h-16 px-4 flex justify-center border-b border-border/50 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:border-transparent">
        <div className="flex w-full items-center justify-between group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-2 overflow-hidden group-data-[collapsible=icon]:hidden">
            <Logo className="w-8 h-8 text-primary shrink-0" />
            <span className="font-heading font-bold text-lg tracking-tight whitespace-nowrap">NexaPM</span>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 gap-1">
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.url || (location.pathname.startsWith(item.url) && item.url !== '/')}
                    tooltip={item.title}
                    className="font-medium h-10 flex items-center gap-2 w-full"
                    onClick={() => navigate(item.url)}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4 group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:bg-destructive/10 hover:text-destructive font-medium h-10 flex items-center gap-2 w-full text-left">
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="truncate group-data-[collapsible=icon]:hidden">Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
