require('dotenv').config();
const EmailService = require('./src/services/emailService');

async function testEmail() {
  try {
    console.log('🧪 Testing email sending...');
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      from: process.env.SMTP_FROM
    });

    await EmailService.sendOTPEmail('test@example.com', '123456');
    console.log('✅ Email sent successfully!');
  } catch (error) {
    console.error('❌ Email failed:', error.message);
  }
  process.exit(0);
}

testEmail();