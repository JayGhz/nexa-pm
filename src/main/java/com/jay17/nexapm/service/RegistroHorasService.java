package com.jay17.nexapm.service;

import com.jay17.nexapm.dto.request.RegistroHorasRequest;
import com.jay17.nexapm.dto.response.RegistroHorasResponse;
import com.jay17.nexapm.exception.ResourceNotFoundException;
import com.jay17.nexapm.mapper.RegistroHorasMapper;
import com.jay17.nexapm.model.Proyecto;
import com.jay17.nexapm.model.RegistroHoras;
import com.jay17.nexapm.model.Rol;
import com.jay17.nexapm.model.Usuario;
import com.jay17.nexapm.repository.AsignacionRepository;
import com.jay17.nexapm.repository.ProyectoRepository;
import com.jay17.nexapm.repository.RegistroHorasRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RegistroHorasService {

    private final RegistroHorasRepository registroHorasRepository;
    private final ProyectoRepository proyectoRepository;
    private final AsignacionRepository asignacionRepository;
    private final RegistroHorasMapper registroHorasMapper;

    @Transactional
    public RegistroHorasResponse registrar(RegistroHorasRequest request) {
        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Proyecto proyecto = proyectoRepository.findById(request.getProyectoId())
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));

        // Validar si es ADMIN o si es un CONSULTOR asignado a este proyecto
        if (usuario.getRol() == Rol.CONSULTOR) {
            boolean asignado = asignacionRepository.existsByProyectoIdAndUsuarioId(proyecto.getId(), usuario.getId());
            if (!asignado) {
                throw new AccessDeniedException("No está asignado a este proyecto para registrar horas.");
            }
        }

        RegistroHoras registro = registroHorasMapper.toEntity(request);
        registro.setProyecto(proyecto);
        registro.setConsultor(usuario); // Siempre lo registra a su propio nombre

        RegistroHoras guardado = registroHorasRepository.save(registro);

        return registroHorasMapper.toResponse(guardado);
    }

    @Transactional(readOnly = true)
    public List<RegistroHorasResponse> listarPorProyecto(UUID proyectoId) {
        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (usuario.getRol() == Rol.CONSULTOR) {
            boolean asignado = asignacionRepository.existsByProyectoIdAndUsuarioId(proyectoId, usuario.getId());
            if (!asignado) {
                throw new AccessDeniedException("No puede ver las horas de un proyecto al que no está asignado.");
            }
        }

        return registroHorasRepository.findByProyectoIdOrderByFechaDesc(proyectoId)
                .stream()
                .map(registroHorasMapper::toResponse)
                .collect(Collectors.toList());
    }
}
