-- Run this in your Supabase SQL Editor to fix the image links
-- This updates the paths to match the files I just generated/placed in your project.

UPDATE vehicles SET image = '/vehicles/corolla-touring.png' WHERE id = 'economy-1';
UPDATE vehicles SET image = '/vehicles/vitz.png' WHERE id = 'economy-2';
UPDATE vehicles SET image = '/vehicles/axio.jpg' WHERE id = 'economy-3';
UPDATE vehicles SET image = '/vehicles/rav4.jpg' WHERE id = 'suv-1';
UPDATE vehicles SET image = '/vehicles/odyssey.jpg' WHERE id = 'suv-2';
UPDATE vehicles SET image = '/vehicles/camry.jpg' WHERE id = 'luxury-1';
