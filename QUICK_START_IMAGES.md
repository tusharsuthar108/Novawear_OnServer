# Quick Start: Add Product Images

## Step-by-Step Guide

### Adding Images to a Product (Admin)

1. **Access Admin Panel**
   - Navigate to: `http://localhost:5173/admin/dashboard`
   - Click on "Product Management" or "Inventory"

2. **Find Your Product**
   - Use the search bar to find the product
   - Or scroll through the product list

3. **Click the Image Icon**
   - Look for the **green Image icon** in the Actions column
   - It's the first icon before View, Edit, and Delete buttons

4. **Select Product (if needed)**
   - If you see a dropdown, select the product from the list
   - Use the search box to filter products

5. **Upload Images**
   - Click "Click to upload images" or drag and drop
   - Select 4-5 images from your computer
   - You'll see previews of selected images

6. **Submit**
   - Click the "Upload X Images" button
   - Wait for success message
   - Click "Back" to return to product list

### Viewing Images (Customer)

1. **Go to Home Page**
   - Navigate to: `http://localhost:5173/`

2. **Click Any Product**
   - Click on any product card
   - You'll be taken to the product detail page

3. **View Image Gallery**
   - All product images are displayed in a 2-column grid
   - Hover over images to see zoom icon
   - Click any image to view fullscreen

4. **Navigate Images**
   - Use left/right arrow buttons
   - Or use keyboard arrow keys
   - Press ESC to exit fullscreen

## Component Locations

### Admin Components
- **Product List with Image Button:** `Front-end/src/components/admin/ProductList.jsx`
- **Add Images Interface:** `Front-end/src/components/admin/AddProductImages.jsx`

### Customer Components
- **Product Detail Page:** `Front-end/src/pages/ProductDetailsPage.jsx`
- **Image Gallery Display:** `Front-end/src/components/ProductDetails.jsx`

## Features

✅ Upload up to 5 images per product
✅ Search and select products easily
✅ Preview images before uploading
✅ Remove images before uploading
✅ Masonry grid layout (Pinterest-style)
✅ Fullscreen zoom view
✅ Keyboard navigation
✅ Image counter (1/5, 2/5, etc.)
✅ Responsive design

## Troubleshooting

**Images not showing?**
- Check if backend server is running on port 3000
- Verify images were uploaded successfully
- Check browser console for errors

**Can't upload images?**
- Ensure product has at least one variant
- Check file size (should be under 5MB)
- Verify file format (JPG, PNG, WebP)

**Upload button disabled?**
- Make sure you've selected a product
- Ensure at least one image is selected
- Check if you've exceeded 5 images limit
