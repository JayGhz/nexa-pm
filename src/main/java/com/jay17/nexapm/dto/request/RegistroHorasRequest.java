package com.jay17.nexapm.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Data;

@Data
public class RegistroHorasRequest {

    @NotNull(message = "El proyectoId no puede ser nulo")
    private UUID proyectoId;

    @NotNull(message = "La fecha no puede ser nula")
    private LocalDate fecha;

    @NotNull(message = "Las horas trabajadas no pueden ser nulas")
    @DecimalMin(value = "0.5", message = "Debe registrar al menos 0.5 horas")
    @DecimalMax(value = "24.0", message = "No puede registrar más de 24 horas en un día")
    private Double horasTrabajadas;

    @NotBlank(message = "La descripción no puede estar vacía")
    private String descripcion;
}
