# Analytics Location Tracking

This document explains how location tracking works in the WCT Frontend analytics system.

## Overview

The analytics system automatically tracks visitor locations based on their IP addresses. This helps you understand where your visitors are coming from geographically.

## How It Works

### 1. IP Address Detection

When a visitor accesses the website, their IP address is captured using multiple methods:
- `x-client-ip` (set by our middleware)
- `cf-connecting-ip` (Cloudflare)
- `x-forwarded-for` (standard proxy header)
- `x-real-ip` (alternative proxy header)

The middleware (`/middleware.ts`) ensures consistent IP detection across all requests.

### 2. Location Lookup

For each unique IP address, the system looks up geographic information using:

**Primary API**: ipapi.co (Free tier: 1,000 requests/day)
- URL: `https://ipapi.co/{ip}/json/`
- No API key required
- Returns: country, city, region, timezone, coordinates

**Fallback API**: ip-api.com (Free tier: 45 requests/minute)
- URL: `http://ip-api.com/json/{ip}`
- Used if primary API fails or hits rate limits
- Returns: similar location data

### 3. Caching

To avoid hitting API rate limits and improve performance:
- Location data is cached in memory for 24 hours per IP
- Subsequent requests from the same IP use cached data
- Failed lookups are also cached to avoid repeated attempts

### 4. Local IP Handling

The system skips location lookup for:
- `localhost` and `127.0.0.1`
- Private IP ranges (`192.168.x.x`, `10.x.x.x`, `172.x.x.x`)
- Unknown IPs

## Deployment Considerations

### Development Environment
- Location tracking won't work for localhost
- You'll see "Unknown" for location in local development
- Use the debug endpoint to verify IP detection: `/api/analytics/debug`

### Production Environment
- Works automatically on Vercel, Netlify, etc.
- Cloudflare: Uses `cf-connecting-ip` for most accurate results
- Other hosts: Uses `x-forwarded-for` or `x-real-ip`

## Monitoring Location Data

### Admin Dashboard
The analytics admin page (`/admin/analytics`) shows:
- Location data in the "Recent Activity" table
- Percentage of events with location data in the header
- Individual city/country for each tracked event

### Debug Endpoint
Visit `/api/analytics/debug` to check:
- Detected IP address
- Whether it's a local/private IP
- All relevant headers
- Whether location tracking will work

## Troubleshooting

### No Location Data Showing

1. **Check if using localhost**: Location tracking is disabled for local IPs
   - Solution: Deploy to a staging environment to test

2. **API Rate Limits**: If you're seeing errors in console
   - Primary API: 1,000 requests/day limit
   - Fallback API: 45 requests/minute limit
   - Solution: Caching reduces API calls (already implemented)

3. **Network/Firewall Issues**: APIs might be blocked
   - Check browser console for fetch errors
   - Verify both `ipapi.co` and `ip-api.com` are accessible

4. **Header Forwarding**: IP headers not being passed
   - Check `/api/analytics/debug` output
   - Verify middleware is running
   - Check hosting platform configuration

### Location Shows as "Unknown"

This is normal for:
- Local development
- VPN users (sometimes)
- Privacy-focused users
- Invalid/private IP addresses

## API Response Example

Successful tracking response:
```json
{
  "success": true,
  "id": "abc123...",
  "debug": {
    "ipDetected": "203.0.113.42",
    "locationFetched": true,
    "isLocalhost": false
  }
}
```

## Privacy & GDPR Compliance

- IP addresses are stored but not displayed to visitors
- Location data is aggregated for analytics purposes
- Consider adding privacy policy and cookie consent
- Users can opt out via Do Not Track headers (future enhancement)

## Files Modified

- `/middleware.ts` - IP detection
- `/app/api/analytics/track/route.ts` - Location fetching with caching
- `/app/api/analytics/debug/route.ts` - Debug endpoint
- `/app/admin/analytics/page.tsx` - Display location data
- `/next.config.ts` - Header configuration

## Future Enhancements

- [ ] Redis cache for distributed deployments
- [ ] Database-backed cache for persistence
- [ ] Privacy mode toggle
- [ ] Custom geolocation API support
- [ ] EU/GDPR-compliant location services
