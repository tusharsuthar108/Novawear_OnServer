const app = require('./src/app');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Test orders API: http://localhost:${PORT}/api/orders/all`);
});

// Test if route exists
console.log('\n📋 Registered routes:');
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`  ${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(`  ${Object.keys(handler.route.methods)} ${handler.route.path}`);
      }
    });
  }
});
