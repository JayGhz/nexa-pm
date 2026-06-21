package com.jay17.nexapm.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Respuesta de Cliente.
 */
public record ClienteResponse(
    UUID id,
    String razonSocial,
    String sector,
    String contacto,
    String correo,
    String telefono,
    int totalProyectos,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
