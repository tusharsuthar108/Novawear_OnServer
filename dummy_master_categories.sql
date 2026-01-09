-- Insert dummy master categories for NovaWear
INSERT INTO master_categories (name, slug, is_active) VALUES
('Men''s Clothing', 'mens-clothing', true),
('Women''s Clothing', 'womens-clothing', true),
('Kids & Baby', 'kids-baby', true),
('Footwear', 'footwear', true),
('Accessories', 'accessories', true),
('Sports & Activewear', 'sports-activewear', true),
('Formal Wear', 'formal-wear', true),
('Casual Wear', 'casual-wear', true),
('Ethnic Wear', 'ethnic-wear', true),
('Winter Collection', 'winter-collection', true),
('Summer Collection', 'summer-collection', true),
('Undergarments', 'undergarments', true);

-- You can also add some inactive categories for testing
INSERT INTO master_categories (name, slug, is_active) VALUES
('Vintage Collection', 'vintage-collection', false),
('Luxury Brand', 'luxury-brand', false);