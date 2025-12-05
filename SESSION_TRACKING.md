# Session Tracking & User Journey Analytics

Comprehensive session tracking system to understand user behavior, navigation patterns, and engagement.

## 🎯 Features Implemented

### 1. **Session Management**
- Unique session ID generation (UUID v4)
- 30-minute session timeout
- Automatic session renewal on activity
- Session persistence using sessionStorage

### 2. **User Journey Tracking**
- Page-to-page transitions
- Entry and exit pages
- Previous page tracking
- Time spent on each page
- Complete session paths

### 3. **Session Metrics**
- **Total Sessions**: Count of unique user sessions
- **Average Session Duration**: How long users stay on site
- **Pages per Session**: Average number of pages viewed
- **Bounce Rate**: Percentage of single-page sessions
- **Time on Page**: Average engagement time per page

### 4. **Analytics Dashboard**
- Real-time session visualization
- Common user journey paths
- Entry/exit page analysis
- Sample session viewer
- Engagement metrics by page

## 📊 Key Metrics Explained

### Session Duration
The time between the first and last page view in a session. Helps understand overall engagement.

### Pages per Session
Average number of pages viewed in each session. Higher is generally better, indicating exploration.

### Bounce Rate
Percentage of sessions with only one page view. Lower bounce rate indicates engaging content.

### Entry Pages
First pages users see when arriving at your site. Important for first impressions.

### Exit Pages
Last pages before users leave. Can identify problematic pages or natural exit points.

### Page Transitions
Shows how users navigate between pages. Reveals natural user flows and navigation patterns.

## 🔧 Technical Implementation

### Files Created/Modified

1. **`/lib/hooks/useSession.ts`**
   - Session ID generation and management
   - Session timeout handling (30 minutes)
   - Page tracking utilities
   - Time calculation functions

2. **`/lib/models/Analytics.ts`**
   - Added session tracking fields:
     - `sessionId` (required, indexed)
     - `isNewSession` (boolean)
     - `isEntryPage` (boolean)
     - `isExitPage` (boolean)
     - `previousPage` (string)
     - `timeOnPage` (number in milliseconds)

3. **`/lib/hooks/useAnalytics.ts`**
   - Integrated session tracking
   - Automatic time-on-page calculation
   - Previous page tracking
   - Session data included in all events

4. **`/app/api/analytics/sessions/route.ts`**
   - Session metrics aggregation
   - Entry/exit page analysis
   - Page transition tracking
   - Sample session retrieval
   - Time-based analytics

5. **`/components/admin/UserJourneyVisualizer.tsx`**
   - Visual representation of sessions
   - Entry/exit page charts
   - User journey flow diagram
   - Engagement metrics display

6. **`/app/admin/sessions/page.tsx`**
   - Dedicated sessions dashboard
   - Time range selector (7/30/90 days)
   - Sample session viewer
   - Complete analytics overview

## 🚀 Usage

### Accessing Session Analytics

1. **Admin Dashboard**
   - Visit `/admin/sessions` to view complete session analytics
   - Or click the "User Sessions" link in the admin sidebar

2. **Time Range Selection**
   - Choose 7, 30, or 90 day views
   - Data updates automatically

### Understanding the Dashboard

#### Session Metrics Cards
- **Total Sessions**: Unique visitor sessions
- **Avg. Session Duration**: Time users spend on site
- **Pages per Session**: Average depth of exploration
- **Bounce Rate**: Single-page visit percentage

#### Entry Pages
Top pages where users first land on your site. Optimize these for:
- Fast loading
- Clear value proposition
- Engaging content
- Clear navigation

#### Exit Pages
Where users typically leave. Analyze these for:
- Content quality issues
- Missing calls-to-action
- Natural completion points (e.g., contact form success)

#### Common User Journeys
The most frequent page-to-page transitions showing:
- Natural navigation flows
- Popular content paths
- Where users go from landing pages
- Effective internal links

#### Sample Sessions
Real examples of complete user sessions showing:
- Full page sequences
- Session duration
- Page count
- Navigation patterns

## 📈 How to Use This Data

### 1. **Improve Navigation**
- Identify confusing navigation paths
- Add missing links between commonly sequential pages
- Optimize menu structure based on actual usage

### 2. **Reduce Bounce Rate**
- Focus on high-bounce entry pages
- Improve content relevance
- Add engaging calls-to-action
- Ensure fast page loads

### 3. **Content Strategy**
- Identify popular content paths
- Create more content similar to engaged pages
- Improve or remove low-engagement pages

### 4. **Conversion Optimization**
- Track paths to conversion events (contact forms, downloads)
- Identify drop-off points in funnels
- Optimize high-exit pages with CTAs

### 5. **User Experience**
- Find pages with low time-on-page (potential issues)
- Identify confusing flows
- Optimize frequently accessed page sequences

## 🔍 API Endpoints

### `GET /api/analytics/sessions?days=30`

Returns comprehensive session analytics including:
- Session metrics (total, duration, pages/session, bounce rate)
- Entry pages (top 10)
- Exit pages (top 10)
- Page transitions (top 20)
- Sample sessions (top 10 longest)
- Average time on pages (top 10)

**Query Parameters:**
- `days` (optional): Number of days to analyze (default: 30)

**Response Example:**
```json
{
  "success": true,
  "dateRange": {
    "start": "2025-11-04T...",
    "end": "2025-12-04T...",
    "days": 30
  },
  "sessionMetrics": {
    "totalSessions": 1250,
    "avgSessionDuration": 125,
    "avgPagesPerSession": 3.4,
    "bounceRate": 45.2
  },
  "entryPages": [...],
  "exitPages": [...],
  "pageTransitions": [...],
  "sampleSessions": [...],
  "avgTimeOnPages": [...]
}
```

## 🎨 Visualizations

### 1. **Session Metrics Cards**
Clean, at-a-glance metrics with icons and formatting

### 2. **Entry/Exit Bar Charts**
Progress bars showing relative frequencies

### 3. **Journey Flow Diagram**
Arrows showing page-to-page navigation with visit counts

### 4. **Engagement Table**
Average time on page with visit counts

### 5. **Sample Session Flows**
Horizontal flow showing actual user paths through the site

## 🔐 Privacy Considerations

- Session IDs are randomly generated UUIDs
- No personally identifiable information stored
- Session data stored in browser sessionStorage
- Cleared when browser closes
- Respects 30-minute timeout for accuracy

## 🚦 Session States

### New Session
- First visit or after 30-minute inactivity
- `isNewSession: true`
- No previous page
- First page marked as entry page

### Active Session
- Within 30 minutes of last activity
- Tracks page transitions
- Updates time-on-page
- Maintains session ID

### Expired Session
- After 30 minutes of inactivity
- Next visit creates new session
- Previous session marked complete

## 📱 Browser Support

Uses sessionStorage which is supported in:
- Chrome 5+
- Firefox 2+
- Safari 4+
- Edge 12+
- All modern mobile browsers

## 🔮 Future Enhancements

Potential additions:
- [ ] Real-time session viewer (live users)
- [ ] Cohort analysis (user retention over time)
- [ ] Funnel visualization for conversion paths
- [ ] Heatmap integration for click tracking
- [ ] A/B test analysis by session
- [ ] Custom event tracking in sessions
- [ ] Export session data to CSV
- [ ] Session replay functionality

## 🐛 Troubleshooting

### Sessions Not Tracking
1. Check browser console for errors
2. Verify sessionStorage is enabled
3. Check that middleware is running
4. Ensure Analytics model is updated

### Incorrect Session Duration
1. Verify timestamp is being tracked correctly
2. Check for timezone issues
3. Ensure pageEnter time is set

### Missing Page Transitions
1. Verify previousPage is being set
2. Check that navigation is being tracked
3. Ensure events are firing on page change

## 📝 Notes

- Session tracking works automatically once implemented
- No action needed from end users
- Data aggregates over time for better insights
- More data = better patterns and insights
- Combine with location data for geographic patterns
- Use with event tracking for complete picture

## 🎓 Best Practices

1. **Regular Monitoring**: Check session metrics weekly
2. **Baseline Metrics**: Establish normal ranges
3. **Trend Analysis**: Look for changes over time
4. **Actionable Insights**: Use data to drive decisions
5. **Iterative Improvement**: Test changes and measure impact

---

**Questions?** Check the API documentation or review the implementation files listed above.
