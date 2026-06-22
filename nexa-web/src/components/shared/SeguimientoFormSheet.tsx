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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const seguimientoSchema = z.object({
  fecha: z.string().min(1, 'La fecha es requerida'),
  avance: z.coerce.number().min(0).max(100, 'El avance debe estar entre 0 y 100'),
  comentario: z.string().min(5, 'Comentario debe tener al menos 5 caracteres'),
});

type SeguimientoFormValues = z.infer<typeof seguimientoSchema>;

interface SeguimientoFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proyectoId: string;
  onSuccess: () => void;
}

export function SeguimientoFormSheet({ open, onOpenChange, proyectoId, onSuccess }: SeguimientoFormSheetProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SeguimientoFormValues>({
    resolver: zodResolver(seguimientoSchema),
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Registrar Seguimiento</SheetTitle>
          <SheetDescription>
            Actualiza el avance del proyecto y añade comentarios relevantes.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input id="fecha" type="date" {...register('fecha')} className={errors.fecha ? 'border-destructive' : ''} />
            {errors.fecha && <p className="text-xs text-destructive">{errors.fecha.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avance">Porcentaje de Avance (0-100%)</Label>
            <Input id="avance" type="number" min="0" max="100" {...register('avance')} className={errors.avance ? 'border-destructive' : ''} />
            {errors.avance && <p className="text-xs text-destructive">{errors.avance.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentario">Comentarios / Novedades</Label>
            <Textarea 
              id="comentario" 
              rows={5} 
              placeholder="Ej. Se completó la fase de levantamiento de información..."
              {...register('comentario')} 
              className={errors.comentario ? 'border-destructive' : ''} 
            />
            {errors.comentario && <p className="text-xs text-destructive">{errors.comentario.message}</p>}
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button type="button" variant="outline" className="mr-2" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Registro
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
