import { useEffect, useState } from 'react';
import { getDashboardResumen } from '../api/dashboard';
import type { DashboardResumen } from '../types';
import { PageSkeleton } from '../components/shared/PageSkeleton';
import { StatCard } from '../components/shared/StatCard';
import { Briefcase, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import { EstadosDonutChart } from '../components/charts/EstadosDonutChart';
import { formatCurrency } from '../lib/utils';
import { PresupuestoBarChart } from '../components/charts/PresupuestoBarChart';
import { ProyectosPorClienteChart } from '../components/charts/ProyectosPorClienteChart';
import { ActividadAreaChart } from '../components/charts/ActividadAreaChart';
import { PresupuestoPorEstadoChart } from '../components/charts/PresupuestoPorEstadoChart';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [resumen, setResumen] = useState<DashboardResumen | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardResumen();
        setResumen(data);
      } catch (error) {
        toast.error('Error al cargar el dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (isLoading) return <PageSkeleton />;
  if (!resumen) return null;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Resumen general de tu portafolio de proyectos de consultoría.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Proyectos Activos" 
          value={resumen.totalProyectosActivos} 
          icon={Briefcase} 
        />
        <StatCard 
          title="Presupuesto Total" 
          value={formatCurrency(resumen.presupuestoTotal)} 
          icon={DollarSign} 
        />
        <StatCard 
          title="Consultores" 
          value={resumen.totalConsultores} 
          icon={Users} 
        />
        <StatCard 
          title="Proyectos Completados" 
          value={resumen.proyectosCompletados} 
          icon={CheckCircle2} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1 h-full flex flex-col">
          <EstadosDonutChart data={resumen.proyectosPorEstado} />
        </div>
        <div className="md:col-span-2 h-full flex flex-col">
          {resumen.proyectos && (
            <PresupuestoBarChart proyectos={resumen.proyectos} />
          )}
        </div>
      </div>
      
      <div>
        {resumen.historialActividad && (
          <ActividadAreaChart historial={resumen.historialActividad} />
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {resumen.proyectos && (
          <>
            <ProyectosPorClienteChart proyectos={resumen.proyectos} />
            <PresupuestoPorEstadoChart proyectos={resumen.proyectos} />
          </>
        )}
      </div>
    </div>
  );
}
