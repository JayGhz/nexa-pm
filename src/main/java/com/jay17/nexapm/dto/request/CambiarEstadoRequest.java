package com.jay17.nexapm.dto.request;

import com.jay17.nexapm.model.EstadoProyecto;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para cambiar solo el estado de un Proyecto.
 */
public record CambiarEstadoRequest(

    @NotNull(message = "El nuevo estado es obligatorio")
    EstadoProyecto estado
) {}
