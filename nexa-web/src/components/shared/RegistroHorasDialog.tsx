import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { registrarHoras } from '../../api/registroHoras';
import { Clock } from 'lucide-react';

const registroHorasSchema = z.object({
  fecha: z.string().min(1, 'Seleccione una fecha'),
  horasTrabajadas: z.coerce
    .number()
    .min(0.5, 'Mínimo 0.5 horas')
    .max(24, 'Máximo 24 horas'),
  descripcion: z.string().min(5, 'La descripción debe tener al menos 5 caracteres').max(255, 'La descripción es muy larga'),
});

type RegistroHorasForm = z.infer<typeof registroHorasSchema>;

interface RegistroHorasDialogProps {
  proyectoId: string;
  proyectoNombre: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegistroSuccess: () => void;
}

export function RegistroHorasDialog({
  proyectoId,
  proyectoNombre,
  open,
  onOpenChange,
  onRegistroSuccess,
}: RegistroHorasDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistroHorasForm>({
    resolver: zodResolver(registroHorasSchema) as any,
    defaultValues: {
      fecha: new Date().toISOString().split('T')[0],
      horasTrabajadas: 8,
      descripcion: '',
    },
  });

  const onSubmit = async (data: RegistroHorasForm) => {
    try {
      setIsSubmitting(true);
      await registrarHoras({
        proyectoId,
        fecha: data.fecha,
        horasTrabajadas: data.horasTrabajadas,
        descripcion: data.descripcion,
      });
      toast.success('Horas registradas exitosamente');
      reset();
      onRegistroSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error('Error al registrar las horas');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Registrar Horas
          </DialogTitle>
          <DialogDescription>
            Ingresa las horas trabajadas para el proyecto <span className="font-semibold text-foreground">{proyectoNombre}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha de la actividad</label>
            <Input type="date" {...register('fecha')} max={new Date().toISOString().split('T')[0]} />
            {errors.fecha && (
              <p className="text-sm text-destructive">{errors.fecha.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Horas trabajadas</label>
            <Input
              type="number"
              step="0.5"
              placeholder="Ej: 4.5"
              {...register('horasTrabajadas')}
            />
            {errors.horasTrabajadas && (
              <p className="text-sm text-destructive">{errors.horasTrabajadas.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción de la actividad</label>
            <Textarea
              placeholder="Resume brevemente las tareas realizadas..."
              className="resize-none"
              rows={3}
              {...register('descripcion')}
            />
            {errors.descripcion && (
              <p className="text-sm text-destructive">{errors.descripcion.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Registrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
