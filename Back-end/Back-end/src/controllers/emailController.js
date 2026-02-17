const EmailService = require('../services/emailService');

class EmailController {
  // Send welcome email
  static async sendWelcome(req, res) {
    try {
      const { email, name } = req.body;
      
      await EmailService.sendWelcomeEmail(email, name);
      
      res.status(200).json({
        success: true,
        message: 'Welcome email sent successfully'
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send welcome email'
      });
    }
  }

  // Send order confirmation
  static async sendOrderConfirmation(req, res) {
    try {
      const { email, orderDetails } = req.body;
      
      await EmailService.sendOrderConfirmation(email, orderDetails);
      
      res.status(200).json({
        success: true,
        message: 'Order confirmation email sent successfully'
      });
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send order confirmation email'
      });
    }
  }

  // Send custom email
  static async sendCustomEmail(req, res) {
    try {
      const { to, subject, html } = req.body;
      
      await EmailService.sendEmail(to, subject, html);
      
      res.status(200).json({
        success: true,
        message: 'Email sent successfully'
      });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send email'
      });
    }
  }
}

module.exports = EmailController;