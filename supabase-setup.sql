-- MenuSmart AI Supabase Schema
-- Ejecuta este script en el SQL Editor de tu proyecto en Supabase

-- 1. Create Tables
CREATE TABLE public.restaurants (
    id UUID DEFAULT auth.uid() PRIMARY KEY,
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    currency TEXT DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    calories INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_id UUID REFERENCES public.items(id) ON DELETE CASCADE,
    event_type TEXT CHECK (event_type IN ('view', 'click')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.ai_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    suggestion_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Configure Row Level Security (RLS)
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;

-- 2.1 Analytics/Public Read Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "Categories are viewable by everyone." ON public.categories FOR SELECT USING (true);
CREATE POLICY "Items are viewable by everyone." ON public.items FOR SELECT USING (true);

-- Allow public inserts into analytics (anonymous users clicking)
CREATE POLICY "Allow public insert to analytics." ON public.analytics FOR INSERT WITH CHECK (true);

-- 2.2 Owner Policies (CRUD)
CREATE POLICY "Owners can manage own restaurants." ON public.restaurants FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "Owners can manage own categories." ON public.categories FOR ALL USING (auth.uid() = (SELECT owner_id FROM public.restaurants WHERE id = restaurant_id));
CREATE POLICY "Owners can manage own items." ON public.items FOR ALL USING (auth.uid() = (SELECT owner_id FROM public.restaurants WHERE id = (SELECT restaurant_id FROM public.categories WHERE id = category_id)));
CREATE POLICY "Owners can view own analytics." ON public.analytics FOR SELECT USING (auth.uid() = (SELECT owner_id FROM public.restaurants WHERE id = (SELECT restaurant_id FROM public.categories WHERE id = (SELECT category_id FROM public.items WHERE id = item_id))));
CREATE POLICY "Owners can view own ai reports." ON public.ai_reports FOR SELECT USING (auth.uid() = (SELECT owner_id FROM public.restaurants WHERE id = restaurant_id));

-- 3. Enable Realtime on items table
-- This allows the front-end to subscribe to `is_available` changes instantly
alter publication supabase_realtime add table public.items;
