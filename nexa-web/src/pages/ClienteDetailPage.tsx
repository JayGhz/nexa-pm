import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCliente } from '../api/clientes';
import api from '../api/axios';
import type { Cliente, Proyecto } from '../types';
import { PageSkeleton } from '../components/shared/PageSkeleton';
import { formatCurrency } from '../lib/utils';
import { StatusBadge } from '../components/shared/StatusBadge';
import { ArrowLeft, Building2, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { toast } from 'sonner';

export default function ClienteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const clienteData = await getCliente(id);
        setCliente(clienteData);
        // This endpoint doesn't explicitly exist in the backend plan but we can filter all projects
        // Or assume there's a way. Let's fetch all and filter for now as a workaround for the UI demonstration.
        const res = await api.get<Proyecto[]>('/proyectos');
        const projCliente = res.data.filter(p => p.clienteId === id);
        setProyectos(projCliente);
      } catch (error) {
        toast.error('Error al cargar detalles del cliente');
        navigate('/clientes');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id, navigate]);

  if (isLoading || !cliente) return <PageSkeleton />;

  const presupuestoTotal = proyectos.reduce((acc, p) => acc + p.presupuesto, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/clientes')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold tracking-tight">{cliente.razonSocial}</h2>
            <p className="text-muted-foreground">{cliente.sector}</p>
            <p className="text-sm text-muted-foreground mt-2">Proyectos: {proyectos.length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Representante</p>
                <p className="font-medium text-foreground">{cliente.contacto}</p>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{cliente.correo}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{cliente.telefono}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="text-muted-foreground italic">Dirección no registrada</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-primary">Resumen Comercial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Proyectos</span>
                <span className="font-bold text-lg">{proyectos.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Inversión Total</span>
                <span className="font-bold text-lg text-primary">{formatCurrency(presupuestoTotal)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Proyectos Asociados</CardTitle>
            </CardHeader>
            <CardContent>
              {proyectos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Este cliente aún no tiene proyectos registrados.</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Presupuesto</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proyectos.map((proyecto) => (
                        <TableRow 
                          key={proyecto.id} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => navigate(`/proyectos/${proyecto.id}`)}
                        >
                          <TableCell className="font-medium">{proyecto.nombre}</TableCell>
                          <TableCell>
                            <StatusBadge status={proyecto.estado} />
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {formatCurrency(proyecto.presupuesto)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
