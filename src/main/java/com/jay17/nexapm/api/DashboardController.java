package com.jay17.nexapm.api;

import com.jay17.nexapm.dto.response.DashboardResponse;
import com.jay17.nexapm.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Dashboard KPIs — solo ADMIN.
 */
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Dashboard", description = "KPIs y métricas del sistema para administradores")
@SecurityRequirement(name = "Bearer Authentication")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/resumen")
    @Operation(
        summary = "Resumen ejecutivo del sistema",
        description = """
            Devuelve KPIs consolidados:
            - Total de proyectos, clientes, consultores y asignaciones
            - Desglose de proyectos por estado
            - Avance promedio global
            - Los 5 proyectos más recientes con su último avance registrado
            """
    )
    public DashboardResponse resumen() {
        return dashboardService.obtenerResumen();
    }
}
