-- ── USUARIOS ──────────────────────────────────────────────────

INSERT INTO usuarios (id, nombre, correo, password, rol, activo, created_at, updated_at)
VALUES ('00000001-0000-0000-0000-000000000001',
        'Administrador NexaPM', 'admin@nexapm.com',
        '$2a$10$WsYJ/kL5zuKt5ogLtq8BkOTUugUEMcaY1TyR2kAmy1LvqTHk/nuIG',
        'ADMIN', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO usuarios (id, nombre, correo, password, rol, activo, created_at, updated_at)
VALUES ('00000002-0000-0000-0000-000000000002',
        'Ana García Torres', 'ana.garcia@nexapm.com',
        '$2a$10$Oo/kmwP4RIfVgmp7UL9tfejVkwtjgO85EbBZlLAKp3wTFa5gOQ1he',
        'CONSULTOR', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO usuarios (id, nombre, correo, password, rol, activo, created_at, updated_at)
VALUES ('00000003-0000-0000-0000-000000000003',
        'Carlos Méndez Rivera', 'carlos.mendez@nexapm.com',
        '$2a$10$Oo/kmwP4RIfVgmp7UL9tfejVkwtjgO85EbBZlLAKp3wTFa5gOQ1he',
        'CONSULTOR', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ── CLIENTES ──────────────────────────────────────────────────

INSERT INTO clientes (id, razon_social, sector, contacto, correo, telefono, created_at, updated_at)
VALUES ('00000004-0000-0000-0000-000000000004',
        'Banco Continental', 'Financiero', 'Roberto Salinas',
        'r.salinas@bancocontinental.pe', '+51 1 611-9000', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO clientes (id, razon_social, sector, contacto, correo, telefono, created_at, updated_at)
VALUES ('00000005-0000-0000-0000-000000000005',
        'Retail Perú S.A.C.', 'Retail', 'Lucía Ventura',
        'l.ventura@retailperu.com', '+51 1 700-4500', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO clientes (id, razon_social, sector, contacto, correo, telefono, created_at, updated_at)
VALUES ('00000006-0000-0000-0000-000000000006',
        'Clínica San Gabriel', 'Salud', 'Dr. Miguel Ángel Torres',
        'm.torres@csangabriel.pe', '+51 1 703-3000', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ── PROYECTOS ─────────────────────────────────────────────────

INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at)
VALUES ('00000007-0000-0000-0000-000000000007',
        'Modernización Core Bancario',
        'Migración del sistema core bancario legacy (COBOL) a microservicios sobre Spring Boot + Kubernetes + PostgreSQL. Incluye migración de 15 años de datos históricos.',
        'EN_EJECUCION', 850000.00, '2026-01-15', '2026-12-31',
        '00000004-0000-0000-0000-000000000004', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at)
VALUES ('00000008-0000-0000-0000-000000000008',
        'Plataforma E-Commerce Omnicanal',
        'Desarrollo de plataforma e-commerce con integración a tiendas físicas, gestión de inventario en tiempo real y pasarela de pagos multi-divisa.',
        'PLANEADO', 320000.00, '2026-07-01', '2027-03-31',
        '00000005-0000-0000-0000-000000000005', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at)
VALUES ('00000009-0000-0000-0000-000000000009',
        'Sistema de Información Hospitalaria (HIS)',
        'Implementación de HIS para gestión de historiales médicos electrónicos, agendamiento de citas y facturación integrada con SIS/EPS.',
        'FINALIZADO', 195000.00, '2025-03-01', '2025-11-30',
        '00000006-0000-0000-0000-000000000006', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ── ASIGNACIONES ──────────────────────────────────────────────

-- Ana → Core Bancario
INSERT INTO asignaciones (id, proyecto_id, usuario_id, horas_asignadas, fecha_asignacion, created_at, updated_at)
VALUES ('0000000a-0000-0000-0000-00000000000a',
        '00000007-0000-0000-0000-000000000007',
        '00000002-0000-0000-0000-000000000002',
        160, '2026-01-15', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Carlos → Core Bancario
INSERT INTO asignaciones (id, proyecto_id, usuario_id, horas_asignadas, fecha_asignacion, created_at, updated_at)
VALUES ('0000000b-0000-0000-0000-00000000000b',
        '00000007-0000-0000-0000-000000000007',
        '00000003-0000-0000-0000-000000000003',
        120, '2026-01-15', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Carlos → E-Commerce
INSERT INTO asignaciones (id, proyecto_id, usuario_id, horas_asignadas, fecha_asignacion, created_at, updated_at)
VALUES ('0000000c-0000-0000-0000-00000000000c',
        '00000008-0000-0000-0000-000000000008',
        '00000003-0000-0000-0000-000000000003',
        200, '2026-06-20', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Ana → HIS
INSERT INTO asignaciones (id, proyecto_id, usuario_id, horas_asignadas, fecha_asignacion, created_at, updated_at)
VALUES ('0000000d-0000-0000-0000-00000000000d',
        '00000009-0000-0000-0000-000000000009',
        '00000002-0000-0000-0000-000000000002',
        180, '2025-03-01', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ── SEGUIMIENTO — Core Bancario (en ejecución) ────────────────

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000011-0000-0000-0000-000000000011',
        '00000007-0000-0000-0000-000000000007',
        '2026-01-31', 5,
        'Kick-off del proyecto. Levantamiento de requerimientos completado. Arquitectura aprobada.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000012-0000-0000-0000-000000000012',
        '00000007-0000-0000-0000-000000000007',
        '2026-02-28', 12,
        'Análisis de la base de datos legacy finalizado. Diseño del nuevo esquema en progreso.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000013-0000-0000-0000-000000000013',
        '00000007-0000-0000-0000-000000000007',
        '2026-03-31', 22,
        'Módulo de autenticación completado. Inicio de migración de tablas maestras.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000014-0000-0000-0000-000000000014',
        '00000007-0000-0000-0000-000000000007',
        '2026-04-30', 35,
        'Migración de base de datos completada al 60%. APIs de cuentas corrientes en QA.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000015-0000-0000-0000-000000000015',
        '00000007-0000-0000-0000-000000000007',
        '2026-05-31', 48,
        'Módulo de transacciones en producción (sandbox). Pruebas de carga superadas.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000016-0000-0000-0000-000000000016',
        '00000007-0000-0000-0000-000000000007',
        '2026-06-15', 55,
        'Integración con SWIFT completada. Inicio de migración histórica de transacciones.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ── SEGUIMIENTO — HIS (finalizado) ────────────────────────────

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000021-0000-0000-0000-000000000021',
        '00000009-0000-0000-0000-000000000009',
        '2025-03-31', 10,
        'Instalación de infraestructura. Configuración de servidores en data center hospitalario.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000022-0000-0000-0000-000000000022',
        '00000009-0000-0000-0000-000000000009',
        '2025-05-31', 35,
        'Módulos de admisión y citas operativos. Capacitación del personal de recepción.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000023-0000-0000-0000-000000000023',
        '00000009-0000-0000-0000-000000000009',
        '2025-08-31', 70,
        'Historiales médicos electrónicos en producción. Integración con laboratorio completada.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at)
VALUES ('00000024-0000-0000-0000-000000000024',
        '00000009-0000-0000-0000-000000000009',
        '2025-11-30', 100,
        'Sistema 100% operativo. Entregables firmados. SLA de 99.9% uptime en primer mes.',
        NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
