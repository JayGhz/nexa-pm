import { Badge } from '../ui/badge';
import type { EstadoProyecto } from '../../types';

interface StatusBadgeProps {
  status: EstadoProyecto;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case 'PLANEADO':
      return <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">Planeado</Badge>;
    case 'EN_EJECUCION':
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">En Ejecución</Badge>;
    case 'PAUSADO':
      return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Pausado</Badge>;
    case 'FINALIZADO':
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Finalizado</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
