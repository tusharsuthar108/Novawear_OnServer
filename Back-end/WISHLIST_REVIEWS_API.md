# Wishlist & Reviews API Documentation

## Base URLs
```
http://localhost:3000/api/wishlist
http://localhost:3000/api/reviews
```

---

## WISHLIST ENDPOINTS

### 1. Add to Wishlist
**POST** `/api/wishlist/add`

**Request Body:**
```json
{
  "user_id": 1,
  "product_id": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "wishlist_id": 1,
    "user_id": 1,
    "product_id": 5,
    "created_at": "2024-12-15T10:00:00Z"
  }
}
```

---

### 2. Get User Wishlist
**GET** `/api/wishlist/:userId`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "wishlist_id": 1,
      "product_id": 5,
      "product_name": "T-Shirt",
      "image_url": "https://example.com/image.jpg",
      "description": "Cotton T-Shirt",
      "brand_name": "Nike",
      "price": 2499.00,
      "discount_price": 1999.00,
      "created_at": "2024-12-15T10:00:00Z"
    }
  ]
}
```

---

### 3. Remove from Wishlist
**DELETE** `/api/wishlist/remove/:productId`

**Request Body:**
```json
{
  "user_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Removed from wishlist"
}
```

---

## REVIEWS ENDPOINTS

### 1. Create Review
**POST** `/api/reviews/create`

**Request Body:**
```json
{
  "user_id": 1,
  "product_id": 5,
  "rating": 5,
  "comment": "Great product! Highly recommended."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "review_id": 1,
    "user_id": 1,
    "product_id": 5,
    "rating": 5,
    "comment": "Great product! Highly recommended.",
    "created_at": "2024-12-15T10:00:00Z"
  }
}
```

---

### 2. Get Product Reviews
**GET** `/api/reviews/:productId`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "review_id": 1,
      "rating": 5,
      "comment": "Great product! Highly recommended.",
      "created_at": "2024-12-15T10:00:00Z",
      "user_name": "John Doe",
      "user_email": "john@example.com"
    }
  ]
}
```

---

### 3. Update Review
**PUT** `/api/reviews/:reviewId`

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated review comment"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "review_id": 1,
    "rating": 4,
    "comment": "Updated review comment",
    "updated_at": "2024-12-15T11:00:00Z"
  }
}
```

---

### 4. Delete Review
**DELETE** `/api/reviews/:reviewId`

**Response:**
```json
{
  "success": true,
  "message": "Review deleted"
}
```

---

## Database Setup
Run the schema file to create tables:
```bash
psql -U your_username -d your_database -f wishlist_reviews_schema.sql
```

## Notes
- Rating must be between 1 and 5
- Wishlist has unique constraint on (user_id, product_id)
- All timestamps are in UTC
