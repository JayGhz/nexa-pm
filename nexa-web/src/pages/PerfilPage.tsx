import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { updateUsuario } from '../api/usuarios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ShieldAlert, UserIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PerfilPage() {
  const { usuario, setAuth, token } = useAuthStore();
  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [isLoading, setIsLoading] = useState(false);

  if (!usuario) return null;

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  const handleUpdate = async () => {
    if (nombre.trim() === '') {
      toast.error('El nombre no puede estar vacío');
      return;
    }
    
    try {
      setIsLoading(true);
      const updatedUser = await updateUsuario(usuario.id, { nombre });
      if (token) {
        setAuth(token, updatedUser);
      }
      toast.success('Perfil actualizado exitosamente');
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-heading font-bold tracking-tight">Mi Perfil</h2>
        <p className="text-muted-foreground mt-1">
          Administra tu información personal y preferencias.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border-none shadow-none bg-transparent">
          <CardContent className="flex flex-col items-center pt-6 space-y-4">
            <Avatar className="h-32 w-32 bg-primary/10 text-primary border-4 border-background shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                {getInitials(usuario.nombre)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-xl">{usuario.nombre}</h3>
              <p className="text-muted-foreground">{usuario.correo}</p>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {usuario.rol === 'ADMIN' ? <ShieldAlert className="w-4 h-4 mr-2" /> : <UserIcon className="w-4 h-4 mr-2" />}
              {usuario.rol}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información General</CardTitle>
            <CardDescription>Actualiza tus datos básicos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input 
                id="nombre" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo">Correo Electrónico (No editable)</Label>
              <Input 
                id="correo" 
                value={usuario.correo} 
                disabled 
                className="bg-muted"
              />
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={handleUpdate} disabled={isLoading || nombre === usuario.nombre}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
