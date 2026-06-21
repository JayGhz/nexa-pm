package com.jay17.nexapm.service;

import com.jay17.nexapm.dto.request.ProyectoRequest;
import com.jay17.nexapm.dto.response.ProyectoResponse;
import com.jay17.nexapm.exception.BusinessException;
import com.jay17.nexapm.exception.ResourceNotFoundException;
import com.jay17.nexapm.mapper.ProyectoMapper;
import com.jay17.nexapm.model.EstadoProyecto;
import com.jay17.nexapm.model.Proyecto;
import com.jay17.nexapm.repository.ClienteRepository;
import com.jay17.nexapm.repository.ProyectoRepository;
import com.jay17.nexapm.repository.SeguimientoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Servicio de gestión de Proyectos.
 */
@Service
@RequiredArgsConstructor
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final ClienteRepository clienteRepository;
    private final SeguimientoRepository seguimientoRepository;
    private final ProyectoMapper proyectoMapper;

    @Transactional
    public ProyectoResponse crear(ProyectoRequest request) {
        validarFechas(request);
        var cliente = clienteRepository.findById(request.clienteId())
                .orElseThrow(() -> ResourceNotFoundException.of("Cliente", request.clienteId()));

        Proyecto proyecto = Proyecto.builder()
                .nombre(request.nombre())
                .descripcion(request.descripcion())
                .estado(request.estado())
                .presupuesto(request.presupuesto())
                .fechaInicio(request.fechaInicio())
                .fechaFin(request.fechaFin())
                .cliente(cliente)
                .build();
        return enrichWithAvance(proyectoMapper.toResponse(proyectoRepository.save(proyecto)));
    }

    @Transactional(readOnly = true)
    public List<ProyectoResponse> listarTodos() {
        return proyectoRepository.findAll()
                .stream()
                .map(proyectoMapper::toResponse)
                .map(this::enrichWithAvance)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProyectoResponse> listarPorUsuario(UUID usuarioId) {
        return proyectoRepository.findByUsuarioAsignado(usuarioId)
                .stream()
                .map(proyectoMapper::toResponse)
                .map(this::enrichWithAvance)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProyectoResponse obtenerPorId(UUID id) {
        return proyectoRepository.findById(id)
                .map(proyectoMapper::toResponse)
                .map(this::enrichWithAvance)
                .orElseThrow(() -> ResourceNotFoundException.of("Proyecto", id));
    }

    @Transactional
    public ProyectoResponse actualizar(UUID id, ProyectoRequest request) {
        validarFechas(request);
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Proyecto", id));
        var cliente = clienteRepository.findById(request.clienteId())
                .orElseThrow(() -> ResourceNotFoundException.of("Cliente", request.clienteId()));

        proyecto.setNombre(request.nombre());
        proyecto.setDescripcion(request.descripcion());
        proyecto.setEstado(request.estado());
        proyecto.setPresupuesto(request.presupuesto());
        proyecto.setFechaInicio(request.fechaInicio());
        proyecto.setFechaFin(request.fechaFin());
        proyecto.setCliente(cliente);

        return enrichWithAvance(proyectoMapper.toResponse(proyectoRepository.save(proyecto)));
    }

    @Transactional
    public ProyectoResponse cambiarEstado(UUID id, EstadoProyecto nuevoEstado) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Proyecto", id));
        proyecto.setEstado(nuevoEstado);
        return enrichWithAvance(proyectoMapper.toResponse(proyectoRepository.save(proyecto)));
    }

    @Transactional
    public void eliminar(UUID id) {
        if (!proyectoRepository.existsById(id)) {
            throw ResourceNotFoundException.of("Proyecto", id);
        }
        proyectoRepository.deleteById(id);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private void validarFechas(ProyectoRequest request) {
        if (request.fechaFin() != null && request.fechaFin().isBefore(request.fechaInicio())) {
            throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio");
        }
    }

    /**
     * Inyecta el último avance registrado en el ProyectoResponse.
     */
    private ProyectoResponse enrichWithAvance(ProyectoResponse response) {
        Integer ultimoAvance = seguimientoRepository
                .findUltimoAvance(response.id())
                .map(s -> s.getAvance())
                .orElse(null);

        return new ProyectoResponse(
                response.id(), response.nombre(), response.descripcion(),
                response.estado(), response.presupuesto(),
                response.fechaInicio(), response.fechaFin(),
                response.clienteId(), response.clienteNombre(), response.clienteSector(),
                response.totalConsultores(), ultimoAvance,
                response.createdAt(), response.updatedAt()
        );
    }
}
