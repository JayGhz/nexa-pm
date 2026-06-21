package com.jay17.nexapm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDate;

/**
 * Entidad Seguimiento — registro de avance porcentual de un Proyecto en una fecha dada.
 * El campo {@code avance} es un entero de 0 a 100 (porcentaje).
 */
@Entity
@Table(name = "seguimientos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seguimiento extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proyecto_id", nullable = false)
    private Proyecto proyecto;

    @Column(nullable = false)
    private LocalDate fecha;

    @Min(0)
    @Max(100)
    @Column(nullable = false)
    private Integer avance;

    @Column(columnDefinition = "TEXT")
    private String comentario;
}
