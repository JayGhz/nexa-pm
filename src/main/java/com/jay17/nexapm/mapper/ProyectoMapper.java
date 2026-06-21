package com.jay17.nexapm.mapper;

import com.jay17.nexapm.dto.response.ProyectoResponse;
import com.jay17.nexapm.model.Proyecto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * MapStruct mapper para {@link Proyecto}.
 */
@Mapper(componentModel = "spring")
public interface ProyectoMapper {

    @Mapping(target = "estado", expression = "java(proyecto.getEstado().name())")
    @Mapping(target = "clienteId", source = "cliente.id")
    @Mapping(target = "clienteNombre", source = "cliente.razonSocial")
    @Mapping(target = "clienteSector", source = "cliente.sector")
    @Mapping(target = "totalConsultores",
             expression = "java(proyecto.getAsignaciones() != null ? proyecto.getAsignaciones().size() : 0)")
    @Mapping(target = "ultimoAvance", ignore = true)
    ProyectoResponse toResponse(Proyecto proyecto);
}
