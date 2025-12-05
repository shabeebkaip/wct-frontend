#!/bin/bash

# Session Tracking Test Script
# Tests the session tracking and user journey analytics

echo "🔍 Session Tracking & User Journey Test"
echo "========================================"
echo ""

# Check if server is running
if ! lsof -i :3000 >/dev/null 2>&1; then
    echo "❌ Next.js server is not running on port 3000"
    echo "   Please start the server with: pnpm dev"
    exit 1
fi

echo "✅ Server is running"
echo ""

# Test session analytics endpoint
echo "📊 Testing session analytics endpoint..."
curl -s "http://localhost:3000/api/analytics/sessions?days=7" | jq '.sessionMetrics' 2>/dev/null || {
    echo "   Note: Install jq for prettier output (brew install jq)"
    curl -s "http://localhost:3000/api/analytics/sessions?days=7" | head -50
}
echo ""

# Test tracking with session info
echo "🔄 Testing page view tracking with session..."
curl -s -X POST http://localhost:3000/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "page_view",
    "page": "/test-session",
    "session": {
      "sessionId": "test-session-id-123",
      "isNewSession": true,
      "previousPage": null,
      "timeOnPage": 0
    }
  }' | jq '.' 2>/dev/null || {
    curl -s -X POST http://localhost:3000/api/analytics/track \
      -H "Content-Type: application/json" \
      -d '{
        "eventType": "page_view",
        "page": "/test-session",
        "session": {
          "sessionId": "test-session-id-123",
          "isNewSession": true,
          "previousPage": null,
          "timeOnPage": 0
        }
      }'
}
echo ""

# Test page transition
echo "🔀 Testing page transition tracking..."
curl -s -X POST http://localhost:3000/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "page_view",
    "page": "/test-destination",
    "session": {
      "sessionId": "test-session-id-123",
      "isNewSession": false,
      "previousPage": "/test-session",
      "timeOnPage": 5000
    }
  }' | jq '.success' 2>/dev/null
echo ""

echo "✨ Test complete!"
echo ""
echo "📝 Next Steps:"
echo "   1. Visit the admin dashboard: http://localhost:3000/admin/sessions"
echo "   2. Navigate around your site to generate real session data"
echo "   3. Check the User Journey visualizations"
echo "   4. Review session metrics and page transitions"
echo ""
echo "📊 Key Features:"
echo "   • Session Duration Tracking"
echo "   • Pages per Session"
echo "   • Bounce Rate Calculation"
echo "   • Entry/Exit Page Analysis"
echo "   • User Journey Paths"
echo "   • Time on Page Metrics"
