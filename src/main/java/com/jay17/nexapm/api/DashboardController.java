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

import com.jay17.nexapm.model.Usuario;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

/**
 * Dashboard KPIs — solo ADMIN y CONSULTOR.
 */
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'CONSULTOR')")
@Tag(name = "Dashboard", description = "KPIs y métricas del sistema para administradores y consultores")
@SecurityRequirement(name = "Bearer Authentication")
public class DashboardController {

    private final DashboardService dashboardService;
    @GetMapping("/resumen")
    @Operation(
        summary = "Resumen ejecutivo del sistema",
        description = "Devuelve KPIs consolidados. Si es ADMIN ve todo, si es CONSULTOR ve solo lo suyo."
    )
    public DashboardResponse resumen(@AuthenticationPrincipal Usuario usuario) {
        return dashboardService.obtenerResumen(usuario);
    }
}
