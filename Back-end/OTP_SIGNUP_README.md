# OTP-Based Signup Implementation

## Overview
This implementation provides a secure OTP-based email verification system for user signup. Users must verify their email before creating an account.

## Flow
1. **Email Entry**: User enters email address
2. **OTP Generation**: System generates 6-digit OTP and sends via email
3. **User Details**: User fills in personal information
4. **Password Setup**: User creates password
5. **Account Creation**: System verifies OTP and creates user account

## Database Tables Used

### temp_otp
- Stores temporary OTP codes for email verification
- OTP expires in 10 minutes
- Automatically cleaned up after successful verification

### users
- Final user account storage
- Only created after successful OTP verification
- Email is marked as verified (is_email_verified = true)

## API Endpoints

### POST /api/users/send-otp
- Sends OTP to user's email
- Body: `{ "email": "user@example.com" }`

### POST /api/users/verify-signup
- Verifies OTP and creates user account
- Body: `{ "email", "otp", "full_name", "phone", "password" }`

### POST /api/users/login
- User login after account creation
- Body: `{ "email", "password" }`

## Environment Variables Required
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

## Security Features
- OTP expires in 10 minutes
- Passwords are hashed using bcryptjs
- Email verification required before account creation
- Temporary OTP storage prevents permanent data exposure

## Testing
Run `node test-otp.js` to verify the database setup and OTP functionality.