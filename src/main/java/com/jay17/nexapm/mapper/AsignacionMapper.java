package com.jay17.nexapm.mapper;

import com.jay17.nexapm.dto.response.AsignacionResponse;
import com.jay17.nexapm.model.Asignacion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * MapStruct mapper para {@link Asignacion}.
 */
@Mapper(componentModel = "spring")
public interface AsignacionMapper {

    @Mapping(target = "proyectoId",    source = "proyecto.id")
    @Mapping(target = "proyectoNombre", source = "proyecto.nombre")
    @Mapping(target = "usuarioId",     source = "usuario.id")
    @Mapping(target = "usuarioNombre", source = "usuario.nombre")
    @Mapping(target = "usuarioCorreo", source = "usuario.correo")
    AsignacionResponse toResponse(Asignacion asignacion);
}
