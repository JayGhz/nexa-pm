package com.jay17.nexapm.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

/**
 * Entidad Cliente — empresa u organización que contrata los servicios de la consultora.
 */
@Entity
@Table(name = "clientes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente extends BaseEntity {

    @Column(nullable = false)
    private String razonSocial;

    @Column(nullable = false)
    private String sector;

    private String contacto;

    private String correo;

    private String telefono;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Proyecto> proyectos;
}
