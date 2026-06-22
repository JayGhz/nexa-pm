package com.jay17.nexapm.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActividadDiariaDTO {
    private String fecha;
    private Map<String, Double> horasPorProyecto;
}
