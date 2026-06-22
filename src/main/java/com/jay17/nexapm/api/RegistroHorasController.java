package com.jay17.nexapm.api;

import com.jay17.nexapm.dto.request.RegistroHorasRequest;
import com.jay17.nexapm.dto.response.RegistroHorasResponse;
import com.jay17.nexapm.service.RegistroHorasService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registro-horas")
@RequiredArgsConstructor
@Tag(name = "Registro de Horas", description = "Gestión de horas de trabajo en proyectos")
@SecurityRequirement(name = "Bearer Authentication")
public class RegistroHorasController {

    private final RegistroHorasService registroHorasService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN','CONSULTOR')")
    @Operation(summary = "Registrar horas trabajadas", description = "El usuario autenticado registrará horas en el proyecto especificado")
    public RegistroHorasResponse registrar(@Valid @RequestBody RegistroHorasRequest request) {
        return registroHorasService.registrar(request);
    }

    @GetMapping("/proyecto/{proyectoId}")
    @PreAuthorize("hasAnyRole('ADMIN','CONSULTOR')")
    @Operation(summary = "Historial de horas de un proyecto", description = "Lista todas las horas registradas en un proyecto específico")
    public List<RegistroHorasResponse> listarPorProyecto(@PathVariable UUID proyectoId) {
        return registroHorasService.listarPorProyecto(proyectoId);
    }
}
