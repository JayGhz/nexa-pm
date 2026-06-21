package com.jay17.nexapm.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Respuesta de Usuario para endpoints públicos (sin password).
 */
public record UsuarioResponse(
    UUID id,
    String nombre,
    String correo,
    String rol,
    boolean activo,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
