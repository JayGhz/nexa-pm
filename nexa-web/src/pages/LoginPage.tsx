import { useState, type CSSProperties } from 'react';
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
import { Logo } from '../components/shared/Logo';

const loginSchema = z.object({
  correo: z.string().email('Ingresa un correo válido'),
  contrasena: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const PARTICLES = [
  { size: 4, left: '8%', top: '18%', x: '120px', y: '-90px', duration: '10s', delay: '0s', opacity: 0.55, blur: '0px' },
  { size: 7, left: '16%', top: '72%', x: '90px', y: '-150px', duration: '13s', delay: '1s', opacity: 0.45, blur: '1px' },
  { size: 3, left: '22%', top: '42%', x: '-70px', y: '-120px', duration: '11s', delay: '2.3s', opacity: 0.5, blur: '0px' },
  { size: 6, left: '31%', top: '25%', x: '110px', y: '85px', duration: '14s', delay: '0.7s', opacity: 0.4, blur: '1px' },
  { size: 5, left: '38%', top: '80%', x: '-100px', y: '-130px', duration: '12s', delay: '1.5s', opacity: 0.5, blur: '0px' },
  { size: 8, left: '48%', top: '55%', x: '140px', y: '-100px', duration: '15s', delay: '0.2s', opacity: 0.35, blur: '2px' },
  { size: 4, left: '57%', top: '20%', x: '-90px', y: '120px', duration: '12.5s', delay: '2s', opacity: 0.5, blur: '0px' },
  { size: 6, left: '64%', top: '70%', x: '100px', y: '-160px', duration: '14.5s', delay: '1.1s', opacity: 0.45, blur: '1px' },
  { size: 3, left: '72%', top: '36%', x: '-120px', y: '-90px', duration: '10.5s', delay: '3s', opacity: 0.55, blur: '0px' },
  { size: 7, left: '79%', top: '82%', x: '-80px', y: '-150px', duration: '13.8s', delay: '0.5s', opacity: 0.42, blur: '1px' },
  { size: 5, left: '87%', top: '24%', x: '-140px', y: '90px', duration: '12.8s', delay: '2.6s', opacity: 0.48, blur: '0px' },
  { size: 4, left: '93%', top: '62%', x: '-130px', y: '-120px', duration: '11.8s', delay: '1.8s', opacity: 0.5, blur: '1px' },
  { size: 9, left: '12%', top: '52%', x: '160px', y: '60px', duration: '16s', delay: '3.2s', opacity: 0.28, blur: '3px' },
  { size: 6, left: '44%', top: '12%', x: '-110px', y: '130px', duration: '15s', delay: '2.1s', opacity: 0.35, blur: '2px' },
  { size: 5, left: '68%', top: '9%', x: '90px', y: '145px', duration: '13.2s', delay: '0.9s', opacity: 0.42, blur: '1px' },
  { size: 8, left: '90%', top: '45%', x: '-160px', y: '-40px', duration: '17s', delay: '1.4s', opacity: 0.3, blur: '3px' },

  { size: 3, left: '5%', top: '38%', x: '150px', y: '-70px', duration: '12.4s', delay: '0.4s', opacity: 0.48, blur: '0px' },
  { size: 5, left: '14%', top: '88%', x: '130px', y: '-180px', duration: '15.2s', delay: '2.8s', opacity: 0.34, blur: '2px' },
  { size: 4, left: '27%', top: '10%', x: '-95px', y: '155px', duration: '13.6s', delay: '1.7s', opacity: 0.44, blur: '1px' },
  { size: 6, left: '34%', top: '60%', x: '125px', y: '-105px', duration: '14.2s', delay: '3.4s', opacity: 0.38, blur: '1px' },
  { size: 3, left: '41%', top: '36%', x: '-130px', y: '80px', duration: '11.2s', delay: '0.6s', opacity: 0.52, blur: '0px' },
  { size: 7, left: '52%', top: '84%', x: '115px', y: '-175px', duration: '16.4s', delay: '2.2s', opacity: 0.32, blur: '2px' },
  { size: 4, left: '59%', top: '44%', x: '-145px', y: '-70px', duration: '12.7s', delay: '1.3s', opacity: 0.46, blur: '0px' },
  { size: 5, left: '66%', top: '58%', x: '150px', y: '-120px', duration: '14.8s', delay: '3.1s', opacity: 0.4, blur: '1px' },
  { size: 3, left: '74%', top: '14%', x: '-110px', y: '135px', duration: '12.1s', delay: '0.1s', opacity: 0.5, blur: '0px' },
  { size: 6, left: '83%', top: '88%', x: '-115px', y: '-165px', duration: '15.6s', delay: '2.5s', opacity: 0.36, blur: '2px' },
  { size: 4, left: '96%', top: '18%', x: '-180px', y: '105px', duration: '13.4s', delay: '1.9s', opacity: 0.46, blur: '1px' },
  { size: 7, left: '97%', top: '76%', x: '-190px', y: '-140px', duration: '17.5s', delay: '0.8s', opacity: 0.3, blur: '3px' },


  { size: 3, left: '72%', top: '36%', x: '-120px', y: '-90px', duration: '10.5s', delay: '3s', opacity: 0.55, blur: '0px' },
  { size: 7, left: '79%', top: '82%', x: '-80px', y: '-150px', duration: '13.8s', delay: '0.5s', opacity: 0.42, blur: '1px' },
  { size: 5, left: '87%', top: '24%', x: '-140px', y: '90px', duration: '12.8s', delay: '2.6s', opacity: 0.48, blur: '0px' },
  { size: 4, left: '93%', top: '62%', x: '-130px', y: '-120px', duration: '11.8s', delay: '1.8s', opacity: 0.5, blur: '1px' },
  { size: 9, left: '12%', top: '52%', x: '160px', y: '60px', duration: '16s', delay: '3.2s', opacity: 0.28, blur: '3px' },
  { size: 6, left: '44%', top: '12%', x: '-110px', y: '130px', duration: '15s', delay: '2.1s', opacity: 0.35, blur: '2px' },
  { size: 5, left: '68%', top: '9%', x: '90px', y: '145px', duration: '13.2s', delay: '0.9s', opacity: 0.42, blur: '1px' },
  { size: 8, left: '90%', top: '45%', x: '-160px', y: '-40px', duration: '17s', delay: '1.4s', opacity: 0.3, blur: '3px' },
];

const STREAKS = [
  { left: '6%', top: '78%', width: 170, travel: '520px', duration: '9s', delay: '0s' },
  { left: '20%', top: '28%', width: 130, travel: '460px', duration: '11s', delay: '2s' },
  { left: '43%', top: '88%', width: 190, travel: '560px', duration: '10s', delay: '1.4s' },
  { left: '62%', top: '34%', width: 150, travel: '500px', duration: '12s', delay: '3s' },
  { left: '78%', top: '72%', width: 120, travel: '420px', duration: '9.5s', delay: '0.8s' },
];

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
    <div className="min-h-screen w-full flex relative overflow-hidden bg-slate-50">
      <style>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
            transform: scale(1) rotate(0deg);
          }
          50% {
            background-position: 100% 50%;
            transform: scale(1.04) rotate(1deg);
          }
          100% {
            background-position: 20% 80%;
            transform: scale(1.02) rotate(-1deg);
          }
        }

        @keyframes blobFlowOne {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(90px, -60px, 0) scale(1.16);
          }
          66% {
            transform: translate3d(-50px, 70px, 0) scale(0.96);
          }
        }

        @keyframes blobFlowTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(-90px, 50px, 0) scale(1.1);
          }
          66% {
            transform: translate3d(60px, -80px, 0) scale(1.22);
          }
        }

        @keyframes blobFlowThree {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(70px, 55px, 0) scale(1.12);
          }
        }

        @keyframes gridFlow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(72px, 72px, 0);
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(0.45);
            opacity: 0;
          }
          18% {
            opacity: var(--particleOpacity);
          }
          58% {
            opacity: var(--particleOpacity);
          }
          100% {
            transform: translate3d(var(--xMove), var(--yMove), 0) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes streakMove {
          0% {
            transform: translate3d(-160px, 95px, 0) rotate(-18deg);
            opacity: 0;
          }
          16% {
            opacity: 0.75;
          }
          52% {
            opacity: 0.35;
          }
          100% {
            transform: translate3d(var(--travel), -170px, 0) rotate(-18deg);
            opacity: 0;
          }
        }

        @keyframes cardShine {
          0% {
            transform: translateX(-120%) rotate(-18deg);
          }
          100% {
            transform: translateX(360%) rotate(-18deg);
          }
        }

        @keyframes titleGlow {
          0%, 100% {
            text-shadow: 0 0 0 hsl(var(--primary) / 0);
          }
          50% {
            text-shadow: 0 10px 34px hsl(var(--primary) / 0.22);
          }
        }

        .nexa-gradient {
          background:
            radial-gradient(ellipse 80% 60% at 16% 24%, hsl(var(--primary) / 0.34) 0%, transparent 54%),
            radial-gradient(ellipse 70% 80% at 84% 18%, hsl(var(--primary) / 0.26) 0%, transparent 50%),
            radial-gradient(ellipse 75% 65% at 78% 82%, hsl(var(--primary) / 0.30) 0%, transparent 52%),
            radial-gradient(ellipse 90% 70% at 38% 74%, rgba(255,255,255,0.92) 0%, transparent 46%),
            linear-gradient(120deg, #f8fafc 0%, #eef5ff 28%, hsl(var(--primary) / 0.18) 52%, #f8fafc 78%, #edf4ff 100%);
          background-size: 220% 220%;
          animation: gradientFlow 9s ease-in-out infinite alternate;
        }

        .nexa-grid {
          background-image:
            linear-gradient(to right, hsl(var(--primary) / 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.07) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 78%);
          animation: gridFlow 20s linear infinite;
        }

        .nexa-blob-one {
          animation: blobFlowOne 11s ease-in-out infinite;
        }

        .nexa-blob-two {
          animation: blobFlowTwo 13s ease-in-out infinite;
        }

        .nexa-blob-three {
          animation: blobFlowThree 16s ease-in-out infinite;
        }

        .nexa-particle {
          filter: blur(var(--particleBlur));
          animation: particleFloat ease-in-out infinite;
          box-shadow:
            0 0 16px hsl(var(--primary) / 0.45),
            0 0 34px hsl(var(--primary) / 0.18);
        }

        .nexa-streak {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.45) 48%, transparent 100%);
          animation: streakMove linear infinite;
          filter: drop-shadow(0 0 12px hsl(var(--primary) / 0.42));
        }

        .nexa-title-glow {
          animation: titleGlow 5s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-[-18%] nexa-gradient" />
        <div className="absolute inset-0 nexa-grid opacity-65" />

        <div className="nexa-blob-one absolute left-[-220px] top-[7%] h-[560px] w-[560px] rounded-full bg-primary/24 blur-[125px]" />
        <div className="nexa-blob-two absolute right-[-260px] bottom-[-210px] h-[720px] w-[720px] rounded-full bg-primary/28 blur-[145px]" />
        <div className="nexa-blob-three absolute left-[43%] top-[22%] h-[470px] w-[470px] rounded-full bg-primary/18 blur-[130px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.32)_50%,rgba(248,250,252,0.66)_100%)]" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className="nexa-particle absolute rounded-full bg-primary/55"
            style={
              {
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: particle.left,
                top: particle.top,
                '--xMove': particle.x,
                '--yMove': particle.y,
                '--particleOpacity': particle.opacity,
                '--particleBlur': particle.blur,
                animationDuration: particle.duration,
                animationDelay: particle.delay,
              } as CSSProperties
            }
          />
        ))}

        {STREAKS.map((streak, index) => (
          <span
            key={index}
            className="nexa-streak absolute rounded-full"
            style={
              {
                left: streak.left,
                top: streak.top,
                width: `${streak.width}px`,
                '--travel': streak.travel,
                animationDuration: streak.duration,
                animationDelay: streak.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="hidden lg:flex w-1/2 flex-col items-start justify-center relative p-16 z-10">
        <div className="mb-8 flex items-center gap-3">
          <Logo className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900">NexaPM</h1>
        </div>

        <h2 className="text-5xl font-heading font-extrabold mb-6 text-slate-900 leading-tight nexa-title-glow">
          Gestión de proyectos <br />
          <span className="text-primary">ágil y transparente.</span>
        </h2>

        <p className="text-xl text-slate-600 max-w-md font-medium">
          El portal unificado de la consultora TI para administrar equipos, presupuesto y progreso.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
        <div className="w-full max-w-md flex flex-col space-y-6">
          <div className="flex flex-col space-y-2 text-center lg:hidden mb-4 items-center">
            <Logo className="w-16 h-16 text-primary mb-2" />
            <h1 className="text-3xl font-heading font-bold text-slate-900">NexaPM</h1>
          </div>

          <Card className="border-blue-200/60 bg-blue-50/70 backdrop-blur-2xl shadow-[0_32px_110px_rgba(37,99,235,0.24)] overflow-hidden rounded-3xl relative">
            <CardHeader className="space-y-1 pb-4 pt-8 relative z-20">
              <CardTitle className="text-2xl font-bold tracking-tight text-center text-slate-900">
                Iniciar Sesión
              </CardTitle>
              <CardDescription className="text-center text-slate-600">
                Ingresa a tu cuenta para continuar
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8 relative z-20">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="correo" className="text-slate-700 font-semibold">
                    Correo electrónico
                  </Label>

                  <Input
                    id="correo"
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    {...register('correo')}
                    className={`bg-white/60 backdrop-blur-md border-blue-200/50 text-slate-900 placeholder:text-slate-400 hover:bg-white/75 focus-visible:bg-white focus-visible:ring-primary transition-all shadow-sm ${errors.correo ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />

                  {errors.correo && (
                    <p className="text-sm text-destructive font-medium">{errors.correo.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contrasena" className="text-slate-700 font-semibold">
                      Contraseña
                    </Label>

                    <a href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <Input
                    id="contrasena"
                    type="password"
                    placeholder="••••••••"
                    {...register('contrasena')}
                    className={`bg-white/60 backdrop-blur-md border-blue-200/50 text-slate-900 placeholder:text-slate-400 hover:bg-white/75 focus-visible:bg-white focus-visible:ring-primary transition-all shadow-sm ${errors.contrasena ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />

                  {errors.contrasena && (
                    <p className="text-sm text-destructive font-medium">{errors.contrasena.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full font-bold rounded-xl mt-4 h-12 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 shadow-md hover:shadow-lg transition-all text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                  Entrar al Portal
                </Button>
              </form>

              <div className="relative flex items-center justify-center my-8">
                <span className="flex-1 border-t border-slate-300/60" />
                <span className="px-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  O continuar con
                </span>
                <span className="flex-1 border-t border-slate-300/60" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="group bg-white/50 backdrop-blur-md border-blue-200/40 text-slate-700 font-bold rounded-xl hover:bg-white/70 hover:scale-[1.03] hover:shadow-lg hover:border-primary/30 hover:text-primary transition-all duration-300 h-11 shadow-sm"
                  type="button"
                >
                  <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="group bg-white/50 backdrop-blur-md border-blue-200/40 text-slate-700 font-bold rounded-xl hover:bg-white/70 hover:scale-[1.03] hover:shadow-lg hover:border-blue-400/30 hover:text-blue-600 transition-all duration-300 h-11 shadow-sm"
                  type="button"
                >
                  <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 21 21">
                    <path d="M10 0H0V10H10V0Z" fill="#f25022" />
                    <path d="M21 0H11V10H21V0Z" fill="#7fba00" />
                    <path d="M10 11H0V21H10V11Z" fill="#00a4ef" />
                    <path d="M21 11H11V21H21V11Z" fill="#ffb900" />
                  </svg>
                  Microsoft
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-slate-500">
            Soporte técnico: soporte@nexapm.com
          </p>
        </div>
      </div>
    </div>
  );
}