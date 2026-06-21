package com.jay17.nexapm.dto.request;

import com.jay17.nexapm.model.EstadoProyecto;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO de entrada para crear o actualizar un Proyecto.
 */
public record ProyectoRequest(

    @NotBlank(message = "El nombre del proyecto es obligatorio")
    String nombre,

    String descripcion,

    @NotNull(message = "El estado es obligatorio")
    EstadoProyecto estado,

    @DecimalMin(value = "0.0", inclusive = false, message = "El presupuesto debe ser mayor a 0")
    BigDecimal presupuesto,

    @NotNull(message = "La fecha de inicio es obligatoria")
    LocalDate fechaInicio,

    LocalDate fechaFin,

    @NotNull(message = "El cliente es obligatorio")
    UUID clienteId
) {}
