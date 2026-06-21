package com.jay17.nexapm.util;

/**
 * Constantes globales de la aplicación NexaPM.
 */
public final class ConstantesApp {

    private ConstantesApp() {}

    // Roles
    public static final String ROL_ADMIN     = "ROLE_ADMIN";
    public static final String ROL_CONSULTOR = "ROLE_CONSULTOR";

    // JWT
    public static final String BEARER_PREFIX  = "Bearer ";
    public static final String AUTH_HEADER    = "Authorization";

    // Estados de proyectos
    public static final String ESTADO_PLANEADO    = "PLANEADO";
    public static final String ESTADO_EN_EJECUCION = "EN_EJECUCION";
    public static final String ESTADO_PAUSADO     = "PAUSADO";
    public static final String ESTADO_FINALIZADO  = "FINALIZADO";

    // Mensajes de error comunes
    public static final String MSG_NO_ENCONTRADO  = "Recurso no encontrado";
    public static final String MSG_ACCESO_DENEGADO = "Acceso denegado";
}
