import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { useAuthStore } from '../../store/authStore';
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '../ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

export function Topbar() {
  const { usuario, logout } = useAuthStore();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="flex h-16 mt-2 shrink-0 items-center gap-2 border-b border-border/50 px-4 bg-background z-10 sticky top-2">
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1" />
        
        {usuario && (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-1.5 rounded-lg transition-colors">
                <div className="text-sm text-right hidden sm:block">
                  <p className="font-medium leading-none mb-1 text-foreground">{usuario.nombre}</p>
                  <p className="text-xs text-muted-foreground">{usuario.rol}</p>
                </div>
                <Avatar className="h-9 w-9 bg-primary text-primary-foreground">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">{getInitials(usuario.nombre)}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/perfil')} className="cursor-pointer">
                  Perfil
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { logout(); navigate('/login'); }} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
