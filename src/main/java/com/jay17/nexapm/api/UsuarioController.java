package com.jay17.nexapm.api;

import com.jay17.nexapm.dto.response.UsuarioResponse;
import com.jay17.nexapm.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Gestión de Usuarios — solo ADMIN.
 */
@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Usuarios", description = "Gestión de usuarios del sistema (solo ADMIN)")
@SecurityRequirement(name = "Bearer Authentication")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    @Operation(summary = "Listar todos los usuarios")
    public List<UsuarioResponse> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/consultores")
    @Operation(summary = "Listar solo usuarios con rol CONSULTOR")
    public List<UsuarioResponse> listarConsultores() {
        return usuarioService.listarConsultores();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario por ID")
    public UsuarioResponse obtenerPorId(@PathVariable UUID id) {
        return usuarioService.obtenerPorId(id);
    }

    @PatchMapping("/{id}/activar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Activar usuario")
    public void activar(@PathVariable UUID id) {
        usuarioService.activarDesactivar(id, true);
    }

    @PatchMapping("/{id}/desactivar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Desactivar usuario (sin eliminar)")
    public void desactivar(@PathVariable UUID id) {
        usuarioService.activarDesactivar(id, false);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar usuario permanentemente")
    public void eliminar(@PathVariable UUID id) {
        usuarioService.eliminar(id);
    }
}
