package com.jay17.nexapm.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Respuesta de Asignacion con datos del consultor y proyecto embebidos.
 */
public record AsignacionResponse(
    UUID id,
    UUID proyectoId,
    String proyectoNombre,
    UUID usuarioId,
    String usuarioNombre,
    String usuarioCorreo,
    Integer horasAsignadas,
    LocalDate fechaAsignacion,
    LocalDateTime createdAt
) {}
