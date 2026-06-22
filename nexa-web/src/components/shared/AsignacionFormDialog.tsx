import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createAsignacion } from '../../api/asignaciones';
import { getUsuarios } from '../../api/usuarios';
import type { Usuario } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
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

const asignacionSchema = z.object({
  usuarioId: z.string().uuid('Seleccione un consultor'),
  horasAsignadas: z.coerce.number().min(1, 'Mínimo 1 hora'),
});

type AsignacionFormValues = z.infer<typeof asignacionSchema>;

interface AsignacionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proyectoId: string;
  onSuccess: () => void;
}

export function AsignacionFormDialog({ open, onOpenChange, proyectoId, onSuccess }: AsignacionFormDialogProps) {
  const [consultores, setConsultores] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<AsignacionFormValues>({
    resolver: zodResolver(asignacionSchema),
    defaultValues: {
      horasAsignadas: 10
    }
  });

  useEffect(() => {
    if (open) {
      getUsuarios().then(data => {
        // Filtrar solo consultores
        setConsultores(data.filter(u => u.rol === 'CONSULTOR'));
      }).catch(() => toast.error('Error cargando consultores'));
    }
  }, [open]);

  const onSubmit = async (data: AsignacionFormValues) => {
    try {
      setIsLoading(true);
      await createAsignacion({ ...data, proyectoId });
      toast.success('Consultor asignado exitosamente');
      reset();
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error('Error al asignar el consultor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) reset();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">Asignar Consultor</DialogTitle>
          <DialogDescription>
            Asigna un consultor a este proyecto especificando las horas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="usuarioId">Consultor</Label>
            <Select value={watch('usuarioId') || ''} onValueChange={(val) => setValue('usuarioId', val)}>
              <SelectTrigger className={errors.usuarioId ? 'border-destructive' : ''}>
                <SelectValue placeholder="Seleccionar consultor">
                  {consultores.find(c => c.id === watch('usuarioId')) 
                    ? `${consultores.find(c => c.id === watch('usuarioId'))?.nombre} (${consultores.find(c => c.id === watch('usuarioId'))?.correo})`
                    : 'Seleccionar consultor'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {consultores.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.nombre} ({c.correo})</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.usuarioId && <p className="text-xs text-destructive">{errors.usuarioId.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="horasAsignadas">Horas Asignadas</Label>
            <Input id="horasAsignadas" type="number" min="1" {...register('horasAsignadas')} className={errors.horasAsignadas ? 'border-destructive' : ''} />
            {errors.horasAsignadas && <p className="text-xs text-destructive">{errors.horasAsignadas.message}</p>}
          </div>

          <div className="flex justify-end pt-4 gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Asignar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
