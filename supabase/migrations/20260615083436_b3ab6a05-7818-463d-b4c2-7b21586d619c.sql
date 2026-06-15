ALTER TABLE public.updates 
  ADD COLUMN IF NOT EXISTS media_url text,
  ADD COLUMN IF NOT EXISTS media_type text CHECK (media_type IN ('image','video') OR media_type IS NULL),
  ADD COLUMN IF NOT EXISTS excerpt text;