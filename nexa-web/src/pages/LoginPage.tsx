import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const loginSchema = z.object({
  correo: z.string().email('Ingresa un correo válido'),
  contrasena: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      const res = await login(data);
      setAuth(res.accessToken, res.usuario);
      toast.success(`Bienvenido, ${res.usuario.nombre}`);
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-muted/40">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm z-10" />
        <img 
          src="/hero.png" 
          alt="NexaPM Dashboard Illustration" 
          className="object-cover w-full h-full opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/10 z-20" />
        <div className="absolute bottom-12 left-12 z-30 text-white">
          <h1 className="text-4xl font-heading font-bold mb-4 tracking-tight">NexaPM</h1>
          <p className="text-lg text-white/80 max-w-md">
            El portal unificado para la gestión ágil y transparente de proyectos de consultoría TI.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm flex flex-col space-y-6">
          <div className="flex flex-col space-y-2 text-center lg:hidden mb-4">
            <h1 className="text-3xl font-heading font-bold text-primary">NexaPM</h1>
          </div>
          
          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">Iniciar Sesión</CardTitle>
              <CardDescription>
                Ingresa tu correo y contraseña para acceder a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="correo">Correo electrónico</Label>
                  <Input 
                    id="correo" 
                    type="email" 
                    placeholder="nombre@ejemplo.com"
                    {...register('correo')}
                    className={errors.correo ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {errors.correo && <p className="text-sm text-destructive font-medium">{errors.correo.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contrasena">Contraseña</Label>
                  <Input 
                    id="contrasena" 
                    type="password" 
                    {...register('contrasena')}
                    className={errors.contrasena ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {errors.contrasena && <p className="text-sm text-destructive font-medium">{errors.contrasena.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Ingresar a NexaPM
                </Button>
              </form>
            </CardContent>
          </Card>
          <p className="text-center text-sm text-muted-foreground">
            Soporte técnico: soporte@nexapm.com
          </p>
        </div>
      </div>
    </div>
  );
}
