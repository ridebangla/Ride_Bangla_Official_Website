-- 1) team_members: revoke broad SELECT, then grant only safe columns to public roles.
REVOKE SELECT ON public.team_members FROM anon;
REVOKE SELECT ON public.team_members FROM authenticated;

GRANT SELECT
  (id, name, title, bio, photo_url, facebook_url, instagram_url, sort_order, created_at, updated_at)
  ON public.team_members TO anon, authenticated;

-- Admins keep full access via the existing "admin write team" ALL policy + service_role.
GRANT ALL ON public.team_members TO service_role;

-- 2) Lock down SECURITY DEFINER helper used only as an auth.users trigger.
REVOKE EXECUTE ON FUNCTION public.handle_first_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_first_admin() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_first_admin() FROM authenticated;