package com.jay17.nexapm.repository;

import com.jay17.nexapm.model.EstadoProyecto;
import com.jay17.nexapm.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, UUID> {

    List<Proyecto> findByClienteId(UUID clienteId);

    List<Proyecto> findByEstado(EstadoProyecto estado);

    /**
     * Devuelve los proyectos asignados a un usuario (consultor) específico.
     */
    @Query("""
        SELECT DISTINCT p FROM Proyecto p
        JOIN p.asignaciones a
        WHERE a.usuario.id = :usuarioId
    """)
    List<Proyecto> findByUsuarioAsignado(@Param("usuarioId") UUID usuarioId);

    long countByEstado(EstadoProyecto estado);
}
