package com.jay17.nexapm.dto.request;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO de entrada para el endpoint POST /auth/refresh.
 */
public record RefreshTokenRequest(

    @NotBlank(message = "El refreshToken es obligatorio")
    String refreshToken
) {}
