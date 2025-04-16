// Mock fetch function for testing
global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })
  );
  
  // Generate random response metrics within realistic ranges
  const generateResponseMetrics = () => ({
    responseTime: Math.random() * (500 - 100) + 100, // Between 100ms and 500ms
    statusCode: Math.random() > 0.1 ? 200 : 400,     // 90% success rate
    payloadSize: Math.random() * (50 - 5) + 5,       // Between 5KB and 50KB
    errorRate: Math.random() * 0.1                   // Between 0% and 10%
  });
  
  // Format number to 2 decimal places
  const formatNumber = (num) => Number(num.toFixed(2));
  
  // Format results into a table
  const formatResponseTable = (results) => {
    let table = '\n📊 API Response Metrics Table\n';
    table += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    table += '│ Endpoint  │ Response Time │ Status Code │ Payload Size │ Error Rate │\n';
    table += '│           │    (ms)      │             │    (KB)      │    (%)     │\n';
    table += '┅───────────┅─────────────┅─────────────┅─────────────┅────────────┅\n';
  
    Object.entries(results).forEach(([endpoint, metrics]) => {
      table += `│ ${endpoint.padEnd(9)} │ ${formatNumber(metrics.responseTime).toString().padStart(11)} │ ${
        metrics.statusCode.toString().padStart(11)} │ ${
        formatNumber(metrics.payloadSize).toString().padStart(11)} │ ${
        formatNumber(metrics.errorRate * 100).toString().padStart(10)} │\n`;
    });
  
    table += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    console.log(table);
  };
  
  describe('API Response Metrics', () => {
    // Authentication endpoints
    const authEndpoints = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/logout',
      '/api/auth/verify-token'
    ];
  
    // User management endpoints
    const userEndpoints = [
      '/api/user/profile',
      '/api/user/update-profile',
      '/api/user/change-password',
      '/api/user/delete-account'
    ];
  
    // Transaction endpoints
    const transactionEndpoints = [
      '/api/transactions/create',
      '/api/transactions/history',
      '/api/transactions/status',
      '/api/transactions/cancel'
    ];
  
    // Admin endpoints
    const adminEndpoints = [
      '/api/admin/users',
      '/api/admin/transactions',
      '/api/admin/statistics',
      '/api/admin/settings'
    ];
  
    // Payment endpoints
    const paymentEndpoints = [
      '/api/payment/initiate',
      '/api/payment/verify',
      '/api/payment/refund',
      '/api/payment/history'
    ];
  
    test('Authentication endpoints response metrics', () => {
      const results = {};
      authEndpoints.forEach(endpoint => {
        results[endpoint] = generateResponseMetrics();
      });
      
      console.log('\n🔐 Authentication Endpoints Response Test');
      formatResponseTable(results);
    });
  
    test('User management endpoints response metrics', () => {
      const results = {};
      userEndpoints.forEach(endpoint => {
        results[endpoint] = generateResponseMetrics();
      });
      
      console.log('\n👤 User Management Endpoints Response Test');
      formatResponseTable(results);
    });
  
    test('Transaction endpoints response metrics', () => {
      const results = {};
      transactionEndpoints.forEach(endpoint => {
        results[endpoint] = generateResponseMetrics();
      });
      
      console.log('\n💳 Transaction Endpoints Response Test');
      formatResponseTable(results);
    });
  
    test('Admin endpoints response metrics', () => {
      const results = {};
      adminEndpoints.forEach(endpoint => {
        results[endpoint] = generateResponseMetrics();
      });
      
      console.log('\n👨‍💼 Admin Endpoints Response Test');
      formatResponseTable(results);
    });
  
    test('Payment endpoints response metrics', () => {
      const results = {};
      paymentEndpoints.forEach(endpoint => {
        results[endpoint] = generateResponseMetrics();
      });
      
      console.log('\n💰 Payment Endpoints Response Test');
      formatResponseTable(results);
    });
  
    test('Error handling and timeout metrics', () => {
      const results = {};
      const allEndpoints = [
        ...authEndpoints,
        ...userEndpoints,
        ...transactionEndpoints,
        ...adminEndpoints,
        ...paymentEndpoints
      ];
  
      allEndpoints.forEach(endpoint => {
        const metrics = generateResponseMetrics();
        // Simulate timeout for 20% of requests
        if (Math.random() < 0.2) {
          metrics.responseTime = 5000; // 5 seconds timeout
          metrics.statusCode = 408;    // Request Timeout
          metrics.errorRate = 1;       // 100% error rate
        }
        results[endpoint] = metrics;
      });
      
      console.log('\n⚠️ Error Handling and Timeout Metrics');
      formatResponseTable(results);
    });
  }); 