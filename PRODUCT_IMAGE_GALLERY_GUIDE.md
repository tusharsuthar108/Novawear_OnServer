# Product Image Gallery - Implementation Guide

## Overview
This guide explains how to add multiple images (4-5) to products and display them in the product detail page.

## Features Implemented

### 1. Admin Panel - Add Product Images
**Location:** Admin Dashboard → Product List → Image Icon Button

**How to Use:**
1. Go to Admin Dashboard
2. Navigate to Product List
3. Find the product you want to add images to
4. Click the **Image icon** (green button) in the Actions column
5. Select up to 5 images from your computer
6. Click "Upload" to save the images

**Component:** `Front-end/src/components/admin/AddProductImages.jsx`

### 2. Product Detail Page - Image Gallery
**Location:** Home Page → Click any product → Product Detail Page

**Features:**
- **Masonry Layout:** Images are displayed in a Pinterest-style 2-column grid
- **Zoom View:** Click any image to view it in fullscreen
- **Image Counter:** Each image shows its position (e.g., "1/5")
- **Navigation:** Use arrow keys or buttons to navigate between images in fullscreen
- **Responsive:** Works on all screen sizes

**Component:** `Front-end/src/components/ProductDetails.jsx`

## How It Works

### Image Upload Flow
1. Admin selects a product from the dropdown
2. Admin uploads 4-5 images
3. Images are stored in `Back-end/uploads/products/`
4. Image URLs are saved in the database linked to the product variant

### Image Display Flow
1. User clicks a product on the home page
2. Product detail page loads with all images
3. Images are fetched from the database
4. Images are displayed in a masonry grid layout
5. User can click to zoom and navigate through images

## API Endpoints Used

### Upload Image
```
POST http://localhost:3000/api/product-images
Body: FormData with 'image' file and 'variant_id'
```

### Get Product with Images
```
GET http://localhost:3000/api/products/:id
Returns: Product data with images array
```

## Database Structure
Images are stored in the `product_images` table:
- `image_id`: Primary key
- `variant_id`: Links to product variant
- `image_url`: Path to the uploaded image
- `is_primary`: Boolean flag for main image

## File Changes Made

### Modified Files:
1. **AddProductImages.jsx** - Enhanced with product selection and 5-image limit
2. **ProductList.jsx** - Added "Add Images" button for each product

### Existing Files (Already Working):
1. **ProductDetails.jsx** - Already displays images in masonry layout
2. **ProductDetailsPage.jsx** - Already fetches and displays product images

## Usage Instructions

### For Admin:
1. Login to admin panel
2. Go to Product Management
3. Click the Image icon (green) next to any product
4. Select 4-5 product images
5. Upload them

### For Customers:
1. Browse products on home page
2. Click any product card
3. View all product images in the detail page
4. Click images to zoom
5. Navigate through images using arrows or keyboard

## Notes
- Maximum 5 images per product recommended
- Images are automatically resized and optimized
- Supports JPG, PNG, and WebP formats
- Images are displayed in the order they were uploaded
