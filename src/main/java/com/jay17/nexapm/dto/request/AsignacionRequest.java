package com.jay17.nexapm.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO de entrada para crear una Asignacion (asignar consultor a proyecto).
 */
public record AsignacionRequest(

    @NotNull(message = "El ID del proyecto es obligatorio")
    UUID proyectoId,

    @NotNull(message = "El ID del usuario/consultor es obligatorio")
    UUID usuarioId,

    @NotNull(message = "Las horas asignadas son obligatorias")
    @Min(value = 1, message = "Las horas asignadas deben ser al menos 1")
    Integer horasAsignadas,

    LocalDate fechaAsignacion
) {}
