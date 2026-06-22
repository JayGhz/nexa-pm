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

-- ── 20 PROYECTOS ADICIONALES ──────────────────────────────────────────────

INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000025-0000-0000-0000-000000000025', 'Migración Cloud AWS', 'Migración de servidores on-premise a AWS.', 'EN_EJECUCION', 120000.00, '2026-02-01', '2026-08-30', '00000004-0000-0000-0000-000000000004', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000026-0000-0000-0000-000000000026', 'App Móvil iOS/Android', 'Aplicación móvil para clientes corporativos.', 'PLANEADO', 95000.00, '2026-09-01', '2027-02-28', '00000005-0000-0000-0000-000000000005', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000027-0000-0000-0000-000000000027', 'ERP Integración SAP', 'Integración de ERP existente con SAP HANA.', 'EN_EJECUCION', 450000.00, '2026-01-10', '2026-11-30', '00000006-0000-0000-0000-000000000006', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000028-0000-0000-0000-000000000028', 'Portal de Proveedores', 'Sistema web B2B para gestión de compras.', 'FINALIZADO', 65000.00, '2025-01-01', '2025-06-30', '00000004-0000-0000-0000-000000000004', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000029-0000-0000-0000-000000000029', 'Ciberseguridad y Pentesting', 'Auditoría de seguridad y parcheo de vulnerabilidades.', 'EN_EJECUCION', 35000.00, '2026-05-01', '2026-07-31', '00000005-0000-0000-0000-000000000005', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000030-0000-0000-0000-000000000030', 'Renovación de Infraestructura Red', 'Actualización de switches y routers Cisco.', 'PLANEADO', 210000.00, '2026-10-01', '2027-01-31', '00000006-0000-0000-0000-000000000006', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000031-0000-0000-0000-000000000031', 'Chatbot con IA', 'Implementación de asistente virtual con LLM.', 'EN_EJECUCION', 45000.00, '2026-03-15', '2026-08-15', '00000004-0000-0000-0000-000000000004', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000032-0000-0000-0000-000000000032', 'Data Warehouse', 'Creación de DWH centralizado con Snowflake.', 'PAUSADO', 280000.00, '2026-01-01', '2026-12-31', '00000005-0000-0000-0000-000000000005', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000033-0000-0000-0000-000000000033', 'Sistema de Turnos', 'Gestor de colas y turnos para atención en sucursales.', 'FINALIZADO', 40000.00, '2025-07-01', '2025-10-31', '00000006-0000-0000-0000-000000000006', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000034-0000-0000-0000-000000000034', 'Actualización de CRM', 'Migración de Salesforce a MS Dynamics.', 'EN_EJECUCION', 150000.00, '2026-04-01', '2026-10-31', '00000004-0000-0000-0000-000000000004', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000035-0000-0000-0000-000000000035', 'Intranet Corporativa', 'Nuevo portal del empleado en SharePoint.', 'PLANEADO', 55000.00, '2026-08-01', '2026-12-15', '00000005-0000-0000-0000-000000000005', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000036-0000-0000-0000-000000000036', 'Telemedicina App', 'Plataforma de videollamadas médicas.', 'EN_EJECUCION', 185000.00, '2026-02-15', '2026-09-30', '00000006-0000-0000-0000-000000000006', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000037-0000-0000-0000-000000000037', 'Automatización RPA', 'Robots de software para conciliación bancaria.', 'PAUSADO', 70000.00, '2026-03-01', '2026-06-30', '00000004-0000-0000-0000-000000000004', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000038-0000-0000-0000-000000000038', 'Sistema de Inventarios', 'Control de stock con lectores RFID.', 'FINALIZADO', 90000.00, '2025-02-01', '2025-08-31', '00000005-0000-0000-0000-000000000005', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000039-0000-0000-0000-000000000039', 'Analítica de Pacientes', 'Dashboard de BI con PowerBI.', 'EN_EJECUCION', 45000.00, '2026-05-15', '2026-08-30', '00000006-0000-0000-0000-000000000006', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000040-0000-0000-0000-000000000040', 'Banca Móvil 2.0', 'Rediseño completo UX/UI de la app bancaria.', 'PLANEADO', 300000.00, '2026-11-01', '2027-06-30', '00000004-0000-0000-0000-000000000004', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000041-0000-0000-0000-000000000041', 'Sistema POS', 'Puntos de venta sincronizados en la nube.', 'FINALIZADO', 120000.00, '2024-06-01', '2024-12-15', '00000005-0000-0000-0000-000000000005', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000042-0000-0000-0000-000000000042', 'Portal de Pacientes', 'Acceso a resultados de laboratorio online.', 'EN_EJECUCION', 85000.00, '2026-04-01', '2026-10-31', '00000006-0000-0000-0000-000000000006', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000043-0000-0000-0000-000000000043', 'Blockchain para Contratos', 'Smart contracts para proveedores del banco.', 'PLANEADO', 180000.00, '2027-01-01', '2027-08-31', '00000004-0000-0000-0000-000000000004', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO proyectos (id, nombre, descripcion, estado, presupuesto, fecha_inicio, fecha_fin, cliente_id, created_at, updated_at) VALUES ('00000044-0000-0000-0000-000000000044', 'App Fidelización', 'Sistema de puntos para clientes retail.', 'EN_EJECUCION', 95000.00, '2026-01-15', '2026-07-15', '00000005-0000-0000-0000-000000000005', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;

INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000045-0000-0000-0000-000000000045', '00000034-0000-0000-0000-000000000034', NOW(), 15, 'Levantamiento de requisitos CRM.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000046-0000-0000-0000-000000000046', '00000036-0000-0000-0000-000000000036', NOW(), 40, 'Diseño de arquitectura Telemedicina.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000047-0000-0000-0000-000000000047', '00000039-0000-0000-0000-000000000039', NOW(), 25, 'Modelado de PowerBI inicial.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
-- Historial Proyecto 44 (App Fidelización)
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000063-0000-0000-0000-000000000063', '00000044-0000-0000-0000-000000000044', NOW() - INTERVAL '4 months', 0, 'Proyecto creado.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000049-0000-0000-0000-000000000049', '00000044-0000-0000-0000-000000000044', NOW() - INTERVAL '3 months', 10, 'Inicio de desarrollo backend.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000053-0000-0000-0000-000000000053', '00000044-0000-0000-0000-000000000044', NOW() - INTERVAL '2 months', 30, 'Endpoints principales listos.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000054-0000-0000-0000-000000000054', '00000044-0000-0000-0000-000000000044', NOW() - INTERVAL '1 month', 50, 'Integración con app móvil iniciada.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000055-0000-0000-0000-000000000055', '00000044-0000-0000-0000-000000000044', NOW(), 65, 'Desarrollo backend fidelización completado.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;

-- Historial Proyecto 43 (Blockchain)
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000064-0000-0000-0000-000000000064', '00000043-0000-0000-0000-000000000043', NOW() - INTERVAL '3 months', 0, 'Proyecto creado.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000050-0000-0000-0000-000000000050', '00000043-0000-0000-0000-000000000043', NOW() - INTERVAL '2 months', 5, 'Investigación preliminar.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000056-0000-0000-0000-000000000056', '00000043-0000-0000-0000-000000000043', NOW() - INTERVAL '1 month', 8, 'Pruebas de concepto.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000057-0000-0000-0000-000000000057', '00000043-0000-0000-0000-000000000043', NOW(), 12, 'Análisis de viabilidad blockchain.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;

-- Historial Proyecto 42 (Portal Pacientes)
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000065-0000-0000-0000-000000000065', '00000042-0000-0000-0000-000000000042', NOW() - INTERVAL '2 months', 0, 'Proyecto creado.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000048-0000-0000-0000-000000000048', '00000042-0000-0000-0000-000000000042', NOW() - INTERVAL '1 month', 5, 'Kickoff Portal Pacientes.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000058-0000-0000-0000-000000000058', '00000042-0000-0000-0000-000000000042', NOW(), 10, 'Levantamiento de requerimientos HIS.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;

-- Historial Proyecto 41 (Sistema POS)
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000066-0000-0000-0000-000000000066', '00000041-0000-0000-0000-000000000041', NOW() - INTERVAL '5 months', 0, 'Proyecto creado.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000051-0000-0000-0000-000000000051', '00000041-0000-0000-0000-000000000041', NOW() - INTERVAL '4 months', 20, 'Arquitectura POS aprobada.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000059-0000-0000-0000-000000000059', '00000041-0000-0000-0000-000000000041', NOW() - INTERVAL '3 months', 50, 'MVP lanzado en 5 sucursales.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000060-0000-0000-0000-000000000060', '00000041-0000-0000-0000-000000000041', NOW() - INTERVAL '1 month', 85, 'Rollout masivo en marcha.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000061-0000-0000-0000-000000000061', '00000041-0000-0000-0000-000000000041', NOW(), 100, 'Sistema POS desplegado en 50 sucursales.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;

-- Historial Proyecto 40 (Banca Móvil)
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000067-0000-0000-0000-000000000067', '00000040-0000-0000-0000-000000000040', NOW() - INTERVAL '2 months', 0, 'Proyecto creado.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000052-0000-0000-0000-000000000052', '00000040-0000-0000-0000-000000000040', NOW() - INTERVAL '1 month', 2, 'Primeros bocetos.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
INSERT INTO seguimientos (id, proyecto_id, fecha, avance, comentario, created_at, updated_at) VALUES ('00000062-0000-0000-0000-000000000062', '00000040-0000-0000-0000-000000000040', NOW(), 8, 'Wireframes aprobados Banca Móvil.', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;

-- Datos simulados para RegistroHoras
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-03-23', 7.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-03-23', 5.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-03-23', 4.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-03-24', 7.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-03-24', 11.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-03-25', 6.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-03-25', 5.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-03-26', 5.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-03-26', 8.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-03-26', 5.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-03-27', 7.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-03-27', 8.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-03-27', 3.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-03-28', 8.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-03-28', 1.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-03-29', 11.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-03-29', 4.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-03-29', 8.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-03-30', 7.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-03-30', 6.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-03-31', 6.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-03-31', 0.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-04-01', 4.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-02', 3.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-02', 3.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-03', 9.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-04-03', 6.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-04', 4.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-04', 3.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-04-05', 7.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-05', 6.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-04-05', 5.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-06', 6.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-06', 8.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-04-07', 10.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-04-07', 9.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-04-07', 6.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-04-08', 4.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-08', 6.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-04-09', 5.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-09', 2.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-09', 4.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-04-10', 5.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-10', 7.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-11', 4.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-11', 7.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-11', 3.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-04-12', 6.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-12', 5.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-12', 5.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-04-13', 2.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-13', 5.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-14', 7.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-04-14', 1.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-04-14', 7.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-15', 2.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-15', 5.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-15', 5.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-16', 6.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-16', 1.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-17', 8.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-17', 7.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-17', 6.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-04-18', 7.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-18', 1.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-18', 5.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-19', 6.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-19', 0.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-20', 3.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-20', 8.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-04-21', 8.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-21', 4.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-21', 4.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-22', 4.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-04-22', 5.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-04-22', 10.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-23', 9.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-23', 3.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-23', 6.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-04-24', 1.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-24', 4.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-25', 6.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-04-25', 7.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-26', 9.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-26', 1.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-04-26', 3.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-27', 6.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-04-27', 8.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-04-28', 6.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-04-28', 3.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-04-29', 3.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-04-29', 6.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-04-30', 2.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-04-30', 4.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-01', 2.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-01', 9.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-02', 6.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-02', 4.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-02', 8.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-03', 7.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-03', 5.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-04', 11.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-04', 3.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-05', 6.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-05', 4.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-06', 8.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-06', 6.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-06', 4.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-07', 6.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-07', 6.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-08', 4.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-08', 7.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-08', 7.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-09', 8.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-09', 6.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-10', 4.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-11', 9.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-11', 3.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-11', 10.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-12', 4.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-12', 7.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-12', 6.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-13', 10.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-13', 10.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-13', 1.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-14', 8.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-14', 4.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-15', 6.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-15', 7.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-15', 6.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-16', 3.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-16', 3.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-16', 6.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-17', 3.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-17', 6.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-18', 5.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-19', 5.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-19', 1.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-20', 10.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-20', 5.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-20', 2.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-21', 9.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-22', 5.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-23', 7.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-23', 6.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-23', 2.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-24', 2.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-24', 8.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-24', 4.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-25', 7.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-25', 8.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-25', 10.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-26', 6.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-26', 6.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-26', 2.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-05-27', 7.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-27', 4.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-27', 5.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-05-28', 10.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-28', 2.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-28', 9.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-05-29', 6.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-05-29', 3.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-30', 3.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-05-30', 2.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-05-31', 8.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-06-01', 7.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-06-01', 5.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-01', 3.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-06-02', 5.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-06-02', 5.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-06-02', 9.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-06-03', 9.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-03', 10.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-04', 6.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-06-04', 5.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-05', 3.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-05', 2.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-06', 3.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-06-07', 4.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-06-07', 6.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-07', 7.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-06-08', 11.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-06-08', 4.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-08', 7.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-06-09', 7.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-09', 10.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-09', 1.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-06-10', 2.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-10', 5.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-10', 5.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-06-11', 8.9, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-11', 6.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-06-11', 8.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-06-12', 6.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-12', 9.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-12', 2.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-06-13', 2.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-13', 2.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000002-0000-0000-0000-000000000002', '2026-06-13', 7.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-06-14', 0.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-14', 2.0, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-06-14', 5.2, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-06-15', 3.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-06-15', 6.5, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-06-16', 8.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-16', 3.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-06-16', 6.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-06-17', 5.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000002-0000-0000-0000-000000000002', '2026-06-17', 0.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000003-0000-0000-0000-000000000003', '2026-06-18', 3.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000009-0000-0000-0000-000000000009', '00000003-0000-0000-0000-000000000003', '2026-06-18', 9.3, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-06-19', 4.8, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-19', 8.4, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000007-0000-0000-0000-000000000007', '00000002-0000-0000-0000-000000000002', '2026-06-20', 5.7, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-20', 7.6, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
INSERT INTO registro_horas (proyecto_id, consultor_id, fecha, horas_trabajadas, descripcion, fecha_creacion) VALUES ('00000008-0000-0000-0000-000000000008', '00000003-0000-0000-0000-000000000003', '2026-06-21', 7.1, 'Desarrollo y pruebas', CURRENT_TIMESTAMP);
