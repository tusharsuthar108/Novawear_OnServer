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

  // Send password reset email
  static async sendPasswordReset(to, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link expires in 1 hour.</p>
      `
    };

    return await transporter.sendMail(mailOptions);
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