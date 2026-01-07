const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const EmailService = require('../services/emailService');

class UserController {
  // Generate 6-digit OTP
  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP for signup verification
  static async sendSignupOTP(req, res) {
    try {
      console.log('📧 Send OTP request received:', req.body);
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Check if user already exists
      const existingUser = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      // Generate OTP
      const otp = UserController.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      console.log('🔢 Generated OTP:', otp, 'for email:', email);

      // Store OTP in temp_otp table
      await pool.query(
        'INSERT INTO temp_otp (email, otp_code, otp_expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET otp_code = $2, otp_expires_at = $3, created_at = CURRENT_TIMESTAMP',
        [email, otp, expiresAt]
      );
      console.log('💾 OTP stored in database');

      // Send OTP via email
      try {
        await EmailService.sendOTPEmail(email, otp);
        console.log('✅ OTP email sent successfully');
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        return res.status(500).json({ error: 'Failed to send OTP email: ' + emailError.message });
      }

      res.status(200).json({ 
        message: 'OTP sent successfully to your email',
        email: email
      });

    } catch (error) {
      console.error('Send OTP error:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  }

  // Verify OTP and complete signup
  static async verifyOTPAndSignup(req, res) {
    try {
      const { email, otp, full_name, phone, password } = req.body;

      // Validate required fields
      if (!email || !otp || !full_name || !phone || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Verify OTP
      const otpRecord = await pool.query(
        'SELECT * FROM temp_otp WHERE email = $1 AND otp_code = $2 AND otp_expires_at > NOW()',
        [email, otp]
      );

      if (otpRecord.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }

      // Check if user already exists
      const existingUser = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Ensure roles exist
      await pool.query('INSERT INTO roles (role_name) VALUES ($1), ($2) ON CONFLICT (role_name) DO NOTHING', ['CUSTOMER', 'ADMIN']);

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create user account
      const newUser = await pool.query(
        'INSERT INTO users (full_name, email, phone, password_hash, is_email_verified) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, full_name, email, phone, is_email_verified, created_at',
        [full_name, email, phone, passwordHash, true]
      );

      const userId = newUser.rows[0].user_id;

      // Assign default CUSTOMER role
      await pool.query(
        'INSERT INTO user_roles (user_id, role_id) SELECT $1, role_id FROM roles WHERE role_name = $2',
        [userId, 'CUSTOMER']
      );

      // Delete OTP record
      await pool.query('DELETE FROM temp_otp WHERE email = $1', [email]);

      // Send welcome email
      await EmailService.sendWelcomeEmail(email, full_name);

      res.status(201).json({
        message: 'Account created successfully',
        user: newUser.rows[0]
      });

    } catch (error) {
      console.error('Signup error:', error);
      if (error.code === '23505') {
        // Check if it's email constraint violation
        if (error.constraint && error.constraint.includes('email')) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(400).json({ error: 'Account creation failed' });
      }
      res.status(500).json({ error: 'Failed to create account' });
    }
  }

  // Send OTP for login verification
  static async sendLoginOTP(req, res) {
    try {
      console.log('🔐 Login OTP request received:', req.body);
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Check if user exists
      const existingUser = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length === 0) {
        return res.status(400).json({ error: 'No account found with this email' });
      }

      // Generate OTP
      const otp = UserController.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      console.log('🔢 Generated login OTP:', otp, 'for email:', email);

      // Store OTP in temp_otp table
      await pool.query(
        'INSERT INTO temp_otp (email, otp_code, otp_expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET otp_code = $2, otp_expires_at = $3, created_at = CURRENT_TIMESTAMP',
        [email, otp, expiresAt]
      );
      console.log('💾 Login OTP stored in database');

      // Send OTP via email
      try {
        await EmailService.sendLoginOTPEmail(email, otp);
        console.log('✅ Login OTP email sent successfully');
      } catch (emailError) {
        console.error('❌ Login email sending failed:', emailError);
        return res.status(500).json({ error: 'Failed to send OTP email: ' + emailError.message });
      }

      res.status(200).json({ 
        message: 'Login OTP sent successfully to your email',
        email: email
      });

    } catch (error) {
      console.error('Send login OTP error:', error);
      res.status(500).json({ error: 'Failed to send login OTP' });
    }
  }

  // Verify OTP and login
  static async verifyLoginOTP(req, res) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
      }

      // Verify OTP
      const otpRecord = await pool.query(
        'SELECT * FROM temp_otp WHERE email = $1 AND otp_code = $2 AND otp_expires_at > NOW()',
        [email, otp]
      );

      if (otpRecord.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }

      // Get user details with role
      const user = await pool.query(
        `SELECT u.*, r.role_name 
         FROM users u 
         LEFT JOIN user_roles ur ON u.user_id = ur.user_id 
         LEFT JOIN roles r ON ur.role_id = r.role_id 
         WHERE u.email = $1`,
        [email]
      );
      
      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Delete OTP record
      await pool.query('DELETE FROM temp_otp WHERE email = $1', [email]);

      // Remove password from response
      const { password_hash, ...userWithoutPassword } = user.rows[0];

      res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Login OTP verification error:', error);
      res.status(500).json({ error: 'Login verification failed' });
    }
  }

  // Login with password
  static async loginWithPassword(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Get user details with role
      const user = await pool.query(
        `SELECT u.*, r.role_name 
         FROM users u 
         LEFT JOIN user_roles ur ON u.user_id = ur.user_id 
         LEFT JOIN roles r ON ur.role_id = r.role_id 
         WHERE u.email = $1`,
        [email]
      );
      
      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.rows[0].password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Remove password from response
      const { password_hash, ...userWithoutPassword } = user.rows[0];

      res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Password login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
}

module.exports = UserController;