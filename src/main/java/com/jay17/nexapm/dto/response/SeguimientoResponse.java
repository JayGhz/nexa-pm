package com.jay17.nexapm.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Respuesta de Seguimiento con datos del proyecto embebidos.
 */
public record SeguimientoResponse(
    UUID id,
    UUID proyectoId,
    String proyectoNombre,
    LocalDate fecha,
    Integer avance,
    String comentario,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
