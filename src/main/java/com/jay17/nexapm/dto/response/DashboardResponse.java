package com.jay17.nexapm.dto.response;

import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Respuesta del dashboard con KPIs del sistema para ADMIN.
 */
public record DashboardResponse(

    /** Totales globales */
    long totalProyectos,
    long totalClientes,
    long totalConsultores,
    long totalAsignaciones,

    /** Proyectos agrupados por estado */
    Map<String, Long> proyectosPorEstado,

    /** Avance promedio de todos los seguimientos registrados */
    Double avancePromedioGeneral,

    /** Los 5 proyectos más recientes con su último avance */
    List<ProyectoResumen> proyectosRecientes
) {
    /**
     * Resumen ligero de un proyecto para el dashboard.
     */
    public record ProyectoResumen(
        UUID id,
        String nombre,
        String estado,
        String clienteNombre,
        Integer ultimoAvance
    ) {}
}
