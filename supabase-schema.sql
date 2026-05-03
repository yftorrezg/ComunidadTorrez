-- ============================================================
-- SCHEMA CASAYAFER
-- Ejecutar en Supabase SQL Editor: supabase.com > SQL Editor
-- ============================================================

-- Plantas
CREATE TABLE IF NOT EXISTS plantas (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio_mensual INTEGER NOT NULL,
  precio_trimestral INTEGER,
  precio_semestral INTEGER,
  precio_anual INTEGER,
  servicios TEXT[] DEFAULT '{}',
  orden INTEGER DEFAULT 0
);

-- Habitaciones
CREATE TABLE IF NOT EXISTS habitaciones (
  id SERIAL PRIMARY KEY,
  planta_id TEXT NOT NULL REFERENCES plantas(id) ON DELETE CASCADE,
  numero INTEGER NOT NULL,
  estado TEXT NOT NULL DEFAULT 'disponible'
    CHECK (estado IN ('disponible', 'ocupado', 'reservado')),
  descripcion TEXT,
  orden INTEGER DEFAULT 0
);

-- Fotos de habitaciones
CREATE TABLE IF NOT EXISTS fotos_habitacion (
  id SERIAL PRIMARY KEY,
  habitacion_id INTEGER NOT NULL REFERENCES habitaciones(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  storage_path TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Areas comunes (banos, cocina, lavanderia, tendedero, terraza, etc.)
CREATE TABLE IF NOT EXISTS areas_comunes (
  id SERIAL PRIMARY KEY,
  planta_id TEXT NOT NULL REFERENCES plantas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('bano','cocina','lavanderia','tendedero','terraza','patio','vista','general')),
  nombre TEXT NOT NULL,
  orden INTEGER DEFAULT 0
);

-- Fotos de areas comunes
CREATE TABLE IF NOT EXISTS fotos_area (
  id SERIAL PRIMARY KEY,
  area_id INTEGER NOT NULL REFERENCES areas_comunes(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  storage_path TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE plantas ENABLE ROW LEVEL SECURITY;
ALTER TABLE habitaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos_habitacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas_comunes ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos_area ENABLE ROW LEVEL SECURITY;

-- Lectura publica
CREATE POLICY "Lectura publica plantas" ON plantas FOR SELECT USING (true);
CREATE POLICY "Lectura publica habitaciones" ON habitaciones FOR SELECT USING (true);
CREATE POLICY "Lectura publica fotos habitacion" ON fotos_habitacion FOR SELECT USING (true);
CREATE POLICY "Lectura publica areas" ON areas_comunes FOR SELECT USING (true);
CREATE POLICY "Lectura publica fotos area" ON fotos_area FOR SELECT USING (true);

-- Escritura solo con service_role (las API routes usan supabaseAdmin)
-- No necesitamos politicas de escritura para anon porque usamos service_role en el server

-- ============================================================
-- STORAGE BUCKET
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('fotos', 'fotos', true)
ON CONFLICT DO NOTHING;

-- Politica lectura publica en storage
CREATE POLICY "Fotos publicas"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'fotos');

-- ============================================================
-- SEED: DATOS INICIALES
-- ============================================================

-- Plantas
INSERT INTO plantas (id, nombre, precio_mensual, precio_trimestral, precio_semestral, precio_anual, servicios, orden) VALUES
  ('plantaBaja', 'Planta Baja',  380, NULL, NULL, NULL, ARRAY['Agua','Luz'], 1),
  ('planta0',    'Planta 0',     380, NULL, NULL, NULL, ARRAY['Agua','Luz'], 2),
  ('planta1',    'Planta 1',     450, 1320, 2580, 5040, ARRAY['Agua','Luz','Internet'], 3),
  ('planta2',    'Planta 2',     450, 1320, 2580, 5040, ARRAY['Agua','Luz','Internet'], 4)
ON CONFLICT DO NOTHING;

-- Habitaciones Planta Baja (10)
INSERT INTO habitaciones (planta_id, numero, estado, orden) VALUES
  ('plantaBaja', 1,  'disponible', 1),
  ('plantaBaja', 2,  'disponible', 2),
  ('plantaBaja', 3,  'disponible', 3),
  ('plantaBaja', 4,  'disponible', 4),
  ('plantaBaja', 5,  'disponible', 5),
  ('plantaBaja', 6,  'disponible', 6),
  ('plantaBaja', 7,  'disponible', 7),
  ('plantaBaja', 8,  'disponible', 8),
  ('plantaBaja', 9,  'disponible', 9),
  ('plantaBaja', 10, 'disponible', 10);

-- Habitaciones Planta 0 (3)
INSERT INTO habitaciones (planta_id, numero, estado, orden) VALUES
  ('planta0', 1, 'disponible', 1),
  ('planta0', 2, 'disponible', 2),
  ('planta0', 3, 'disponible', 3);

-- Habitaciones Planta 1 (7)
INSERT INTO habitaciones (planta_id, numero, estado, orden) VALUES
  ('planta1', 1, 'disponible', 1),
  ('planta1', 2, 'disponible', 2),
  ('planta1', 3, 'disponible', 3),
  ('planta1', 4, 'disponible', 4),
  ('planta1', 5, 'disponible', 5),
  ('planta1', 6, 'disponible', 6),
  ('planta1', 7, 'disponible', 7);

-- Habitaciones Planta 2 (6)
INSERT INTO habitaciones (planta_id, numero, estado, orden) VALUES
  ('planta2', 1, 'disponible', 1),
  ('planta2', 2, 'disponible', 2),
  ('planta2', 3, 'disponible', 3),
  ('planta2', 4, 'disponible', 4),
  ('planta2', 5, 'disponible', 5),
  ('planta2', 6, 'disponible', 6);

-- Areas comunes Planta Baja
INSERT INTO areas_comunes (planta_id, tipo, nombre, orden) VALUES
  ('plantaBaja', 'bano',       'Bano 1',        1),
  ('plantaBaja', 'bano',       'Bano 2',        2),
  ('plantaBaja', 'lavanderia', 'Lavanderia',    3),
  ('plantaBaja', 'tendedero',  'Tendederos',    4),
  ('plantaBaja', 'patio',      'Patio',         5),
  ('plantaBaja', 'vista',      'Exterior',      6);

-- Areas comunes Planta 0
INSERT INTO areas_comunes (planta_id, tipo, nombre, orden) VALUES
  ('planta0', 'bano',       'Bano 1',     1),
  ('planta0', 'bano',       'Bano 2',     2),
  ('planta0', 'lavanderia', 'Lavanderia', 3),
  ('planta0', 'tendedero',  'Tendederos', 4);

-- Areas comunes Planta 1
INSERT INTO areas_comunes (planta_id, tipo, nombre, orden) VALUES
  ('planta1', 'cocina',     'Cocina',     1),
  ('planta1', 'bano',       'Bano 1',     2),
  ('planta1', 'bano',       'Bano 2',     3),
  ('planta1', 'terraza',    'Terraza',    4),
  ('planta1', 'lavanderia', 'Lavanderia', 5),
  ('planta1', 'tendedero',  'Tendederos', 6);

-- Areas comunes Planta 2
INSERT INTO areas_comunes (planta_id, tipo, nombre, orden) VALUES
  ('planta2', 'cocina',     'Cocina',     1),
  ('planta2', 'bano',       'Bano 1',     2),
  ('planta2', 'bano',       'Bano 2',     3),
  ('planta2', 'terraza',    'Terraza',    4),
  ('planta2', 'lavanderia', 'Lavanderia', 5),
  ('planta2', 'tendedero',  'Tendederos', 6);
