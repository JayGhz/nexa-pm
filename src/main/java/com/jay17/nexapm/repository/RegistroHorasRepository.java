package com.jay17.nexapm.repository;

import com.jay17.nexapm.model.RegistroHoras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RegistroHorasRepository extends JpaRepository<RegistroHoras, Long> {
    
    @Query("SELECT r FROM RegistroHoras r JOIN FETCH r.proyecto WHERE r.fecha >= :fechaInicio ORDER BY r.fecha ASC")
    List<RegistroHoras> findByFechaGreaterThanEqualWithProyecto(@Param("fechaInicio") LocalDate fechaInicio);

    List<RegistroHoras> findByProyectoIdOrderByFechaDesc(java.util.UUID proyectoId);
}
