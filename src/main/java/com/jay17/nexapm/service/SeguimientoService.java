package com.jay17.nexapm.service;

import com.jay17.nexapm.dto.request.SeguimientoRequest;
import com.jay17.nexapm.dto.response.SeguimientoResponse;
import com.jay17.nexapm.exception.ResourceNotFoundException;
import com.jay17.nexapm.mapper.SeguimientoMapper;
import com.jay17.nexapm.model.Seguimiento;
import com.jay17.nexapm.repository.ProyectoRepository;
import com.jay17.nexapm.repository.SeguimientoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Servicio de gestión de Seguimiento (avance de proyectos).
 */
@Service
@RequiredArgsConstructor
public class SeguimientoService {

    private final SeguimientoRepository seguimientoRepository;
    private final ProyectoRepository proyectoRepository;
    private final SeguimientoMapper seguimientoMapper;

    @Transactional
    public SeguimientoResponse registrar(SeguimientoRequest request) {
        var proyecto = proyectoRepository.findById(request.proyectoId())
                .orElseThrow(() -> ResourceNotFoundException.of("Proyecto", request.proyectoId()));

        if (seguimientoRepository.existsByProyectoIdAndFechaAndAvanceAndComentario(
                request.proyectoId(), request.fecha(), request.avance(), request.comentario())) {
            throw new com.jay17.nexapm.exception.BusinessException("Este avance ya ha sido registrado previamente.");
        }

        Seguimiento seguimiento = Seguimiento.builder()
                .proyecto(proyecto)
                .fecha(request.fecha())
                .avance(request.avance())
                .comentario(request.comentario())
                .build();

        return seguimientoMapper.toResponse(seguimientoRepository.save(seguimiento));
    }

    @Transactional(readOnly = true)
    public List<SeguimientoResponse> listarPorProyecto(UUID proyectoId) {
        if (!proyectoRepository.existsById(proyectoId)) {
            throw ResourceNotFoundException.of("Proyecto", proyectoId);
        }
        return seguimientoRepository.findByProyectoIdOrderByFechaDesc(proyectoId)
                .stream()
                .map(seguimientoMapper::toResponse)
                .toList();
    }

    @Transactional
    public SeguimientoResponse actualizar(UUID id, SeguimientoRequest request) {
        Seguimiento seguimiento = seguimientoRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Seguimiento", id));

        var proyecto = proyectoRepository.findById(request.proyectoId())
                .orElseThrow(() -> ResourceNotFoundException.of("Proyecto", request.proyectoId()));

        seguimiento.setProyecto(proyecto);
        seguimiento.setFecha(request.fecha());
        seguimiento.setAvance(request.avance());
        seguimiento.setComentario(request.comentario());

        return seguimientoMapper.toResponse(seguimientoRepository.save(seguimiento));
    }

    @Transactional
    public void eliminar(UUID id) {
        if (!seguimientoRepository.existsById(id)) {
            throw ResourceNotFoundException.of("Seguimiento", id);
        }
        seguimientoRepository.deleteById(id);
    }
}
