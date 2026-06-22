import { useEffect, useState } from 'react';
import { getUsuarios } from '../api/usuarios';
import { getAsignaciones } from '../api/asignaciones';
import type { Usuario, Asignacion } from '../types';
import { PageSkeleton } from '../components/shared/PageSkeleton';
import { EmptyState } from '../components/shared/EmptyState';
import { ConsultorFormDialog } from '../components/shared/ConsultorFormDialog';
import { StatCard } from '../components/shared/StatCard';
import { Search, Users, MoreHorizontal, ShieldAlert, UserIcon, Briefcase, Clock, Activity, Plus } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';

export default function ConsultoresPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [usersData, asigData] = await Promise.all([
        getUsuarios(),
        getAsignaciones()
      ]);
      const consultores = (usersData || []).filter(u => u.rol === 'CONSULTOR');
      setUsuarios(consultores);
      setAsignaciones(asigData || []);
    } catch (error) {
      toast.error('Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredUsuarios = (usuarios || []).filter(u => 
    (u.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.correo || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAsignacionesParaUsuario = (usuarioId: string) => {
    return (asignaciones || []).filter(a => a.usuarioId === usuarioId);
  };

  const totalConsultores = (usuarios || []).length;
  const consultoresActivos = (usuarios || []).filter(u => getAsignacionesParaUsuario(u.id).length > 0).length;
  const totalHoras = (asignaciones || []).reduce((acc, a) => acc + (a.horasAsignadas || 0), 0);

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight">Consultores</h2>
          <p className="text-muted-foreground mt-1">
            Gestiona el equipo de consultores y sus asignaciones.
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Consultor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard 
          title="Total de Consultores" 
          value={totalConsultores} 
          icon={Users} 
        />
        <StatCard 
          title="Consultores Activos" 
          value={consultoresActivos} 
          icon={Activity} 
        />
        <StatCard 
          title="Horas Asignadas (Total)" 
          value={`${totalHoras} hrs`} 
          icon={Clock} 
        />
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o correo..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
        {filteredUsuarios.length === 0 ? (
          <EmptyState 
            icon={Users}
            title="No hay consultores"
            description="No se encontraron usuarios con rol de CONSULTOR."
          />
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Consultor</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Carga de Proyectos</TableHead>
                <TableHead className="text-right">Horas Asignadas (Total)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsuarios.map((user) => {
                const userAsignaciones = getAsignacionesParaUsuario(user.id);
                const totalHoras = userAsignaciones.reduce((acc, curr) => acc + curr.horasAsignadas, 0);
                
                return (
                  <TableRow key={user.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-primary/10 text-primary">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {user.nombre.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.nombre}</p>
                          <p className="text-xs text-muted-foreground">{user.correo}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50">
                        {user.rol === 'ADMIN' ? <ShieldAlert className="w-3 h-3 mr-1" /> : <UserIcon className="w-3 h-3 mr-1" />}
                        {user.rol}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{userAsignaciones.length}</span>
                        <span className="text-muted-foreground text-sm">proyectos activos</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {totalHoras} hrs
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <ConsultorFormDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSuccess={loadData} 
      />
    </div>
  );
}
