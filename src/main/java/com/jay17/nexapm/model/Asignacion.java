package com.jay17.nexapm.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/**
 * Entidad Asignacion — relación entre un Proyecto y un Consultor (Usuario).
 * Registra cuántas horas tiene asignadas el consultor en ese proyecto.
 */
@Entity
@Table(
    name = "asignaciones",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"proyecto_id", "usuario_id"},
        name = "uk_asignacion_proyecto_usuario"
    )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asignacion extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proyecto_id", nullable = false)
    private Proyecto proyecto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Integer horasAsignadas;

    @Builder.Default
    private LocalDate fechaAsignacion = LocalDate.now();
}
