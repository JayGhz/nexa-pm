package com.jay17.nexapm.repository;

import com.jay17.nexapm.model.Seguimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SeguimientoRepository extends JpaRepository<Seguimiento, UUID> {

    List<Seguimiento> findByProyectoIdOrderByFechaDesc(UUID proyectoId);

    /**
     * Obtiene el último avance registrado para un proyecto.
     */
    @Query("""
        SELECT s FROM Seguimiento s
        WHERE s.proyecto.id = :proyectoId
        ORDER BY s.fecha DESC
        LIMIT 1
    """)
    Optional<Seguimiento> findUltimoAvance(@Param("proyectoId") UUID proyectoId);

    /**
     * Calcula el avance promedio de todos los últimos registros por proyecto.
     */
    @Query("SELECT AVG(s.avance) FROM Seguimiento s")
    Double calcularAvancePromedio();
}
