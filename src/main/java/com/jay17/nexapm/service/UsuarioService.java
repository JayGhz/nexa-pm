package com.jay17.nexapm.service;

import com.jay17.nexapm.dto.response.UsuarioResponse;
import com.jay17.nexapm.exception.ResourceNotFoundException;
import com.jay17.nexapm.mapper.UsuarioMapper;
import com.jay17.nexapm.model.Rol;
import com.jay17.nexapm.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Servicio de gestión de Usuarios (solo ADMIN).
 */
@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(usuarioMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obtenerPorId(UUID id) {
        return usuarioRepository.findById(id)
                .map(usuarioMapper::toResponse)
                .orElseThrow(() -> ResourceNotFoundException.of("Usuario", id));
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarConsultores() {
        return usuarioRepository.findAll().stream()
                .filter(u -> u.getRol() == Rol.CONSULTOR)
                .map(usuarioMapper::toResponse)
                .toList();
    }

    @Transactional
    public void activarDesactivar(UUID id, boolean activo) {
        var usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Usuario", id));
        usuario.setActivo(activo);
        usuarioRepository.save(usuario);
    }

    @Transactional
    public void eliminar(UUID id) {
        if (!usuarioRepository.existsById(id)) {
            throw ResourceNotFoundException.of("Usuario", id);
        }
        usuarioRepository.deleteById(id);
    }
}
