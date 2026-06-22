import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Proyecto, Cliente, ProyectoRequest, EstadoProyecto } from '../../types';
import { createProyecto, updateProyecto } from '../../api/proyectos';
import { getClientes } from '../../api/clientes';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const proyectoSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres'),
  descripcion: z.string().min(10, 'Mínimo 10 caracteres'),
  estado: z.enum(['PLANEADO', 'EN_EJECUCION', 'PAUSADO', 'FINALIZADO']),
  presupuesto: z.coerce.number().min(0, 'El presupuesto debe ser mayor a 0'),
  fechaInicio: z.string().min(1, 'Fecha requerida'),
  fechaFin: z.string().min(1, 'Fecha requerida'),
  clienteId: z.string().min(1, 'Seleccione un cliente válido'),
});

type ProyectoFormValues = z.infer<typeof proyectoSchema>;

interface ProyectoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proyectoToEdit?: Proyecto | null;
  onSuccess: () => void;
}

export function ProyectoFormDialog({ open, onOpenChange, proyectoToEdit, onSuccess }: ProyectoFormDialogProps) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProyectoFormValues>({
    resolver: zodResolver(proyectoSchema),
    defaultValues: {
      estado: 'PLANEADO',
      presupuesto: 0,
    }
  });

  useEffect(() => {
    if (open) {
      getClientes().then(setClientes).catch(() => toast.error('Error cargando clientes'));
      if (proyectoToEdit) {
        reset({
          nombre: proyectoToEdit.nombre,
          descripcion: proyectoToEdit.descripcion,
          estado: proyectoToEdit.estado,
          presupuesto: proyectoToEdit.presupuesto,
          fechaInicio: proyectoToEdit.fechaInicio,
          fechaFin: proyectoToEdit.fechaFin,
          clienteId: proyectoToEdit.clienteId,
        });
      } else {
        reset({ estado: 'PLANEADO', presupuesto: 0 });
      }
    }
  }, [open, proyectoToEdit, reset]);

  const onSubmit = async (data: ProyectoFormValues) => {
    try {
      setIsLoading(true);
      if (proyectoToEdit) {
        await updateProyecto(proyectoToEdit.id, data);
        toast.success('Proyecto actualizado exitosamente');
      } else {
        await createProyecto(data);
        toast.success('Proyecto creado exitosamente');
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error(proyectoToEdit ? 'Error al actualizar proyecto' : 'Error al crear proyecto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">{proyectoToEdit ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
          <DialogDescription>
            {proyectoToEdit ? 'Actualiza los detalles del proyecto.' : 'Ingresa la información para crear un nuevo proyecto.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="nombre">Nombre del Proyecto</Label>
              <Input id="nombre" {...register('nombre')} className={errors.nombre ? 'border-destructive' : ''} />
              {errors.nombre && <p className="text-xs text-destructive">{errors.nombre.message}</p>}
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" {...register('descripcion')} rows={3} className={`resize-none ${errors.descripcion ? 'border-destructive' : ''}`} />
              {errors.descripcion && <p className="text-xs text-destructive">{errors.descripcion.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clienteId">Cliente</Label>
              <Select value={watch('clienteId') || ''} onValueChange={(val) => setValue('clienteId', val, { shouldValidate: true })}>
                <SelectTrigger className={errors.clienteId ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Seleccionar cliente">
                    {clientes.find(c => c.id === watch('clienteId'))?.razonSocial || 'Seleccionar cliente'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {clientes.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.razonSocial}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.clienteId && <p className="text-xs text-destructive">{errors.clienteId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={watch('estado') || 'PLANEADO'} onValueChange={(val: EstadoProyecto) => setValue('estado', val, { shouldValidate: true })}>
                <SelectTrigger className={errors.estado ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Seleccionar estado">
                    {watch('estado') === 'PLANEADO' ? 'Planeado' :
                     watch('estado') === 'EN_EJECUCION' ? 'En Ejecución' :
                     watch('estado') === 'PAUSADO' ? 'Pausado' :
                     watch('estado') === 'FINALIZADO' ? 'Finalizado' : 'Seleccionar estado'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANEADO">Planeado</SelectItem>
                  <SelectItem value="EN_EJECUCION">En Ejecución</SelectItem>
                  <SelectItem value="PAUSADO">Pausado</SelectItem>
                  <SelectItem value="FINALIZADO">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="presupuesto">Presupuesto (PEN)</Label>
              <Input id="presupuesto" type="number" step="0.01" {...register('presupuesto')} className={errors.presupuesto ? 'border-destructive' : ''} />
              {errors.presupuesto && <p className="text-xs text-destructive">{errors.presupuesto.message}</p>}
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              {/* placeholder para alinear */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha Inicio</Label>
              <Input id="fechaInicio" type="date" {...register('fechaInicio')} className={errors.fechaInicio ? 'border-destructive' : ''} />
              {errors.fechaInicio && <p className="text-xs text-destructive">{errors.fechaInicio.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaFin">Fecha Fin</Label>
              <Input id="fechaFin" type="date" {...register('fechaFin')} className={errors.fechaFin ? 'border-destructive' : ''} />
              {errors.fechaFin && <p className="text-xs text-destructive">{errors.fechaFin.message}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-4 gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {proyectoToEdit ? 'Guardar Cambios' : 'Crear Proyecto'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
