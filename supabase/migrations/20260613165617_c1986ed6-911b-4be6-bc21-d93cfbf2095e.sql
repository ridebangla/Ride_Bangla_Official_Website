
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role) $$;

CREATE POLICY "users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- First signed-up user becomes admin
CREATE OR REPLACE FUNCTION public.handle_first_admin()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role='admin') THEN
    INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created_first_admin
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_first_admin();

-- Generic updated_at
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- Updates / news
CREATE TABLE public.updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'Announcement',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.updates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.updates TO authenticated;
GRANT ALL ON public.updates TO service_role;
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read updates" ON public.updates FOR SELECT USING (is_published);
CREATE POLICY "admin write updates" ON public.updates FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER updates_touch BEFORE UPDATE ON public.updates FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Team members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  email TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read team" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "admin write team" ON public.team_members FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER team_touch BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- App status
CREATE TABLE public.app_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_name TEXT NOT NULL,
  app_type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Coming Soon',
  apk_url TEXT,
  play_store_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.app_status TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.app_status TO authenticated;
GRANT ALL ON public.app_status TO service_role;
ALTER TABLE public.app_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read apps" ON public.app_status FOR SELECT USING (true);
CREATE POLICY "admin write apps" ON public.app_status FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER apps_touch BEFORE UPDATE ON public.app_status FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Contact info
CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_email TEXT,
  support_email TEXT,
  whatsapp TEXT,
  phone TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  address TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.contact_info TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.contact_info TO authenticated;
GRANT ALL ON public.contact_info TO service_role;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read contact" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "admin write contact" ON public.contact_info FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER contact_touch BEFORE UPDATE ON public.contact_info FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- FAQs
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "admin write faqs" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER faqs_touch BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Homepage content (singleton)
CREATE TABLE public.homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_headline TEXT NOT NULL,
  hero_subheadline TEXT NOT NULL,
  latest_update_text TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.homepage_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.homepage_content TO authenticated;
GRANT ALL ON public.homepage_content TO service_role;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read homepage" ON public.homepage_content FOR SELECT USING (true);
CREATE POLICY "admin write homepage" ON public.homepage_content FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Seed initial data
INSERT INTO public.homepage_content (hero_headline, hero_subheadline, latest_update_text) VALUES
('Food Delivery, Courier & Future Digital Services for Bangladesh',
 'Building a trusted digital ecosystem for customers, riders, partners and local businesses.',
 'Ride Bangla apps are coming soon — stay tuned for our official launch.');

INSERT INTO public.contact_info (business_email, support_email, whatsapp, phone, facebook_url, instagram_url, youtube_url, address) VALUES
('info@ridebangla.bd','support@ridebangla.bd','+8801309587749','+8801309587749',
 'https://facebook.com/ridebangla','https://www.instagram.com/ride.bangla_','https://www.youtube.com/@ridebangla-0','Faridpur, Bangladesh');

INSERT INTO public.team_members (name, title, bio, facebook_url, instagram_url, email, sort_order) VALUES
('MD Enamul Seddik','Co-Founder & CEO',
 'A young entrepreneur from Faridpur who started Ride Bangla by working directly in the field alongside riders and partners. He is building Ride Bangla into a trusted delivery ecosystem that empowers local businesses and serves communities across Bangladesh.',
 'https://www.facebook.com/enamul.seddik','https://www.instagram.com/ena.mul_','ceo@ridebangla.bd',1),
('MD Emon Seddik','Co-Founder',
 'Co-Founder supporting Ride Bangla''s growth and day-to-day operations across Bangladesh. He focuses on building strong rider and partner networks and ensuring reliable service for every customer.',
 'https://www.facebook.com/mdemonsiddik28', NULL,'cofounder@ridebangla.bd',2);

INSERT INTO public.app_status (app_name, app_type, description, status, sort_order) VALUES
('Ride Bangla','Customer App','Order homemade food, restaurant meals, and book courier deliveries.','Coming Soon',1),
('Ride Bangla Rider','Rider App','Accept delivery requests and earn on your own schedule.','Coming Soon',2),
('Ride Bangla Partner','Partner App','Manage your restaurant or homemade food business, orders, and offers.','Coming Soon',3),
('Ride Bangla Agent','Agent App','Represent Ride Bangla in your district and grow the local network.','Coming Soon',4),
('Ride Bangla Pay','Digital Wallet','Ride Bangla''s own future wallet for customers, partners, and riders.','Coming Soon',5);

INSERT INTO public.faqs (category, question, answer, sort_order) VALUES
('General Support','When will Ride Bangla launch?','We are preparing for our official launch in Bangladesh. Follow our Updates page and social channels for announcements.',1),
('General Support','Where is Ride Bangla based?','Ride Bangla is founded and headquartered in Faridpur, Bangladesh.',2),
('Food Delivery','What can I order on Ride Bangla?','You will be able to order homemade food, cakes, and meals from local restaurants across our service areas.',1),
('Courier','What courier services will you offer?','We will offer parcel delivery and document courier services within and between cities.',1),
('Rider','How can I become a Ride Bangla Rider?','Rider onboarding will open with the launch of the Ride Bangla Rider app. Contact us to be notified.',1),
('Partner','How can my restaurant or home kitchen join?','Partner registrations will open with the Ride Bangla Partner app. Reach out via the Contact page to register interest.',1);

INSERT INTO public.updates (title, description, category) VALUES
('Ride Bangla Official Website Launched','We are excited to introduce the official Ride Bangla corporate website. Stay tuned for our upcoming app launches and service updates.','Announcement'),
('Riders & Partners Recruitment Coming Soon','We will soon open registrations for riders and food partners across Faridpur and other districts.','Recruitment');
