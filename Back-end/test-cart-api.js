const http = require('http');

console.log('🧪 Testing Cart API Endpoints...\n');

// Test 1: Add to cart
function testAddToCart() {
  return new Promise((resolve, reject) => {
    const testData = JSON.stringify({
      user_id: 1,
      variant_id: 1,
      quantity: 2
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/cart/add',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': testData.length
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log('✅ Add to Cart:', json.success ? 'SUCCESS' : 'FAILED');
          console.log('   Response:', JSON.stringify(json, null, 2));
          resolve(json);
        } catch (e) {
          console.log('❌ Add to Cart: FAILED - Invalid JSON response');
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.log('❌ Add to Cart: ERROR -', e.message);
      reject(e);
    });

    req.write(testData);
    req.end();
  });
}

// Test 2: Get cart
function testGetCart(userId) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000/api/cart/${userId}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log('\n✅ Get Cart:', json.success ? 'SUCCESS' : 'FAILED');
          console.log('   Items in cart:', json.data?.length || 0);
          if (json.data?.length > 0) {
            console.log('   Sample item:', JSON.stringify(json.data[0], null, 2));
          }
          resolve(json);
        } catch (e) {
          console.log('\n❌ Get Cart: FAILED - Invalid JSON response');
          reject(e);
        }
      });
    }).on('error', (e) => {
      console.log('\n❌ Get Cart: ERROR -', e.message);
      reject(e);
    });
  });
}

// Run tests
async function runTests() {
  try {
    await testAddToCart();
    await new Promise(resolve => setTimeout(resolve, 500));
    await testGetCart(1);
    console.log('\n✅ All cart tests completed!');
  } catch (error) {
    console.log('\n❌ Tests failed:', error.message);
  }
}

runTests();
