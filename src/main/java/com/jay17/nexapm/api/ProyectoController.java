package com.jay17.nexapm.api;

import com.jay17.nexapm.dto.request.CambiarEstadoRequest;
import com.jay17.nexapm.dto.request.ProyectoRequest;
import com.jay17.nexapm.dto.response.ProyectoResponse;
import com.jay17.nexapm.model.Usuario;
import com.jay17.nexapm.service.ProyectoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Gestión de Proyectos.
 */
@RestController
@RequestMapping("/proyectos")
@RequiredArgsConstructor
@Tag(name = "Proyectos", description = "Gestión del ciclo de vida de proyectos de consultoría")
@SecurityRequirement(name = "Bearer Authentication")
public class ProyectoController {

    private final ProyectoService proyectoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Crear proyecto (ADMIN)")
    public ProyectoResponse crear(@Valid @RequestBody ProyectoRequest request) {
        return proyectoService.crear(request);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Listar todos los proyectos (ADMIN)")
    public List<ProyectoResponse> listarTodos() {
        return proyectoService.listarTodos();
    }

    @GetMapping("/mis-proyectos")
    @PreAuthorize("hasAnyRole('ADMIN','CONSULTOR')")
    @Operation(summary = "Listar proyectos asignados al consultor autenticado")
    public List<ProyectoResponse> misProyectos(@AuthenticationPrincipal Usuario usuario) {
        return proyectoService.listarPorUsuario(usuario.getId());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSULTOR')")
    @Operation(summary = "Obtener proyecto por ID")
    public ProyectoResponse obtenerPorId(@PathVariable UUID id) {
        return proyectoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Actualizar proyecto completo (ADMIN)")
    public ProyectoResponse actualizar(@PathVariable UUID id,
                                       @Valid @RequestBody ProyectoRequest request) {
        return proyectoService.actualizar(id, request);
    }

    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Cambiar estado del proyecto (ADMIN)",
               description = "Estados válidos: PLANEADO, EN_EJECUCION, PAUSADO, FINALIZADO")
    public ProyectoResponse cambiarEstado(@PathVariable UUID id,
                                          @Valid @RequestBody CambiarEstadoRequest request) {
        return proyectoService.cambiarEstado(id, request.estado());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar proyecto (ADMIN)")
    public void eliminar(@PathVariable UUID id) {
        proyectoService.eliminar(id);
    }
}
