-- Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
    coupon_id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2) DEFAULT 0,
    max_discount DECIMAL(10,2),
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Taxes Table
CREATE TABLE IF NOT EXISTS taxes (
    tax_id SERIAL PRIMARY KEY,
    tax_name VARCHAR(100) NOT NULL,
    tax_rate DECIMAL(5,2) NOT NULL,
    state VARCHAR(100),
    country VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fees Table (Shipping/Handling)
CREATE TABLE IF NOT EXISTS fees (
    fee_id SERIAL PRIMARY KEY,
    fee_name VARCHAR(100) NOT NULL,
    fee_type VARCHAR(50) CHECK (fee_type IN ('shipping', 'handling', 'processing')),
    fee_amount DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Addresses Table
CREATE TABLE IF NOT EXISTS user_addresses (
    address_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Images Table (Multiple images per variant)
CREATE TABLE IF NOT EXISTS product_images (
    image_id SERIAL PRIMARY KEY,
    variant_id INTEGER REFERENCES product_variants(variant_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_taxes_country_state ON taxes(country, state);
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_product_images_variant_id ON product_images(variant_id);

-- Insert sample data
INSERT INTO taxes (tax_name, tax_rate, country, state) VALUES 
('GST', 18.00, 'India', 'All'),
('Sales Tax', 8.50, 'USA', 'California'),
('VAT', 20.00, 'UK', 'All')
ON CONFLICT DO NOTHING;

INSERT INTO fees (fee_name, fee_type, fee_amount, min_order_amount) VALUES 
('Standard Shipping', 'shipping', 50.00, 0),
('Free Shipping', 'shipping', 0.00, 1000),
('Express Shipping', 'shipping', 150.00, 0)
ON CONFLICT DO NOTHING;

INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_discount, valid_until) VALUES 
('WELCOME10', 'percentage', 10.00, 500, 200, CURRENT_TIMESTAMP + INTERVAL '30 days'),
('FLAT100', 'fixed', 100.00, 1000, NULL, CURRENT_TIMESTAMP + INTERVAL '30 days'),
('SAVE20', 'percentage', 20.00, 2000, 500, CURRENT_TIMESTAMP + INTERVAL '30 days')
ON CONFLICT DO NOTHING;
