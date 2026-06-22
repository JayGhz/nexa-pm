import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createSeguimiento } from '../../api/seguimientos';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const seguimientoSchema = z.object({
  fecha: z.string().min(1, 'Fecha requerida'),
  avance: z.coerce.number().min(0).max(100, 'El avance debe estar entre 0 y 100'),
  comentario: z.string().min(5, 'Mínimo 5 caracteres'),
});

type SeguimientoFormValues = z.infer<typeof seguimientoSchema>;

interface SeguimientoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proyectoId: string;
  onSuccess: () => void;
}

export function SeguimientoFormDialog({ open, onOpenChange, proyectoId, onSuccess }: SeguimientoFormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SeguimientoFormValues>({
    resolver: zodResolver(seguimientoSchema) as any,
    defaultValues: {
      avance: 0,
      fecha: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmit = async (data: SeguimientoFormValues) => {
    try {
      setIsLoading(true);
      await createSeguimiento({ ...data, proyectoId });
      toast.success('Seguimiento registrado exitosamente');
      reset();
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error('Error al registrar el seguimiento');
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
          <DialogTitle className="font-bold text-lg">Registrar Avance</DialogTitle>
          <DialogDescription>
            Agrega un nuevo registro de avance para este proyecto.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input id="fecha" type="date" {...register('fecha')} className={errors.fecha ? 'border-destructive' : ''} />
            {errors.fecha && <p className="text-xs text-destructive">{errors.fecha.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avance">Avance (%)</Label>
            <Input id="avance" type="number" min="0" max="100" {...register('avance')} className={errors.avance ? 'border-destructive' : ''} />
            {errors.avance && <p className="text-xs text-destructive">{errors.avance.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentario">Comentario</Label>
            <Textarea id="comentario" {...register('comentario')} rows={3} className={errors.comentario ? 'border-destructive' : ''} />
            {errors.comentario && <p className="text-xs text-destructive">{errors.comentario.message}</p>}
          </div>

          <div className="flex justify-end pt-4 gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Registrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
