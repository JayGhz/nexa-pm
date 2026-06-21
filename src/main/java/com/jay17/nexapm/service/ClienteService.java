package com.jay17.nexapm.service;

import com.jay17.nexapm.dto.request.ClienteRequest;
import com.jay17.nexapm.dto.response.ClienteResponse;
import com.jay17.nexapm.exception.BusinessException;
import com.jay17.nexapm.exception.ResourceNotFoundException;
import com.jay17.nexapm.mapper.ClienteMapper;
import com.jay17.nexapm.model.Cliente;
import com.jay17.nexapm.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Servicio de gestión de Clientes.
 */
@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;

    @Transactional
    public ClienteResponse crear(ClienteRequest request) {
        if (clienteRepository.existsByRazonSocialIgnoreCase(request.razonSocial())) {
            throw new BusinessException("Ya existe un cliente con la razón social: " + request.razonSocial());
        }
        Cliente cliente = Cliente.builder()
                .razonSocial(request.razonSocial())
                .sector(request.sector())
                .contacto(request.contacto())
                .correo(request.correo())
                .telefono(request.telefono())
                .build();
        return clienteMapper.toResponse(clienteRepository.save(cliente));
    }

    @Transactional(readOnly = true)
    public List<ClienteResponse> listarTodos() {
        return clienteRepository.findAll()
                .stream()
                .map(clienteMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ClienteResponse obtenerPorId(UUID id) {
        return clienteRepository.findById(id)
                .map(clienteMapper::toResponse)
                .orElseThrow(() -> ResourceNotFoundException.of("Cliente", id));
    }

    @Transactional
    public ClienteResponse actualizar(UUID id, ClienteRequest request) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Cliente", id));
        cliente.setRazonSocial(request.razonSocial());
        cliente.setSector(request.sector());
        cliente.setContacto(request.contacto());
        cliente.setCorreo(request.correo());
        cliente.setTelefono(request.telefono());
        return clienteMapper.toResponse(clienteRepository.save(cliente));
    }

    @Transactional
    public void eliminar(UUID id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Cliente", id));
        if (cliente.getProyectos() != null && !cliente.getProyectos().isEmpty()) {
            throw new BusinessException("No se puede eliminar el cliente porque tiene proyectos asociados");
        }
        clienteRepository.deleteById(id);
    }
}
