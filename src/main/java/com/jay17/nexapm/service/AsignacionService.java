package com.jay17.nexapm.service;

import com.jay17.nexapm.dto.request.AsignacionRequest;
import com.jay17.nexapm.dto.response.AsignacionResponse;
import com.jay17.nexapm.exception.BusinessException;
import com.jay17.nexapm.exception.ResourceNotFoundException;
import com.jay17.nexapm.mapper.AsignacionMapper;
import com.jay17.nexapm.model.Asignacion;
import com.jay17.nexapm.model.Rol;
import com.jay17.nexapm.repository.AsignacionRepository;
import com.jay17.nexapm.repository.ProyectoRepository;
import com.jay17.nexapm.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 * Servicio de gestión de Asignaciones.
 */
@Service
@RequiredArgsConstructor
public class AsignacionService {

    private final AsignacionRepository asignacionRepository;
    private final ProyectoRepository proyectoRepository;
    private final UsuarioRepository usuarioRepository;
    private final AsignacionMapper asignacionMapper;

    @Transactional
    public AsignacionResponse asignar(AsignacionRequest request) {
        var proyecto = proyectoRepository.findById(request.proyectoId())
                .orElseThrow(() -> ResourceNotFoundException.of("Proyecto", request.proyectoId()));

        var usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> ResourceNotFoundException.of("Usuario", request.usuarioId()));

        if (usuario.getRol() != Rol.CONSULTOR) {
            throw new BusinessException("Solo se pueden asignar usuarios con rol CONSULTOR a proyectos");
        }

        if (asignacionRepository.existsByProyectoIdAndUsuarioId(request.proyectoId(), request.usuarioId())) {
            throw new BusinessException("El consultor ya está asignado a este proyecto");
        }

        Asignacion asignacion = Asignacion.builder()
                .proyecto(proyecto)
                .usuario(usuario)
                .horasAsignadas(request.horasAsignadas())
                .fechaAsignacion(request.fechaAsignacion() != null ? request.fechaAsignacion() : LocalDate.now())
                .build();

        return asignacionMapper.toResponse(asignacionRepository.save(asignacion));
    }

    @Transactional(readOnly = true)
    public List<AsignacionResponse> listarTodas() {
        return asignacionRepository.findAll()
                .stream()
                .map(asignacionMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AsignacionResponse> listarPorProyecto(UUID proyectoId) {
        if (!proyectoRepository.existsById(proyectoId)) {
            throw ResourceNotFoundException.of("Proyecto", proyectoId);
        }
        return asignacionRepository.findByProyectoId(proyectoId)
                .stream()
                .map(asignacionMapper::toResponse)
                .toList();
    }

    @Transactional
    public void desasignar(UUID id) {
        if (!asignacionRepository.existsById(id)) {
            throw ResourceNotFoundException.of("Asignacion", id);
        }
        asignacionRepository.deleteById(id);
    }
}
