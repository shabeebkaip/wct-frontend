import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: ['page_view', 'contact_form', 'brochure_download', 'project_view', 'solution_view', 'navigation_click', 'footer_click'],
  },
  page: {
    type: String,
    required: true,
  },
  referrer: String,
  userAgent: String,
  ipAddress: String,
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  // Session tracking
  isNewSession: {
    type: Boolean,
    default: false,
  },
  isEntryPage: {
    type: Boolean,
    default: false,
  },
  isExitPage: {
    type: Boolean,
    default: false,
  },
  previousPage: String,
  timeOnPage: Number, // Duration in milliseconds
  // Location data from IP
  location: {
    type: {
      country: String,
      countryCode: String,
      region: String,
      city: String,
      timezone: String,
      latitude: Number,
      longitude: Number,
    },
    required: false,
  },
  // Device & browser info
  device: {
    type: {
      deviceType: String, // mobile, tablet, desktop
      browser: String,
      os: String,
      screenResolution: String,
    },
    required: false,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
AnalyticsSchema.index({ timestamp: -1 });
AnalyticsSchema.index({ eventType: 1, timestamp: -1 });
AnalyticsSchema.index({ sessionId: 1, timestamp: 1 });
AnalyticsSchema.index({ ipAddress: 1, timestamp: -1 });

// Delete existing model to force recreation with new schema
if (mongoose.models.Analytics) {
  delete mongoose.models.Analytics;
}

export default mongoose.model('Analytics', AnalyticsSchema);
