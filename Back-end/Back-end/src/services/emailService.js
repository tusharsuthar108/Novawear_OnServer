const transporter = require('../config/email');

class EmailService {
  // Send welcome email
  static async sendWelcomeEmail(to, name) {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: 'Welcome to NovaWear!',
      html: `
        <h2>Welcome ${name}!</h2>
        <p>Thank you for joining NovaWear. We're excited to have you!</p>
      `
    };

    return await transporter.sendMail(mailOptions);
  }

  // Send order confirmation email
  static async sendOrderConfirmation(to, orderDetails) {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: `Order Confirmation - #${orderDetails.orderId}`,
      html: `
        <h2>Order Confirmed!</h2>
        <p>Your order #${orderDetails.orderId} has been confirmed.</p>
        <p>Total: $${orderDetails.total}</p>
      `
    };

    return await transporter.sendMail(mailOptions);
  }

  // Send OTP email for signup verification
  static async sendOTPEmail(to, otp) {
    console.log('📧 Preparing to send OTP email to:', to);
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: 'NovaWear - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Your OTP for NovaWear account verification is:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    console.log('📧 Mail options:', { ...mailOptions, html: '[HTML_CONTENT]' });
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent result:', result.messageId);
    return result;
  }

  // Send OTP email for login verification
  static async sendLoginOTPEmail(to, otp) {
    console.log('🔐 Preparing to send login OTP email to:', to);
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: 'NovaWear - Login Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Login Verification</h2>
          <p>Your OTP for NovaWear login verification is:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    console.log('🔐 Login mail options:', { ...mailOptions, html: '[HTML_CONTENT]' });
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Login email sent result:', result.messageId);
    return result;
  }

  // Generic email sender
  static async sendEmail(to, subject, html) {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html
    };

    return await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;