-- ============================================================
-- NexaPM — Script de inicialización de PostgreSQL
-- Se ejecuta una sola vez al crear el contenedor
-- ============================================================

-- Extensión para generación de UUID (opcional, Hibernate lo maneja)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Esquema dedicado (opcional)
-- CREATE SCHEMA IF NOT EXISTS nexapm;

-- Log de inicio
DO $$
BEGIN
    RAISE NOTICE 'NexaPM PostgreSQL initialized successfully';
END $$;
