package com.jay17.nexapm.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO de entrada para crear o actualizar un Cliente.
 */
public record ClienteRequest(

    @NotBlank(message = "La razón social es obligatoria")
    String razonSocial,

    @NotBlank(message = "El sector es obligatorio")
    String sector,

    String contacto,

    @Email(message = "Formato de correo inválido")
    String correo,

    String telefono
) {}
