-- Add image_url column to product_types table
ALTER TABLE product_types ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
