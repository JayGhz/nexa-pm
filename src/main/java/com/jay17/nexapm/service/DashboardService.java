package com.jay17.nexapm.service;

import com.jay17.nexapm.dto.response.DashboardResponse;
import com.jay17.nexapm.model.EstadoProyecto;
import com.jay17.nexapm.model.Rol;
import com.jay17.nexapm.repository.AsignacionRepository;
import com.jay17.nexapm.repository.ClienteRepository;
import com.jay17.nexapm.repository.ProyectoRepository;
import com.jay17.nexapm.repository.SeguimientoRepository;
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

    @Transactional(readOnly = true)
    public DashboardResponse obtenerResumen() {
        // Totales globales
        long totalProyectos = proyectoRepository.count();
        long totalClientes = clienteRepository.count();
        long totalConsultores = usuarioRepository.findAll().stream()
                .filter(u -> u.getRol() == Rol.CONSULTOR)
                .count();
        long totalAsignaciones = asignacionRepository.count();

        // Proyectos por estado (mapa ordenado)
        Map<String, Long> proyectosPorEstado = Arrays.stream(EstadoProyecto.values())
                .collect(Collectors.toMap(
                        EstadoProyecto::name,
                        proyectoRepository::countByEstado,
                        (a, b) -> a,
                        LinkedHashMap::new
                ));

        // Avance promedio
        Double avancePromedio = seguimientoRepository.calcularAvancePromedio();

        // 5 proyectos más recientes con su último avance
        List<DashboardResponse.ProyectoResumen> proyectosRecientes = proyectoRepository
                .findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdAt")))
                .getContent()
                .stream()
                .map(p -> {
                    Integer ultimoAvance = seguimientoRepository
                            .findUltimoAvance(p.getId())
                            .map(s -> s.getAvance())
                            .orElse(null);
                    return new DashboardResponse.ProyectoResumen(
                            p.getId(),
                            p.getNombre(),
                            p.getEstado().name(),
                            p.getCliente() != null ? p.getCliente().getRazonSocial() : "N/A",
                            ultimoAvance
                    );
                })
                .toList();

        return new DashboardResponse(
                totalProyectos, totalClientes, totalConsultores, totalAsignaciones,
                proyectosPorEstado, avancePromedio, proyectosRecientes
        );
    }
}
