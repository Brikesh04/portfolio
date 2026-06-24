-- schema.sql
-- Run this script in the Supabase SQL Editor to initialize your tables.

-- 1. Create Settings table (single configuration document)
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY DEFAULT 1,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    linkedin_url TEXT,
    github_url TEXT,
    photo_url TEXT,
    translations JSONB NOT NULL,
    CONSTRAINT single_row CHECK (id = 1) -- Enforce only one row ever exists
);

-- 2. Create Projects table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    desc_en TEXT NOT NULL,
    desc_fr TEXT NOT NULL,
    category_en TEXT NOT NULL,
    category_fr TEXT NOT NULL,
    year TEXT NOT NULL,
    tags JSONB NOT NULL, -- Array of tags as JSONB
    img TEXT NOT NULL,
    date TEXT NOT NULL,
    images JSONB NOT NULL -- Array of images as JSONB
);

-- Enable Row Level Security (RLS) or public access for reading depending on requirements.
-- For a simple portfolio, we can allow public select access on both tables.
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow public read projects" ON projects FOR SELECT USING (true);

CREATE POLICY "Allow service role write settings" ON settings FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service role write projects" ON projects FOR ALL TO service_role USING (true);
