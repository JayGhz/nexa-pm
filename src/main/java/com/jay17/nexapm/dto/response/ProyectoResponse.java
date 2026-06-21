package com.jay17.nexapm.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Respuesta de Proyecto con datos del cliente embebidos.
 */
public record ProyectoResponse(
    UUID id,
    String nombre,
    String descripcion,
    String estado,
    BigDecimal presupuesto,
    LocalDate fechaInicio,
    LocalDate fechaFin,
    UUID clienteId,
    String clienteNombre,
    String clienteSector,
    int totalConsultores,
    Integer ultimoAvance,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
