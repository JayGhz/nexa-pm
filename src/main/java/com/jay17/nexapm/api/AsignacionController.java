package com.jay17.nexapm.api;

import com.jay17.nexapm.dto.request.AsignacionRequest;
import com.jay17.nexapm.dto.response.AsignacionResponse;
import com.jay17.nexapm.service.AsignacionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Gestión de Asignaciones (consultor ↔ proyecto).
 */
@RestController
@RequestMapping("/asignaciones")
@RequiredArgsConstructor
@Tag(name = "Asignaciones", description = "Asignar y gestionar consultores en proyectos")
@SecurityRequirement(name = "Bearer Authentication")
public class AsignacionController {

    private final AsignacionService asignacionService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Asignar consultor a proyecto (ADMIN)")
    public AsignacionResponse asignar(@Valid @RequestBody AsignacionRequest request) {
        return asignacionService.asignar(request);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Listar todas las asignaciones (ADMIN)")
    public List<AsignacionResponse> listarTodas() {
        return asignacionService.listarTodas();
    }

    @GetMapping("/proyecto/{proyectoId}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSULTOR')")
    @Operation(summary = "Listar asignaciones de un proyecto")
    public List<AsignacionResponse> listarPorProyecto(@PathVariable UUID proyectoId) {
        return asignacionService.listarPorProyecto(proyectoId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Desasignar consultor (ADMIN)")
    public void desasignar(@PathVariable UUID id) {
        asignacionService.desasignar(id);
    }
}
