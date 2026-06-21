package com.jay17.nexapm.dto.request;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO de entrada para registrar o actualizar un Seguimiento (avance de proyecto).
 */
public record SeguimientoRequest(

    @NotNull(message = "El ID del proyecto es obligatorio")
    UUID proyectoId,

    @NotNull(message = "La fecha es obligatoria")
    LocalDate fecha,

    @NotNull(message = "El avance es obligatorio")
    @Min(value = 0, message = "El avance mínimo es 0%")
    @Max(value = 100, message = "El avance máximo es 100%")
    Integer avance,

    @Size(max = 2000, message = "El comentario no puede superar 2000 caracteres")
    String comentario
) {}
