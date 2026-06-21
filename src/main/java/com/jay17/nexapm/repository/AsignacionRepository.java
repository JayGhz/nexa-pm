package com.jay17.nexapm.repository;

import com.jay17.nexapm.model.Asignacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AsignacionRepository extends JpaRepository<Asignacion, UUID> {

    List<Asignacion> findByProyectoId(UUID proyectoId);

    List<Asignacion> findByUsuarioId(UUID usuarioId);

    Optional<Asignacion> findByProyectoIdAndUsuarioId(UUID proyectoId, UUID usuarioId);

    boolean existsByProyectoIdAndUsuarioId(UUID proyectoId, UUID usuarioId);

    long countByProyectoId(UUID proyectoId);
}
