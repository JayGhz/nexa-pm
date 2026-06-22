import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { register as registerApi } from '../../api/auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const consultorSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres'),
  correo: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

type ConsultorFormValues = z.infer<typeof consultorSchema>;

interface ConsultorFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ConsultorFormDialog({ open, onOpenChange, onSuccess }: ConsultorFormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ConsultorFormValues>({
    resolver: zodResolver(consultorSchema)
  });

  const onSubmit = async (data: ConsultorFormValues) => {
    try {
      setIsLoading(true);
      await registerApi({
        ...data,
        rol: 'CONSULTOR'
      });
      toast.success('Consultor creado correctamente');
      reset();
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error('Error al crear el consultor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) reset();
      onOpenChange(val);
    }}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nuevo Consultor</DialogTitle>
          <DialogDescription>
            Crea una cuenta para un nuevo consultor. Se le asignará automáticamente el rol de CONSULTOR.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input id="nombre" {...register('nombre')} className={errors.nombre ? 'border-destructive' : ''} />
            {errors.nombre && <p className="text-xs text-destructive">{errors.nombre.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="correo">Correo Electrónico</Label>
            <Input id="correo" type="email" {...register('correo')} className={errors.correo ? 'border-destructive' : ''} />
            {errors.correo && <p className="text-xs text-destructive">{errors.correo.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña Temporal</Label>
            <Input id="password" type="password" {...register('password')} className={errors.password ? 'border-destructive' : ''} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end pt-4 gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancelar</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Crear Consultor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
