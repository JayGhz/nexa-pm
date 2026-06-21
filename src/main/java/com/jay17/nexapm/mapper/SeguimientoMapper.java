package com.jay17.nexapm.mapper;

import com.jay17.nexapm.dto.response.SeguimientoResponse;
import com.jay17.nexapm.model.Seguimiento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * MapStruct mapper para {@link Seguimiento}.
 */
@Mapper(componentModel = "spring")
public interface SeguimientoMapper {

    @Mapping(target = "proyectoId",    source = "proyecto.id")
    @Mapping(target = "proyectoNombre", source = "proyecto.nombre")
    SeguimientoResponse toResponse(Seguimiento seguimiento);
}
