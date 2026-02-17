# 📸 How to Add Product Images

## Where to Add Images:

### 1. Go to Admin Panel
Navigate to: **Admin Dashboard → Add Product**

### 2. Fill Product Details
- Product Title
- Brand
- Description
- Categories (Master → Category → Sub Category → Type)

### 3. Add Variants Section
This is where you add images! Each variant can have its own image.

**For each variant:**
1. Select Color (e.g., Black, White, Red)
2. Select Size (e.g., S, M, L, XL)
3. Select Fabric (e.g., Cotton, Polyester)
4. Select Pattern (e.g., Solid, Striped)
5. Enter MRP and Sale Price
6. Enter Stock Quantity
7. **Click "Upload Image" button** ⬅️ THIS IS WHERE YOU ADD THE IMAGE!

### 4. Add Multiple Images
To add multiple images for the same product:
- Click "Add Color/Size Variation" button
- Add another variant with different color/size
- Upload a different image for this variant
- Repeat for as many images as you want

### 5. Save Product
Click "Save Product" button at the top right

## Example:
```
Product: "Premium Cotton T-Shirt"

Variant 1:
- Color: Black
- Size: M
- Image: black-tshirt-front.jpg ← Upload here

Variant 2:
- Color: Black
- Size: M
- Image: black-tshirt-back.jpg ← Upload here

Variant 3:
- Color: White
- Size: M
- Image: white-tshirt-front.jpg ← Upload here
```

## Result:
When users click the product on homepage:
- All 3 images will show in the gallery
- Users can browse through all images
- Images are fetched from database

## Image Requirements:
- Format: JPG, PNG, WEBP
- Recommended size: 1000x1000px or larger
- Max file size: 5MB per image

## Where Images Are Stored:
- Backend: `Back-end/uploads/products/`
- Database: `product_images` table
- Linked to: `product_variants` table

## Quick Access:
1. Open browser: http://localhost:5173/admin
2. Click "Add Product" in sidebar
3. Scroll to "Inventory Variants" section
4. Click "Upload Image" for each variant
5. Save!

All images will automatically appear when users click the product! 🎉
