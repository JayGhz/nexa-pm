package com.jay17.nexapm.api;

import com.jay17.nexapm.dto.request.ClienteRequest;
import com.jay17.nexapm.dto.response.ClienteResponse;
import com.jay17.nexapm.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Gestión de Clientes.
 * - GET: ADMIN y CONSULTOR.
 * - POST/PUT/DELETE: solo ADMIN.
 */
@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
@Tag(name = "Clientes", description = "Gestión de clientes de la consultora")
@SecurityRequirement(name = "Bearer Authentication")
public class ClienteController {

    private final ClienteService clienteService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear nuevo cliente (ADMIN)")
    public ClienteResponse crear(@Valid @RequestBody ClienteRequest request) {
        return clienteService.crear(request);
    }

    @GetMapping
    @Operation(summary = "Listar todos los clientes")
    public List<ClienteResponse> listarTodos() {
        return clienteService.listarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener cliente por ID")
    public ClienteResponse obtenerPorId(@PathVariable UUID id) {
        return clienteService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar cliente (ADMIN)")
    public ClienteResponse actualizar(@PathVariable UUID id,
                                      @Valid @RequestBody ClienteRequest request) {
        return clienteService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar cliente (ADMIN) — falla si tiene proyectos")
    public void eliminar(@PathVariable UUID id) {
        clienteService.eliminar(id);
    }
}
