
-- 1. Add source + status to contact_messages
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'Contact Page',
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'New';

-- 2. Replace permissive INSERT policies with validated ones
DROP POLICY IF EXISTS "anon submit messages" ON public.contact_messages;
DROP POLICY IF EXISTS "auth submit messages" ON public.contact_messages;

CREATE POLICY "anon submit messages" ON public.contact_messages
  FOR INSERT TO anon
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 120
    AND length(btrim(email)) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(message)) BETWEEN 1 AND 4000
    AND source IN ('Contact Page','Help Center','WhatsApp','Partner Inquiry','Rider Inquiry')
    AND status = 'New'
  );

CREATE POLICY "auth submit messages" ON public.contact_messages
  FOR INSERT TO authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 120
    AND length(btrim(email)) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(message)) BETWEEN 1 AND 4000
    AND source IN ('Contact Page','Help Center','WhatsApp','Partner Inquiry','Rider Inquiry')
    AND status = 'New'
  );

-- 3. Convert has_role to SECURITY INVOKER (RLS on user_roles allows users to read their own rows)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
