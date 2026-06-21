package com.jay17.nexapm.api;

import com.jay17.nexapm.dto.request.SeguimientoRequest;
import com.jay17.nexapm.dto.response.SeguimientoResponse;
import com.jay17.nexapm.service.SeguimientoService;
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
 * Gestión de Seguimiento (registro de avance de proyectos).
 */
@RestController
@RequestMapping("/seguimiento")
@RequiredArgsConstructor
@Tag(name = "Seguimiento", description = "Registro y consulta del avance porcentual de proyectos")
@SecurityRequirement(name = "Bearer Authentication")
public class SeguimientoController {

    private final SeguimientoService seguimientoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN','CONSULTOR')")
    @Operation(summary = "Registrar nuevo avance de proyecto",
               description = "El campo 'avance' es un entero entre 0 y 100 (porcentaje)")
    public SeguimientoResponse registrar(@Valid @RequestBody SeguimientoRequest request) {
        return seguimientoService.registrar(request);
    }

    @GetMapping("/proyecto/{proyectoId}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSULTOR')")
    @Operation(summary = "Historial de avance de un proyecto (más recientes primero)")
    public List<SeguimientoResponse> listarPorProyecto(@PathVariable UUID proyectoId) {
        return seguimientoService.listarPorProyecto(proyectoId);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSULTOR')")
    @Operation(summary = "Actualizar registro de seguimiento")
    public SeguimientoResponse actualizar(@PathVariable UUID id,
                                          @Valid @RequestBody SeguimientoRequest request) {
        return seguimientoService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar registro de seguimiento (ADMIN)")
    public void eliminar(@PathVariable UUID id) {
        seguimientoService.eliminar(id);
    }
}
