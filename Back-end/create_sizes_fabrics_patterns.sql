-- Create sizes table
CREATE TABLE IF NOT EXISTS sizes (
    size_id SERIAL PRIMARY KEY,
    size_name VARCHAR(10) NOT NULL UNIQUE,
    size_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create fabrics table
CREATE TABLE IF NOT EXISTS fabrics (
    fabric_id SERIAL PRIMARY KEY,
    fabric_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create patterns table
CREATE TABLE IF NOT EXISTS patterns (
    pattern_id SERIAL PRIMARY KEY,
    pattern_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert common sizes
INSERT INTO sizes (size_name, size_order) VALUES
('XS', 1),
('S', 2),
('M', 3),
('L', 4),
('XL', 5),
('XXL', 6),
('XXXL', 7),
('28', 8),
('30', 9),
('32', 10),
('34', 11),
('36', 12),
('38', 13),
('40', 14),
('42', 15)
ON CONFLICT (size_name) DO NOTHING;

-- Insert common fabrics
INSERT INTO fabrics (fabric_name) VALUES
('Cotton'),
('Polyester'),
('Linen'),
('Silk'),
('Wool'),
('Denim'),
('Leather'),
('Nylon'),
('Rayon'),
('Spandex'),
('Velvet'),
('Chiffon'),
('Satin'),
('Jersey'),
('Fleece')
ON CONFLICT (fabric_name) DO NOTHING;

-- Insert common patterns
INSERT INTO patterns (pattern_name) VALUES
('Solid'),
('Striped'),
('Checked'),
('Printed'),
('Floral'),
('Geometric'),
('Polka Dot'),
('Abstract'),
('Camouflage'),
('Paisley'),
('Plaid'),
('Herringbone'),
('Houndstooth'),
('Animal Print'),
('Tie-Dye')
ON CONFLICT (pattern_name) DO NOTHING;
