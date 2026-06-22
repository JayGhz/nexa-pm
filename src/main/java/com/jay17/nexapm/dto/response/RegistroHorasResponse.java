package com.jay17.nexapm.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;

@Data
public class RegistroHorasResponse {
    private Long id;
    private UUID proyectoId;
    private String proyectoNombre;
    private UUID consultorId;
    private String consultorNombre;
    private LocalDate fecha;
    private Double horasTrabajadas;
    private String descripcion;
    private LocalDateTime fechaCreacion;
}
