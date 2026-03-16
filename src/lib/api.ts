// API client for QuantumConnects
// Uses placeholder routes as specified

const BASE_URL = '';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(BASE_URL + url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Auth
export const authApi = {
  login: (data: { email: string; password: string }) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  signup: (data: { name: string; email: string; password: string; businessName: string; phone: string }) =>
    request('/api/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
};

// Dashboard
export const dashboardApi = {
  getOverview: () => request('/api/dashboard'),
};

// Calls
export const callsApi = {
  getAll: (params?: { search?: string; filter?: string }) => {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return request(`/api/calls${query}`);
  },
};

// Knowledge Base
export const knowledgeBaseApi = {
  getAll: () => request('/api/knowledge-base'),
  create: (data: { title: string; content: string; category: string }) =>
    request('/api/knowledge-base', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request(`/api/knowledge-base/${id}`, { method: 'DELETE' }),
};

// Billing
export const billingApi = {
  getInfo: () => request('/api/billing'),
  upgradePlan: (planId: string) =>
    request('/api/billing/upgrade', { method: 'POST', body: JSON.stringify({ planId }) }),
  cancelPlan: () =>
    request('/api/billing/cancel', { method: 'POST' }),
};

// Admin
export const adminApi = {
  getOverview: () => request('/api/admin/overview'),
  getUsers: () => request('/api/admin/users'),
  getSubscriptions: () => request('/api/admin/subscriptions'),
  getAnalytics: () => request('/api/admin/analytics'),
  updateUser: (id: string, data: Partial<{ name: string; status: string }>) =>
    request(`/api/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  suspendUser: (id: string) =>
    request(`/api/admin/users/${id}/suspend`, { method: 'POST' }),
};

// Mock data for UI development
export const mockData = {
  dashboard: {
    callsUsed: 127,
    callsRemaining: 73,
    currentPlan: 'Core',
    nextBillingDate: 'Apr 15, 2026',
    dailyCalls: [
      { date: 'Mon', calls: 12, bookings: 4 },
      { date: 'Tue', calls: 19, bookings: 7 },
      { date: 'Wed', calls: 15, bookings: 5 },
      { date: 'Thu', calls: 22, bookings: 9 },
      { date: 'Fri', calls: 28, bookings: 11 },
      { date: 'Sat', calls: 18, bookings: 6 },
      { date: 'Sun', calls: 13, bookings: 3 },
    ],
  },
  calls: [
    { id: '1', callerNumber: '+1 (555) 234-5678', date: 'Mar 15, 2026', time: '10:24 AM', duration: '3:42', sentiment: 'Positive', status: 'Completed', transcript: 'Customer inquired about appointment scheduling...' },
    { id: '2', callerNumber: '+1 (555) 876-5432', date: 'Mar 15, 2026', time: '11:10 AM', duration: '1:15', sentiment: 'Neutral', status: 'Escalated', transcript: 'Customer requested to speak with a human agent...' },
    { id: '3', callerNumber: '+1 (555) 345-6789', date: 'Mar 15, 2026', time: '2:05 PM', duration: '5:30', sentiment: 'Positive', status: 'Completed', transcript: 'Appointment booked for March 20th at 2:00 PM...' },
    { id: '4', callerNumber: '+1 (555) 901-2345', date: 'Mar 14, 2026', time: '9:45 AM', duration: '0:45', sentiment: 'Negative', status: 'Missed', transcript: 'Caller disconnected before AI could respond...' },
    { id: '5', callerNumber: '+1 (555) 678-9012', date: 'Mar 14, 2026', time: '3:30 PM', duration: '4:12', sentiment: 'Positive', status: 'Completed', transcript: 'Customer asked about pricing and services...' },
    { id: '6', callerNumber: '+1 (555) 456-7890', date: 'Mar 13, 2026', time: '1:20 PM', duration: '2:55', sentiment: 'Neutral', status: 'Completed', transcript: 'Follow-up call regarding previous appointment...' },
  ],
  knowledgeBase: [
    { id: '1', title: 'Business Hours', content: 'We are open Monday-Friday 9AM-6PM, Saturday 10AM-4PM.', category: 'General' },
    { id: '2', title: 'Appointment Policy', content: 'Appointments can be booked up to 30 days in advance. 24-hour cancellation required.', category: 'Appointments' },
    { id: '3', title: 'Service Pricing', content: 'Basic consultation starts at $99. Full service packages from $299.', category: 'Pricing' },
    { id: '4', title: 'Cancellation Policy', content: 'Full refund if cancelled 48+ hours in advance. 50% refund within 24-48 hours.', category: 'Policies' },
  ],
  adminOverview: {
    totalUsers: 1842,
    activeSubscriptions: 1204,
    monthlyRevenue: 48920,
    totalCalls: 94731,
    growth: { users: 12.4, revenue: 8.7, calls: 23.1 },
  },
  adminUsers: [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@acme.com', business: 'Acme Corp', plan: 'Pro', status: 'Active', calls: 450, joined: 'Jan 12, 2026' },
    { id: '2', name: 'Michael Chen', email: 'm.chen@techflow.io', business: 'TechFlow', plan: 'Core', status: 'Active', calls: 189, joined: 'Feb 3, 2026' },
    { id: '3', name: 'Emma Williams', email: 'emma@beauspa.com', business: 'Beau Spa', plan: 'Starter', status: 'Active', calls: 67, joined: 'Mar 1, 2026' },
    { id: '4', name: 'James Martinez', email: 'j.martinez@lawfirm.com', business: 'Martinez Law', plan: 'Scale', status: 'Suspended', calls: 1100, joined: 'Nov 20, 2025' },
    { id: '5', name: 'Lisa Thompson', email: 'lisa@dentalcare.com', business: 'DentalCare Plus', plan: 'Pro', status: 'Active', calls: 398, joined: 'Dec 5, 2025' },
  ],
  appointments: [
    { id: '1', caller: 'Sarah Johnson', date: 'Mar 20, 2026', time: '2:00 PM', type: 'Consultation', status: 'Confirmed' },
    { id: '2', caller: 'Mark Davis', date: 'Mar 21, 2026', time: '10:30 AM', type: 'Follow-up', status: 'Pending' },
    { id: '3', caller: 'Amy Wilson', date: 'Mar 22, 2026', time: '4:00 PM', type: 'Service', status: 'Confirmed' },
    { id: '4', caller: 'Robert Lee', date: 'Mar 18, 2026', time: '11:00 AM', type: 'Consultation', status: 'Completed' },
  ],
};
