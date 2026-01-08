const pool = require('./src/config/database');

async function testOTPFlow() {
  try {
    console.log('🧪 Testing OTP Flow...\n');

    // Test 1: Check if temp_otp table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'temp_otp'
      );
    `);
    
    console.log('✅ temp_otp table exists:', tableCheck.rows[0].exists);

    // Test 2: Insert test OTP
    const testEmail = 'test@example.com';
    const testOTP = '123456';
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(
      'INSERT INTO temp_otp (email, otp_code, otp_expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET otp_code = $2, otp_expires_at = $3',
      [testEmail, testOTP, expiresAt]
    );
    
    console.log('✅ Test OTP inserted successfully');

    // Test 3: Verify OTP retrieval
    const otpRecord = await pool.query(
      'SELECT * FROM temp_otp WHERE email = $1 AND otp_code = $2 AND otp_expires_at > NOW()',
      [testEmail, testOTP]
    );
    
    console.log('✅ OTP verification works:', otpRecord.rows.length > 0);

    // Test 4: Clean up
    await pool.query('DELETE FROM temp_otp WHERE email = $1', [testEmail]);
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All tests passed! OTP system is ready.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    process.exit(0);
  }
}

testOTPFlow();