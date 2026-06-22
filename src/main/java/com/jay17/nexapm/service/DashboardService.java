package com.jay17.nexapm.service;

import com.jay17.nexapm.dto.response.DashboardResponse;
import com.jay17.nexapm.model.EstadoProyecto;
import com.jay17.nexapm.model.Rol;
import com.jay17.nexapm.repository.AsignacionRepository;
import com.jay17.nexapm.repository.ClienteRepository;
import com.jay17.nexapm.repository.ProyectoRepository;
import com.jay17.nexapm.repository.SeguimientoRepository;
import com.jay17.nexapm.repository.RegistroHorasRepository;
import com.jay17.nexapm.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Servicio del Dashboard — agrega KPIs del sistema para el ADMIN.
 */
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProyectoRepository proyectoRepository;
    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final AsignacionRepository asignacionRepository;
    private final SeguimientoRepository seguimientoRepository;
    private final RegistroHorasRepository registroHorasRepository;

    @Transactional(readOnly = true)
    public DashboardResponse obtenerResumen(com.jay17.nexapm.model.Usuario usuario) {
        boolean isAdmin = usuario.getRol() == Rol.ADMIN;

        long totalProyectos;
        long totalClientes;
        long totalConsultores;
        long totalAsignaciones;
        Map<String, Long> proyectosPorEstado = new LinkedHashMap<>();
        Double avancePromedio;
        List<DashboardResponse.ProyectoResumen> proyectosRecientes;
        List<com.jay17.nexapm.dto.response.ActividadDiariaDTO> historialActividad = List.of();

        if (isAdmin) {
            // Lógica Global para Administradores
            totalProyectos = proyectoRepository.count();
            totalClientes = clienteRepository.count();
            totalConsultores = usuarioRepository.findAll().stream()
                    .filter(u -> u.getRol() == Rol.CONSULTOR)
                    .count();
            totalAsignaciones = asignacionRepository.count();

            for (EstadoProyecto estado : EstadoProyecto.values()) {
                proyectosPorEstado.put(estado.name(), proyectoRepository.countByEstado(estado));
            }

            avancePromedio = seguimientoRepository.calcularAvancePromedio();

            proyectosRecientes = proyectoRepository
                    .findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdAt")))
                    .getContent()
                    .stream()
                    .map(this::mapToProyectoResumen)
                    .toList();

            java.time.LocalDate hace90Dias = java.time.LocalDate.now().minusDays(90);
            List<com.jay17.nexapm.model.RegistroHoras> registros = registroHorasRepository.findByFechaGreaterThanEqualWithProyecto(hace90Dias);
            historialActividad = mapHistorialActividad(registros);

        } else {
            // Lógica Específica para Consultores
            List<com.jay17.nexapm.model.Proyecto> misProyectos = proyectoRepository.findByUsuarioAsignado(usuario.getId());
            
            totalProyectos = misProyectos.size();
            totalClientes = misProyectos.stream().map(p -> p.getCliente().getId()).distinct().count();
            totalConsultores = 0; // No aplica
            totalAsignaciones = misProyectos.size(); // Una asignación por proyecto que tiene

            for (EstadoProyecto estado : EstadoProyecto.values()) {
                long count = misProyectos.stream().filter(p -> p.getEstado() == estado).count();
                if (count > 0 || true) { // Inicializamos todos en 0 si no hay
                    proyectosPorEstado.put(estado.name(), count);
                }
            }

            // Calcular avance promedio de mis proyectos
            if (misProyectos.isEmpty()) {
                avancePromedio = 0.0;
            } else {
                double sumaAvances = 0;
                int countProyectosConAvance = 0;
                for (com.jay17.nexapm.model.Proyecto p : misProyectos) {
                    Integer ultimoAvance = seguimientoRepository.findUltimoAvance(p.getId()).map(s -> s.getAvance()).orElse(null);
                    if (ultimoAvance != null) {
                        sumaAvances += ultimoAvance;
                        countProyectosConAvance++;
                    }
                }
                avancePromedio = countProyectosConAvance > 0 ? sumaAvances / countProyectosConAvance : 0.0;
            }

            // Proyectos recientes (ordenados en memoria)
            proyectosRecientes = misProyectos.stream()
                    .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                    .limit(5)
                    .map(this::mapToProyectoResumen)
                    .toList();

            // Historial de actividad (solo horas de mis proyectos o mías)
            // Para simplificar, mostramos horas de sus proyectos (como son suyos)
            java.time.LocalDate hace90Dias = java.time.LocalDate.now().minusDays(90);
            List<com.jay17.nexapm.model.RegistroHoras> registros = registroHorasRepository.findByFechaGreaterThanEqualWithProyecto(hace90Dias)
                .stream()
                .filter(r -> r.getConsultor().getId().equals(usuario.getId()))
                .collect(Collectors.toList());
            historialActividad = mapHistorialActividad(registros);
        }

        return new DashboardResponse(
                totalProyectos, totalClientes, totalConsultores, totalAsignaciones,
                proyectosPorEstado, avancePromedio, proyectosRecientes, historialActividad
        );
    }

    private DashboardResponse.ProyectoResumen mapToProyectoResumen(com.jay17.nexapm.model.Proyecto p) {
        Integer ultimoAvance = seguimientoRepository
                .findUltimoAvance(p.getId())
                .map(s -> s.getAvance())
                .orElse(null);
                
        List<DashboardResponse.AvanceHistorico> historial = seguimientoRepository
                .findByProyectoIdOrderByFechaDesc(p.getId())
                .stream()
                .map(s -> new DashboardResponse.AvanceHistorico(
                        s.getFecha(), 
                        s.getAvance()
                ))
                .collect(Collectors.toList());
        java.util.Collections.reverse(historial);

        return new DashboardResponse.ProyectoResumen(
                p.getId(),
                p.getNombre(),
                p.getEstado().name(),
                p.getCliente() != null ? p.getCliente().getRazonSocial() : "N/A",
                ultimoAvance,
                historial
        );
    }

    private List<com.jay17.nexapm.dto.response.ActividadDiariaDTO> mapHistorialActividad(List<com.jay17.nexapm.model.RegistroHoras> registros) {
        Map<String, Map<String, Double>> agrupadoPorFecha = new LinkedHashMap<>();
        for (com.jay17.nexapm.model.RegistroHoras r : registros) {
            String fechaStr = r.getFecha().toString();
            String nombreProyecto = r.getProyecto().getNombre();
            agrupadoPorFecha.putIfAbsent(fechaStr, new LinkedHashMap<>());
            Map<String, Double> horasProyecto = agrupadoPorFecha.get(fechaStr);
            horasProyecto.put(nombreProyecto, horasProyecto.getOrDefault(nombreProyecto, 0.0) + r.getHorasTrabajadas());
        }
        return agrupadoPorFecha.entrySet().stream()
                .map(e -> new com.jay17.nexapm.dto.response.ActividadDiariaDTO(e.getKey(), e.getValue()))
                .collect(Collectors.toList());
    }
}
