CREATE POLICY "Anyone can upload review photos" ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'review-photos' AND lower(storage.extension(name)) IN ('jpg','jpeg','png','webp','heic'));
CREATE POLICY "Review photos are readable" ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'review-photos');