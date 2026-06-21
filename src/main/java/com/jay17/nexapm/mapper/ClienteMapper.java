package com.jay17.nexapm.mapper;

import com.jay17.nexapm.dto.response.ClienteResponse;
import com.jay17.nexapm.model.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * MapStruct mapper para {@link Cliente}.
 */
@Mapper(componentModel = "spring")
public interface ClienteMapper {

    @Mapping(target = "totalProyectos",
             expression = "java(cliente.getProyectos() != null ? cliente.getProyectos().size() : 0)")
    ClienteResponse toResponse(Cliente cliente);
}
