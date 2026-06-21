package com.jay17.nexapm.mapper;

import com.jay17.nexapm.dto.response.UsuarioResponse;
import com.jay17.nexapm.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * MapStruct mapper para conversión entre {@link Usuario} y sus DTOs.
 */
@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    @Mapping(target = "rol", expression = "java(usuario.getRol().name())")
    UsuarioResponse toResponse(Usuario usuario);
}
