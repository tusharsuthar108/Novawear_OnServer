-- =====================================================
-- NOVAWEAR COMPLETE SCHEMA FOR NEON.TECH
-- Paste this entire file in Neon SQL Editor and Run
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE,
    phone VARCHAR(15) UNIQUE,
    password_hash TEXT NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    profile_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temp_otp (
    email VARCHAR(120) PRIMARY KEY,
    otp_code VARCHAR(6) NOT NULL,
    otp_expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_addresses (
    address_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    country VARCHAR(50) DEFAULT 'India',
    is_default BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT REFERENCES users(user_id),
    role_id INT REFERENCES roles(role_id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS brands (
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR(100) UNIQUE NOT NULL,
    brand_slug VARCHAR(120) UNIQUE,
    description TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS master_categories (
    master_category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE,
    image_url TEXT,
    icon_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    master_category_id INT REFERENCES master_categories(master_category_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE,
    description TEXT,
    image_url TEXT,
    icon_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sub_categories (
    sub_category_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE,
    description TEXT,
    image_url TEXT,
    icon_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_types (
    type_id SERIAL PRIMARY KEY,
    sub_category_id INT REFERENCES sub_categories(sub_category_id),
    type_name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS product_badges (
    badge_id SERIAL PRIMARY KEY,
    badge_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO product_badges (badge_name, description) VALUES
('Top Deals', 'High discount products'),
('Featured', 'Homepage featured products'),
('Best Selling', 'Most purchased products')
ON CONFLICT (badge_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS sizes (
    size_id SERIAL PRIMARY KEY,
    size_name VARCHAR(10) UNIQUE NOT NULL,
    size_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO sizes (size_name, size_order) VALUES
('XS',1),('S',2),('M',3),('L',4),('XL',5),('XXL',6),('XXXL',7),
('28',8),('30',9),('32',10),('34',11),('36',12),('38',13),('40',14),('42',15)
ON CONFLICT (size_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS colors (
    color_id SERIAL PRIMARY KEY,
    color_name VARCHAR(30) UNIQUE NOT NULL,
    hex_code VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS fabrics (
    fabric_id SERIAL PRIMARY KEY,
    fabric_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO fabrics (fabric_name) VALUES
('Cotton'),('Polyester'),('Linen'),('Silk'),('Wool'),('Denim'),
('Leather'),('Nylon'),('Rayon'),('Spandex'),('Velvet'),('Chiffon'),
('Satin'),('Jersey'),('Fleece')
ON CONFLICT (fabric_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS patterns (
    pattern_id SERIAL PRIMARY KEY,
    pattern_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO patterns (pattern_name) VALUES
('Solid'),('Striped'),('Checked'),('Printed'),('Floral'),('Geometric'),
('Polka Dot'),('Abstract'),('Camouflage'),('Paisley'),('Plaid'),
('Herringbone'),('Houndstooth'),('Animal Print'),('Tie-Dye')
ON CONFLICT (pattern_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(brand_id),
    master_category_id INT REFERENCES master_categories(master_category_id),
    category_id INT REFERENCES categories(category_id),
    sub_category_id INT REFERENCES sub_categories(sub_category_id),
    type_id INT REFERENCES product_types(type_id),
    badge_id INT REFERENCES product_badges(badge_id),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    long_description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_variants (
    variant_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    size_id INT REFERENCES sizes(size_id),
    color_id INT REFERENCES colors(color_id),
    fabric_id INT REFERENCES fabrics(fabric_id),
    pattern_id INT REFERENCES patterns(pattern_id),
    price NUMERIC(10,2) NOT NULL,
    discount_price NUMERIC(10,2),
    variant_sku VARCHAR(80) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory (
    inventory_id SERIAL PRIMARY KEY,
    variant_id INT REFERENCES product_variants(variant_id) ON DELETE CASCADE,
    stock_quantity INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_images (
    image_id SERIAL PRIMARY KEY,
    variant_id INT REFERENCES product_variants(variant_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_badge_mapping (
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    badge_id INT REFERENCES product_badges(badge_id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, badge_id)
);

CREATE TABLE IF NOT EXISTS cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES cart(cart_id) ON DELETE CASCADE,
    variant_id INT REFERENCES product_variants(variant_id),
    quantity INT NOT NULL
);

CREATE TABLE IF NOT EXISTS order_status (
    status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO order_status (status_name) VALUES
('Pending'),('Confirmed'),('Packed'),('Shipped'),
('In Transit'),('Out for Delivery'),('Delivered'),('Cancelled')
ON CONFLICT (status_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    total_amount NUMERIC(10,2),
    status VARCHAR(30) DEFAULT 'Pending',
    payment_status VARCHAR(30),
    payment_method VARCHAR(50),
    address_line1 TEXT,
    address_line2 TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    country VARCHAR(50),
    tracking_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    variant_id INT REFERENCES product_variants(variant_id),
    quantity INT,
    price NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    payment_method VARCHAR(30),
    transaction_id VARCHAR(100),
    amount NUMERIC(10,2),
    payment_status VARCHAR(30),
    paid_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipments (
    shipment_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    courier_name VARCHAR(50),
    tracking_number VARCHAR(100),
    shipment_status VARCHAR(30),
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    user_id INT REFERENCES users(user_id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wishlist (
    user_id INT REFERENCES users(user_id),
    product_id INT REFERENCES products(product_id),
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS pricing_plans (
    plan_id SERIAL PRIMARY KEY,
    plan_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'flat')),
    discount_value NUMERIC(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coupons (
    coupon_id SERIAL PRIMARY KEY,
    coupon_code VARCHAR(30) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'flat')) NOT NULL,
    discount_value NUMERIC(10,2) NOT NULL,
    min_order_amount NUMERIC(10,2),
    max_discount_amount NUMERIC(10,2),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    usage_limit INT,
    used_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS taxes (
    tax_id SERIAL PRIMARY KEY,
    tax_name VARCHAR(50) NOT NULL,
    tax_type VARCHAR(20) CHECK (tax_type IN ('percentage', 'flat')),
    tax_value NUMERIC(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fees (
    fee_id SERIAL PRIMARY KEY,
    fee_name VARCHAR(50) UNIQUE NOT NULL,
    fee_type VARCHAR(20) CHECK (fee_type IN ('percentage', 'flat')),
    fee_value NUMERIC(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
