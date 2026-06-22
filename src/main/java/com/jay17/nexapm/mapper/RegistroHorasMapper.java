package com.jay17.nexapm.mapper;

import com.jay17.nexapm.dto.request.RegistroHorasRequest;
import com.jay17.nexapm.dto.response.RegistroHorasResponse;
import com.jay17.nexapm.model.RegistroHoras;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RegistroHorasMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "proyecto", ignore = true)
    @Mapping(target = "consultor", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    RegistroHoras toEntity(RegistroHorasRequest request);

    @Mapping(source = "proyecto.id", target = "proyectoId")
    @Mapping(source = "proyecto.nombre", target = "proyectoNombre")
    @Mapping(source = "consultor.id", target = "consultorId")
    @Mapping(source = "consultor.nombre", target = "consultorNombre")
    RegistroHorasResponse toResponse(RegistroHoras entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "proyecto", ignore = true)
    @Mapping(target = "consultor", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    void updateEntity(RegistroHorasRequest request, @MappingTarget RegistroHoras entity);
}
