#!/bin/bash

# Analytics Location Tracking Test Script
# This script helps test the location tracking functionality

echo "🔍 Analytics Location Tracking Test"
echo "===================================="
echo ""

# Check if server is running
if ! lsof -i :3000 >/dev/null 2>&1; then
    echo "❌ Next.js server is not running on port 3000"
    echo "   Please start the server with: pnpm dev"
    exit 1
fi

echo "✅ Server is running"
echo ""

# Test debug endpoint
echo "📍 Testing IP detection..."
curl -s http://localhost:3000/api/analytics/debug | jq '.' 2>/dev/null || {
    echo "   Note: Install jq for prettier output (brew install jq)"
    curl -s http://localhost:3000/api/analytics/debug
}
echo ""

# Test tracking endpoint
echo "📊 Testing analytics tracking..."
curl -s -X POST http://localhost:3000/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "page_view",
    "page": "/test",
    "metadata": {"test": true}
  }' | jq '.' 2>/dev/null || {
    curl -s -X POST http://localhost:3000/api/analytics/track \
      -H "Content-Type: application/json" \
      -d '{
        "eventType": "page_view",
        "page": "/test",
        "metadata": {"test": true}
      }'
}
echo ""

echo "✨ Test complete!"
echo ""
echo "📝 Notes:"
echo "   - Location tracking won't work for localhost IPs"
echo "   - Deploy to staging/production to see real location data"
echo "   - Check server logs for detailed debugging info"
echo "   - Visit /admin/analytics to view tracked data"
