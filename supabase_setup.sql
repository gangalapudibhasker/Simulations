-- ====================================================================
-- SUPABASE DATABASE TABLE, STORAGE BUCKET & RLS POLICIES SETUP
-- Target Supabase Instance: https://byhgbblarhezlokskxba.supabase.co
-- ====================================================================

-- 1. CREATE METADATA TABLE: simulations
CREATE TABLE IF NOT EXISTS public.simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_num INT4 NOT NULL,
    title TEXT NOT NULL,
    chapter TEXT,
    description TEXT,
    drive_url TEXT NOT NULL,
    file_path TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for quick class-wise lookups
CREATE INDEX IF NOT EXISTS idx_simulations_class_num ON public.simulations(class_num);

-- 2. ENABLE ROW LEVEL SECURITY (RLS) ON METADATA TABLE
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to simulation metadata
CREATE POLICY "Allow public read access for simulations metadata"
ON public.simulations FOR SELECT USING (true);

-- Allow insert access for simulation metadata
CREATE POLICY "Allow insert access for simulation metadata"
ON public.simulations FOR INSERT WITH CHECK (true);

-- Allow update access for simulation metadata
CREATE POLICY "Allow update access for simulation metadata"
ON public.simulations FOR UPDATE USING (true);

-- Allow delete access for simulation metadata
CREATE POLICY "Allow delete access for simulation metadata"
ON public.simulations FOR DELETE USING (true);

-- 3. CREATE STORAGE BUCKET: math-simulations
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'math-simulations',
    'math-simulations',
    true,
    52428800, -- 50 MB limit
    ARRAY['text/html', 'application/json', 'image/png', 'image/jpeg', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 4. ROW LEVEL SECURITY (RLS) POLICIES FOR STORAGE BUCKET
CREATE POLICY "Public Read Access for Math Simulations Storage"
ON storage.objects FOR SELECT USING (bucket_id = 'math-simulations');

CREATE POLICY "Allow Uploads to Math Simulations Storage"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'math-simulations');

CREATE POLICY "Allow Updates to Math Simulations Storage"
ON storage.objects FOR UPDATE USING (bucket_id = 'math-simulations');

CREATE POLICY "Allow Deletes from Math Simulations Storage"
ON storage.objects FOR DELETE USING (bucket_id = 'math-simulations');
