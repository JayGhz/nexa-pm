package com.jay17.nexapm.model;

/**
 * Roles disponibles en el sistema NexaPM.
 * <p>
 * La aplicación fue diseñada pensando en control de acceso por roles:
 * - ADMIN: acceso completo (proyectos, clientes, dashboard, asignaciones).
 * - CONSULTOR: acceso restringido a sus proyectos asignados y registro de avance.
 * </p>
 */
public enum Rol {
    ADMIN,
    CONSULTOR
}
