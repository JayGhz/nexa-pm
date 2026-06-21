package com.jay17.nexapm.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO de entrada para el endpoint POST /auth/login.
 */
public record LoginRequest(

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Formato de correo inválido")
    String correo,

    @NotBlank(message = "La contraseña es obligatoria")
    String password
) {}
