
-- Scope insert policy to specific roles (still allows anyone hitting the API)
DROP POLICY IF EXISTS "anyone can submit" ON public.contact_messages;
CREATE POLICY "anon submit messages" ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth submit messages" ON public.contact_messages FOR INSERT TO authenticated WITH CHECK (true);

-- Lock down SECURITY DEFINER function execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_first_admin() FROM PUBLIC, anon, authenticated;
