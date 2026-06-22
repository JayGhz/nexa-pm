import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProyecto, deleteProyecto } from '../api/proyectos';
import { getSeguimientosByProyecto } from '../api/seguimientos';
import { getAsignacionesByProyecto } from '../api/asignaciones';
import type { Proyecto, Seguimiento, Asignacion } from '../types';
import { useAuthStore } from '../store/authStore';
import { formatCurrency, formatDate } from '../lib/utils';
import { StatusBadge } from '../components/shared/StatusBadge';
import { PageSkeleton } from '../components/shared/PageSkeleton';
import { ProyectoFormDialog } from '../components/shared/ProyectoFormDialog';
import { SeguimientoFormDialog } from '../components/shared/SeguimientoFormDialog';
import { AsignacionFormDialog } from '../components/shared/AsignacionFormDialog';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { 
  ArrowLeft, Edit, Trash2, Plus, Users, Calendar, DollarSign, Activity, Building, Clock
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from 'sonner';

export default function ProyectoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { usuario } = useAuthStore();
  
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([]);
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSeguimientoOpen, setIsSeguimientoOpen] = useState(false);
  const [isAsignacionOpen, setIsAsignacionOpen] = useState(false);

  const loadData = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const [projData, segData, asigData] = await Promise.all([
        getProyecto(id),
        getSeguimientosByProyecto(id),
        getAsignacionesByProyecto(id)
      ]);
      setProyecto(projData);
      // Sort by newest first
      setSeguimientos(segData.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()));
      setAsignaciones(asigData);
    } catch (error) {
      toast.error('Error al cargar los detalles del proyecto');
      navigate('/proyectos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('¿Estás seguro de eliminar este proyecto de forma permanente?')) return;
    try {
      await deleteProyecto(id);
      toast.success('Proyecto eliminado');
      navigate('/proyectos');
    } catch (error) {
      toast.error('Error al eliminar el proyecto');
    }
  };

  // Progress Calculations
  const progressData = useMemo(() => {
    if (!proyecto) return { timeProgress: 0, daysLeft: 0, totalDays: 0 };
    const start = new Date(proyecto.fechaInicio).getTime();
    const end = new Date(proyecto.fechaFin).getTime();
    const now = new Date().getTime();
    
    const totalDays = Math.max(1, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
    let daysPassed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    
    if (daysPassed < 0) daysPassed = 0;
    if (daysPassed > totalDays) daysPassed = totalDays;
    
    const timeProgress = Math.round((daysPassed / totalDays) * 100);
    const daysLeft = totalDays - daysPassed;
    
    return { timeProgress, daysLeft, totalDays };
  }, [proyecto]);

  if (isLoading || !proyecto) return <PageSkeleton />;

  const isAdmin = usuario?.rol === 'ADMIN';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/proyectos')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-heading font-bold tracking-tight">{proyecto.nombre}</h2>
              <StatusBadge status={proyecto.estado} />
            </div>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Building className="h-4 w-4" /> {proyecto.clienteNombre || 'Sin cliente'}
            </p>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditOpen(true)}>
                <Edit className="mr-2 h-4 w-4" /> Editar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
              </Button>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm border-l-4 border-primary pl-4 py-1 text-muted-foreground">
        {proyecto.descripcion}
      </p>

      {/* STATS CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presupuesto</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(proyecto.presupuesto)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{asignaciones.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Asignados al proyecto</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Transcurrido</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{progressData.timeProgress}% consumido</span>
              <span className="text-xs text-muted-foreground">{progressData.daysLeft} días restantes</span>
            </div>
            <Progress value={progressData.timeProgress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> {formatDate(proyecto.fechaInicio)}</span>
              <span>{formatDate(proyecto.fechaFin)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* CHART SECTION */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Evolución de Avance</CardTitle>
              <CardDescription>Progreso del proyecto a lo largo del tiempo</CardDescription>
            </div>
            <Button size="sm" onClick={() => setIsSeguimientoOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Agregar Avance
            </Button>
          </CardHeader>
          <CardContent>
            {seguimientos.length > 0 ? (
              <div className="h-[300px] w-full mt-4" style={{ minWidth: 0 }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                  <AreaChart data={seguimientos} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAvance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="fecha" 
                      tickLine={false} 
                      axisLine={false} 
                      fontSize={12} 
                      tickMargin={10} 
                      tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelFormatter={(label) => new Date(label as string).toLocaleDateString()}
                      formatter={(value: number) => [`${value}%`, 'Avance']}
                    />
                    <Area type="monotone" dataKey="avance" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorAvance)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed mt-4">
                <Activity className="h-8 w-8 mb-2 opacity-50" />
                <p>No hay registros de avance aún</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ASIGNACIONES SECTION */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Equipo</CardTitle>
            {isAdmin && (
              <Button size="sm" variant="outline" onClick={() => setIsAsignacionOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Asignar
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {asignaciones.length > 0 ? (
              <div className="space-y-4 mt-4">
                {asignaciones.map((asig) => (
                  <div key={asig.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{asig.usuarioNombre}</p>
                      <p className="text-xs text-muted-foreground">{asig.usuarioCorreo}</p>
                    </div>
                    <div className="text-sm font-semibold bg-primary/10 text-primary px-2 py-1 rounded-md">
                      {asig.horasAsignadas} hrs
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                No hay consultores asignados
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* SEGUIMIENTOS TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Seguimientos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Avance Registrado</TableHead>
                <TableHead>Comentario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seguimientos.length > 0 ? (
                seguimientos.map((seg) => (
                  <TableRow key={seg.id}>
                    <TableCell className="font-medium">{formatDate(seg.fecha)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={seg.avance} className="w-[60px]" />
                        <span>{seg.avance}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{seg.comentario}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    Sin registros.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MODALS */}
      {proyecto && (
        <ProyectoFormDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          proyectoToEdit={proyecto}
          onSuccess={loadData}
        />
      )}
      <SeguimientoFormDialog
        open={isSeguimientoOpen}
        onOpenChange={setIsSeguimientoOpen}
        proyectoId={id!}
        onSuccess={loadData}
      />
      <AsignacionFormDialog
        open={isAsignacionOpen}
        onOpenChange={setIsAsignacionOpen}
        proyectoId={id!}
        onSuccess={loadData}
      />
    </div>
  );
}
