package com.jay17.nexapm.dto.request;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO para actualizar los datos básicos de un usuario (e.g. su nombre).
 */
public record UsuarioUpdateRequest(
    @NotBlank(message = "El nombre es obligatorio")
    String nombre
) {}
