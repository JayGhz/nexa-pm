import { useEffect, useState } from 'react';
import { getProyectos, getMisProyectos, deleteProyecto } from '../api/proyectos';
import type { Proyecto } from '../types';
import { useAuthStore } from '../store/authStore';
import { StatusBadge } from '../components/shared/StatusBadge';
import { formatCurrency, formatDate } from '../lib/utils';
import { PageSkeleton } from '../components/shared/PageSkeleton';
import { EmptyState } from '../components/shared/EmptyState';
import { StatCard } from '../components/shared/StatCard';
import { Briefcase, MoreHorizontal, Plus, Search, DollarSign, Activity } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '../components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ProyectoFormDialog } from '../components/shared/ProyectoFormDialog';

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [proyectoToEdit, setProyectoToEdit] = useState<Proyecto | null>(null);

  const { usuario } = useAuthStore();
  const navigate = useNavigate();

  const loadProyectos = async () => {
    try {
      setIsLoading(true);
      const data = usuario?.rol === 'ADMIN' ? await getProyectos() : await getMisProyectos();
      setProyectos(data);
    } catch (error) {
      toast.error('Error al cargar los proyectos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProyectos();
  }, [usuario]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este proyecto de forma permanente?')) {
      return;
    }
    try {
      await deleteProyecto(id);
      toast.success('Proyecto eliminado exitosamente');
      loadProyectos();
    } catch (error) {
      toast.error('Error al eliminar proyecto');
    }
  };

  const handleOpenCreate = () => {
    setProyectoToEdit(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (proyecto: Proyecto) => {
    setProyectoToEdit(proyecto);
    setIsDialogOpen(true);
  };

  const filteredProyectos = proyectos.filter(p =>
    (p.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.clienteNombre || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPresupuesto = proyectos.reduce((acc, p) => acc + (p.presupuesto || 0), 0);
  const activos = proyectos.filter(p => p.estado === 'EN_EJECUCION').length;

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight">Proyectos</h2>
          <p className="text-muted-foreground mt-1">
            Gestiona los proyectos de consultoría.
          </p>
        </div>

        {usuario?.rol === 'ADMIN' && (
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Proyecto
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard
          title="Total de Proyectos"
          value={proyectos.length}
          icon={Briefcase}
        />
        <StatCard
          title="Proyectos Activos"
          value={activos}
          icon={Activity}
        />
        <StatCard
          title="Presupuesto Global"
          value={formatCurrency(totalPresupuesto)}
          icon={DollarSign}
        />
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o cliente..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
        {filteredProyectos.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No hay proyectos"
            description="No se encontraron proyectos que coincidan con la búsqueda."
            actionLabel={usuario?.rol === 'ADMIN' ? 'Crear Proyecto' : undefined}
            onAction={usuario?.rol === 'ADMIN' ? handleOpenCreate : undefined}
          />
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Presupuesto</TableHead>
                <TableHead>Fechas</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProyectos.map((proyecto) => (
                <TableRow key={proyecto.id} className="group">
                  <TableCell className="font-medium w-1/3 max-w-0">
                    <div className="cursor-pointer hover:text-primary transition-colors truncate" title={proyecto.nombre} onClick={() => navigate(`/proyectos/${proyecto.id}`)}>
                      {proyecto.nombre}
                    </div>
                  </TableCell>
                  <TableCell className="w-1/4 max-w-0">
                    <div className="truncate" title={proyecto.clienteNombre || ''}>
                      {proyecto.clienteNombre || 'Sin Cliente'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={proyecto.estado} />
                  </TableCell>
                  <TableCell className="text-right font-medium text-muted-foreground">
                    {formatCurrency(proyecto.presupuesto)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(proyecto.fechaInicio)} - {formatDate(proyecto.fechaFin)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => navigate(`/proyectos/${proyecto.id}`)}>
                            Ver detalles
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        {usuario?.rol === 'ADMIN' && (
                          <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => handleOpenEdit(proyecto)}>
                              Editar proyecto
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(proyecto.id)}>
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <ProyectoFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        proyectoToEdit={proyectoToEdit}
        onSuccess={loadProyectos}
      />
    </div>
  );
}
