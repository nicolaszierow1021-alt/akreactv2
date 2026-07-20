-- Ejecuta esto en el SQL Editor de tu panel de Supabase
CREATE TABLE apps (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT DEFAULT '',
  description TEXT,
  version TEXT NOT NULL,
  size TEXT NOT NULL,
  rating NUMERIC DEFAULT 0,
  "ageRating" TEXT NOT NULL,
  "modType" TEXT,
  "modInfo" JSONB DEFAULT '[]'::JSONB,
  "iconUrl" TEXT,
  "bannerUrl" TEXT,
  screenshots JSONB DEFAULT '[]'::JSONB,
  "downloadLinks" JSONB DEFAULT '[]'::JSONB,
  "badgeType" TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security) y crear una política para acceso público de lectura
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de apps"
ON apps FOR SELECT
TO public
USING (true);

-- Política para que el panel de administración (anon, por ahora o usando el secret) pueda insertar/actualizar
-- IMPORTANTE: En producción es mejor manejar autenticación propia o usar el Service Role para escritura. 
-- Aquí permitimos inserción/actualización con el rol anon para facilidad inicial de conexión, o puedes usar el secret.
CREATE POLICY "Escritura de apps"
ON apps FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- ============================================
-- MIGRACIÓN: Si ya tienes la tabla creada, ejecuta SOLO esto:
-- ============================================
-- ALTER TABLE apps ADD COLUMN IF NOT EXISTS subcategory TEXT DEFAULT '';
-- ALTER TABLE apps ADD COLUMN IF NOT EXISTS "badgeType" TEXT DEFAULT '';
-- ALTER TABLE apps ADD COLUMN IF NOT EXISTS "installationInstructions" TEXT DEFAULT '';

