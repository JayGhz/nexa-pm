import api from './axios';
import type { DashboardResumen } from '../types';
import { getProyectos } from './proyectos';

export const getDashboardResumen = async (): Promise<DashboardResumen> => {
  const [response, proyectos] = await Promise.all([
    api.get<any>('/dashboard/resumen'),
    getProyectos()
  ]);
  
  const rd = response.data;
  
  // Calcular presupuesto total sumando todos los proyectos
  const presupuestoTotal = proyectos.reduce((acc, p) => acc + (p.presupuesto || 0), 0);
  
  // totalProyectosActivos = totalProyectos - proyectosCompletados - proyectosPausados (o simplmente sumar EN_EJECUCION)
  const activos = rd.proyectosPorEstado['EN_EJECUCION'] || 0;
  const completados = rd.proyectosPorEstado['FINALIZADO'] || 0;
  
  return {
    totalProyectosActivos: activos,
    totalConsultores: rd.totalConsultores || 0,
    presupuestoTotal: presupuestoTotal,
    proyectosCompletados: completados,
    proyectosPorEstado: rd.proyectosPorEstado || {},
    avancePromedioGeneral: rd.avancePromedioGeneral || 0,
    proyectosRecientes: rd.proyectosRecientes || [],
    historialActividad: rd.historialActividad || [],
    proyectos: proyectos,
  };
};
