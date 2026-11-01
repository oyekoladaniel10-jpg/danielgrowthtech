CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  brand text CHECK (brand IS NULL OR char_length(brand) <= 120),
  website text CHECK (website IS NULL OR char_length(website) <= 255),
  service text CHECK (service IS NULL OR char_length(service) <= 60),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text NOT NULL CHECK (char_length(comment) BETWEEN 10 AND 2000),
  photo_url text CHECK (photo_url IS NULL OR char_length(photo_url) <= 500),
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.reviews TO anon, authenticated;
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a review" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (approved = false);
CREATE POLICY "Approved reviews are public" ON public.reviews FOR SELECT TO anon, authenticated USING (approved = true);