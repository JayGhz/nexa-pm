package com.jay17.nexapm.dto.response;

import java.util.UUID;

/**
 * Respuesta de autenticación — devuelta en login y registro.
 */
public record AuthResponse(
    String accessToken,
    String refreshToken,
    String tokenType,
    long expiresIn,
    UUID id,
    String nombre,
    String correo,
    String rol
) {
    public static AuthResponse of(String accessToken, String refreshToken,
                                   long expiresIn, com.jay17.nexapm.model.Usuario usuario) {
        return new AuthResponse(
            accessToken, refreshToken, "Bearer", expiresIn,
            usuario.getId(), usuario.getNombre(), usuario.getCorreo(), usuario.getRol().name()
        );
    }
}
