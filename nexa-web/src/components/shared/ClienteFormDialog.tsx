import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Cliente } from '../../types';
import api from '../../api/axios';
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

const clienteSchema = z.object({
  razonSocial: z.string().min(3, 'Mínimo 3 caracteres'),
  sector: z.string().min(2, 'Sector es requerido'),
  contacto: z.string().min(3, 'Contacto es requerido'),
  correo: z.string().email('Correo inválido'),
  telefono: z.string().min(6, 'Teléfono es requerido'),
});

type ClienteFormValues = z.infer<typeof clienteSchema>;

interface ClienteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clienteToEdit?: Cliente | null;
  onSuccess: () => void;
}

export function ClienteFormDialog({ open, onOpenChange, clienteToEdit, onSuccess }: ClienteFormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema)
  });

  useEffect(() => {
    if (open) {
      if (clienteToEdit) {
        reset(clienteToEdit);
      } else {
        reset({
          razonSocial: '', sector: '', contacto: '', correo: '', telefono: ''
        });
      }
    }
  }, [open, clienteToEdit, reset]);

  const onSubmit = async (data: ClienteFormValues) => {
    try {
      setIsLoading(true);
      if (clienteToEdit) {
        await api.put(`/clientes/${clienteToEdit.id}`, data);
        toast.success('Cliente actualizado');
      } else {
        await api.post('/clientes', data);
        toast.success('Cliente creado');
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error(clienteToEdit ? 'Error al actualizar cliente' : 'Error al crear cliente');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{clienteToEdit ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
          <DialogDescription>
            {clienteToEdit ? 'Actualiza los datos del cliente.' : 'Registra un nuevo cliente corporativo.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="razonSocial">Razón Social</Label>
            <Input id="razonSocial" {...register('razonSocial')} className={errors.razonSocial ? 'border-destructive' : ''} />
            {errors.razonSocial && <p className="text-xs text-destructive">{errors.razonSocial.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sector">Sector</Label>
            <Input id="sector" {...register('sector')} className={errors.sector ? 'border-destructive' : ''} />
            {errors.sector && <p className="text-xs text-destructive">{errors.sector.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contacto">Persona de Contacto</Label>
            <Input id="contacto" {...register('contacto')} className={errors.contacto ? 'border-destructive' : ''} />
            {errors.contacto && <p className="text-xs text-destructive">{errors.contacto.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="correo">Correo</Label>
              <Input id="correo" type="email" {...register('correo')} className={errors.correo ? 'border-destructive' : ''} />
              {errors.correo && <p className="text-xs text-destructive">{errors.correo.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" {...register('telefono')} className={errors.telefono ? 'border-destructive' : ''} />
              {errors.telefono && <p className="text-xs text-destructive">{errors.telefono.message}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-4 gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancelar</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {clienteToEdit ? 'Guardar' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
