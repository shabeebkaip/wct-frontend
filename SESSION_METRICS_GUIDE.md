# Session Analytics Metrics Guide 📊

> **For Non-Technical Users**: This guide explains what each metric means and how to interpret the session analytics charts.

---

## 📈 What is a Session?

A **session** is a single visit to your website by one user. It starts when they land on any page and ends when:
- They close the browser/tab
- They remain inactive for 30 minutes
- They leave your website

Think of it like a customer walking into a store, browsing around, and then leaving.

---

## 🎯 Key Metrics Explained

### 1. **Total Sessions**
- **What it is**: The total number of visits to your website
- **Why it matters**: More sessions = more people are visiting your site
- **Example**: 67 sessions means 67 different visits (could be same person multiple times or different people)

### 2. **Session Duration**
- **What it is**: Average time users spend on your website per visit
- **Why it matters**: Longer sessions usually mean users find your content engaging
- **Good vs Bad**: 
  - ✅ **Good**: 2-5 minutes (users are engaged)
  - ⚠️ **Normal**: 30 seconds - 2 minutes (browsing)
  - ❌ **Bad**: Under 10 seconds (users leaving immediately)
- **Previous Bug**: Was showing 564131 seconds (~156 hours) which was unrealistic - now fixed!

### 3. **Pages Per Session**
- **What it is**: Average number of pages users visit in one session
- **Why it matters**: More pages = users are exploring your website
- **Good vs Bad**:
  - ✅ **Great**: 5+ pages (highly engaged)
  - ✅ **Good**: 3-4 pages (interested)
  - ⚠️ **Normal**: 2 pages
  - ❌ **Bad**: 1 page (bounced immediately)

### 4. **Bounce Rate**
- **What it is**: Percentage of users who leave after viewing only ONE page
- **Why it matters**: High bounce rate means users aren't finding what they need
- **Good vs Bad**:
  - ✅ **Excellent**: Under 25%
  - ✅ **Good**: 25-40%
  - ⚠️ **Average**: 40-55%
  - ❌ **Poor**: Over 55%

---

## 📊 Understanding the Charts

### 🥧 **Session Quality Pie Chart**

Shows distribution of session types:

- **🟢 Engaged** (5+ pages): Highly interested users exploring your site thoroughly
- **🔵 Active** (3-4 pages): Users engaging with your content
- **🟡 Standard** (2 pages): Users checking a second page
- **🔴 Bounced** (1 page): Users left immediately

**What to look for**: You want more green and blue slices (engaged/active users)

---

### 📊 **Top Entry Pages (Horizontal Bar Chart)**

Shows which pages users **first land on** when visiting your site.

- **Why it matters**: These are your "front doors" - first impressions
- **What to do**: Make sure these pages are attractive and load quickly
- **Example**: If `/` (homepage) has the longest bar, most users enter through your homepage

---

### 📊 **Top Exit Pages (Horizontal Bar Chart)**

Shows which pages users are on when they **leave your website**.

- **Why it matters**: These are your "exit doors" - where you're losing people
- **Red flags**: 
  - If important pages (like contact or pricing) are top exits, there might be an issue
  - If these are "thank you" or confirmation pages, that's actually good!
- **What to do**: Investigate why users leave on these pages

---

### 📊 **Average Time on Page (Vertical Bar Chart)**

Shows how long users spend on each page on average.

- **Why it matters**: Longer time = users are reading/engaging with content
- **What to look for**:
  - Blog posts should have longer times (2-5 minutes)
  - Simple pages (contact form) should have shorter times (30 seconds - 1 minute)
- **Red flags**: Very short times (under 10 seconds) might mean:
  - Page loads slowly
  - Content isn't relevant
  - Users are lost/confused

---

## 🚶 User Journey Visualization

The journey flow shows the **path users take** through your website:

```
Home → About → Contact (20 users)
Home → Services → Quote (15 users)
```

- **Why it matters**: Understand the natural flow of user behavior
- **What to look for**: Are users reaching important pages (contact, quote, purchase)?
- **Optimization**: Make common paths easier to navigate

---

## ⏱️ Time Ranges

Use the time range buttons to analyze different periods:

- **Last 7 Days**: Quick health check, see immediate trends
- **Last 30 Days**: Monthly performance, identify patterns
- **Last 90 Days**: Long-term trends, seasonal behavior

---

## 🎯 Quick Action Items

Based on your metrics:

1. **If bounce rate is high (>55%)**:
   - Check page load speed
   - Improve content relevance
   - Make call-to-action clear

2. **If session duration is low (<1 minute)**:
   - Content might not be engaging
   - Page layout might be confusing
   - Add more internal links

3. **If pages per session is low (<2)**:
   - Navigation might be unclear
   - Add "related content" sections
   - Use clear call-to-action buttons

4. **If exit rate is high on important pages**:
   - Check for broken links
   - Ensure forms are working
   - Add persuasive content

---

## 🔧 Technical Notes

### Session Duration Calculation Fix
- **Previous issue**: Was calculating duration without sorting timestamps, causing unrealistic values like 564131s (~156 hours)
- **Fix applied**: 
  - Timestamps now sorted chronologically
  - Only counting multi-page sessions (2+ pages)
  - Maximum session duration capped at 30 minutes (to exclude overnight/stale sessions)
  - Only counting actual page_view events

### Data Accuracy
- Sessions with only 1 page don't have duration (counted as bounces)
- Sessions longer than 30 minutes are excluded (likely user left browser open)
- Location tracking works best with real IP addresses (not localhost)

---

## 📞 Need Help?

If metrics look unusual:
1. Check the time range - short ranges might have limited data
2. Verify analytics is tracking properly (check browser console)
3. Compare with previous periods to identify anomalies
4. Consider external factors (marketing campaigns, holidays, etc.)

---

**Last Updated**: December 2024  
**Version**: 2.0 (with fixed session duration calculation)
