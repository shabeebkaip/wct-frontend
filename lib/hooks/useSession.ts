'use client';

// Session management for analytics tracking
const SESSION_STORAGE_KEY = 'wct_session_id';
const SESSION_START_KEY = 'wct_session_start';
const LAST_PAGE_KEY = 'wct_last_page';
const LAST_ACTIVITY_KEY = 'wct_last_activity';
const PAGE_ENTER_TIME_KEY = 'wct_page_enter';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Generate UUID v4
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Get or create session ID
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  const now = Date.now();
  const lastActivity = parseInt(sessionStorage.getItem(LAST_ACTIVITY_KEY) || '0');
  const existingSessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);

  // Check if session has timed out
  if (existingSessionId && lastActivity && now - lastActivity < SESSION_TIMEOUT) {
    // Update last activity
    sessionStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
    return existingSessionId;
  }

  // Create new session
  const newSessionId = generateUUID();
  sessionStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
  sessionStorage.setItem(SESSION_START_KEY, now.toString());
  sessionStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
  sessionStorage.removeItem(LAST_PAGE_KEY); // Clear previous page for new session

  return newSessionId;
}

// Check if this is a new session
export function isNewSession(): boolean {
  if (typeof window === 'undefined') return false;

  const sessionStart = sessionStorage.getItem(SESSION_START_KEY);
  const now = Date.now();

  // If session was just created (within last 5 seconds), it's new
  return sessionStart ? now - parseInt(sessionStart) < 5000 : true;
}

// Get previous page in session
export function getPreviousPage(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(LAST_PAGE_KEY);
}

// Set current page as last page
export function setLastPage(page: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(LAST_PAGE_KEY, page);
}

// Track page enter time
export function trackPageEnter(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(PAGE_ENTER_TIME_KEY, Date.now().toString());
}

// Calculate time on page
export function getTimeOnPage(): number {
  if (typeof window === 'undefined') return 0;

  const enterTime = sessionStorage.getItem(PAGE_ENTER_TIME_KEY);
  if (!enterTime) return 0;

  return Date.now() - parseInt(enterTime);
}

// Get session duration
export function getSessionDuration(): number {
  if (typeof window === 'undefined') return 0;

  const sessionStart = sessionStorage.getItem(SESSION_START_KEY);
  if (!sessionStart) return 0;

  return Date.now() - parseInt(sessionStart);
}

// Get session info
export interface SessionInfo {
  sessionId: string;
  isNewSession: boolean;
  previousPage: string | null;
  timeOnPage: number;
  sessionDuration: number;
}

export function getSessionInfo(): SessionInfo {
  return {
    sessionId: getSessionId(),
    isNewSession: isNewSession(),
    previousPage: getPreviousPage(),
    timeOnPage: getTimeOnPage(),
    sessionDuration: getSessionDuration(),
  };
}

// Mark session as ended (call this on beforeunload if needed)
export function endSession(): void {
  if (typeof window === 'undefined') return;
  
  // Keep session ID but mark as ended
  const sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (sessionId) {
    sessionStorage.setItem(`${SESSION_STORAGE_KEY}_ended`, Date.now().toString());
  }
}

// Clear session (for logout, etc.)
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  sessionStorage.removeItem(SESSION_START_KEY);
  sessionStorage.removeItem(LAST_PAGE_KEY);
  sessionStorage.removeItem(LAST_ACTIVITY_KEY);
  sessionStorage.removeItem(PAGE_ENTER_TIME_KEY);
}
