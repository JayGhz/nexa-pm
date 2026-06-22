import { useEffect, useState } from 'react';
import { getClientes } from '../api/clientes';
import api from '../api/axios';
import type { Cliente } from '../types';
import { PageSkeleton } from '../components/shared/PageSkeleton';
import { EmptyState } from '../components/shared/EmptyState';
import { StatCard } from '../components/shared/StatCard';
import { ClienteFormDialog } from '../components/shared/ClienteFormDialog';
import { Building2, Search, Plus, Mail, Phone, MoreVertical, Edit2, Trash2, Building, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clienteToEdit, setClienteToEdit] = useState<Cliente | null>(null);

  const navigate = useNavigate();

  const loadClientes = async () => {
    try {
      setIsLoading(true);
      const data = await getClientes();
      setClientes(data || []);
    } catch (error) {
      toast.error('Error al cargar los clientes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClientes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este cliente? Todos sus proyectos también serán eliminados.')) return;
    try {
      await api.delete(`/clientes/${id}`);
      toast.success('Cliente eliminado');
      loadClientes();
    } catch (error) {
      toast.error('Error al eliminar el cliente');
    }
  };

  const filteredClientes = (clientes || []).filter(c => 
    (c.razonSocial || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.sector || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreate = () => {
    setClienteToEdit(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (cliente: Cliente) => {
    setClienteToEdit(cliente);
    setIsDialogOpen(true);
  };

  const totalClientes = (clientes || []).length;
  const sectoresUnicos = new Set((clientes || []).map(c => c.sector).filter(Boolean)).size;

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground mt-1">
            Directorio de clientes corporativos.
          </p>
        </div>
        
        <Button onClick={handleOpenCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <StatCard
          title="Total de Clientes"
          value={totalClientes}
          icon={Building2}
        />
        <StatCard
          title="Sectores Atendidos"
          value={sectoresUnicos}
          icon={BarChart3}
        />
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o sector..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredClientes.length === 0 ? (
        <EmptyState 
          icon={Building2}
          title="No hay clientes"
          description="No se encontraron clientes que coincidan con la búsqueda."
          actionLabel="Crear Cliente"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredClientes.map((cliente) => (
            <Card key={cliente.id} className="group overflow-hidden flex flex-col hover:shadow-md transition-all duration-300">
              <CardHeader className="p-5 pb-4 bg-muted/30 border-b relative">
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <span className="sr-only">Abrir menú</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenEdit(cliente)}>
                        <Edit2 className="h-4 w-4 mr-2" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(cliente.id)}>
                        <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-3">
                  <Building2 className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg leading-tight mb-1 truncate pr-8" title={cliente.razonSocial}>
                  {cliente.razonSocial}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building className="mr-1 h-3 w-3" />
                  {cliente.sector}
                </div>
              </CardHeader>
              <CardContent className="p-5 flex-1 text-sm space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Contacto Principal</p>
                  <p className="font-medium">{cliente.contacto}</p>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate" title={cliente.correo}>{cliente.correo}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4 shrink-0" />
                  <span>{cliente.telefono}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="secondary" className="w-full bg-primary/5 hover:bg-primary/10 text-primary" onClick={() => navigate(`/clientes/${cliente.id}`)}>
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <ClienteFormDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        clienteToEdit={clienteToEdit}
        onSuccess={loadClientes}
      />
    </div>
  );
}
