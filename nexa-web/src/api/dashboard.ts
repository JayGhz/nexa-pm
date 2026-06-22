import api from './axios';
import type { DashboardResumen } from '../types';
import { getProyectos, getMisProyectos } from './proyectos';
import { useAuthStore } from '../store/authStore';

export const getDashboardResumen = async (): Promise<DashboardResumen> => {
  const isAdmin = useAuthStore.getState().usuario?.rol === 'ADMIN';
  
  if (isAdmin) {
    const [response, proyectos] = await Promise.all([
      api.get<any>('/dashboard/resumen'),
      getProyectos()
    ]);
    
    const rd = response.data;
    const presupuestoTotal = proyectos.reduce((acc, p) => acc + (p.presupuesto || 0), 0);
    
    return {
      totalProyectosActivos: rd.proyectosPorEstado['EN_EJECUCION'] || 0,
      totalConsultores: rd.totalConsultores || 0,
      presupuestoTotal: presupuestoTotal,
      proyectosCompletados: rd.proyectosPorEstado['FINALIZADO'] || 0,
      proyectosPorEstado: rd.proyectosPorEstado || {},
      avancePromedioGeneral: rd.avancePromedioGeneral || 0,
      proyectosRecientes: rd.proyectosRecientes || [],
      historialActividad: rd.historialActividad || [],
      proyectos: proyectos,
    };
  } else {
    // Consultor: calcular métricas usando solo sus proyectos asignados
    // Esto evita la llamada al dashboard global (restringido en AWS)
    const proyectos = await getMisProyectos();
    
    let activos = 0;
    let completados = 0;
    let presupuestoTotal = 0;
    const porEstado: Record<string, number> = {};
    
    proyectos.forEach(p => {
      presupuestoTotal += (p.presupuesto || 0);
      porEstado[p.estado] = (porEstado[p.estado] || 0) + 1;
      if (p.estado === 'EN_EJECUCION') activos++;
      if (p.estado === 'FINALIZADO') completados++;
    });
    
    const recientes = [...proyectos].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).slice(0, 5);
    const proyectosRecientesMapped = recientes.map(p => ({
      id: p.id,
      nombre: p.nombre,
      estado: p.estado,
      clienteNombre: p.clienteNombre || 'N/A',
      ultimoAvance: null,
      historial: [] 
    }));

    return {
      totalProyectosActivos: activos,
      totalConsultores: 0,
      presupuestoTotal: presupuestoTotal,
      proyectosCompletados: completados,
      proyectosPorEstado: porEstado,
      avancePromedioGeneral: 0,
      proyectosRecientes: proyectosRecientesMapped as any,
      historialActividad: [],
      proyectos: proyectos,
    };
  }
};
