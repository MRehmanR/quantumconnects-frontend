const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type CallLogItem = {
  id: string;
  callerNumber: string;
  callerName: string;
  callerPhone: string;
  callerEmail: string;
  date: string;
  time: string;
  duration: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  status: "Completed" | "Escalated" | "Missed";
  transcript: string;
};

export type AppointmentItem = {
  id: string;
  caller: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  time: string;
  type: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled" | "NoShow";
  deposit?: {
    status: "None" | "Requested" | "Paid" | "Failed" | "Cancelled";
    requiredAmount: number;
    paidAmount: number;
    currency: string;
    paymentUrl: string;
    checkoutSessionId: string;
    requestedAt: string | null;
    paidAt: string | null;
  };
  notification?: {
    attempted: boolean;
    ok: boolean;
    status: number;
    message: string;
  };
};

export type DashboardOverviewData = {
  callsUsed: number;
  callsRemaining: number;
  totalRevenueGenerated: number;
  totalCallsAnswered: number;
  currentPlan: string;
  nextBillingDate: string;
  businessName: string;
  businessNumber: string;
  extractedKnowledgePreview: Array<{
    id: string;
    title: string;
    extractedAt: string;
    preview: string;
  }>;
  dailyCalls: Array<{ date: string; calls: number; bookings: number }>;
  dailyPerformance: Array<{ date: string; calls: number; bookings: number; revenue: number }>;
  recentCalls: CallLogItem[];
  appointments: AppointmentItem[];
};

export type DailySummaryData = {
  date: string;
  totalCalls: number;
  bookings: number;
  cancellations: number;
  escalations: number;
  noShows: number;
  kbQueries: number;
  revenueGenerated: number;
  generatedFor: string;
};

export type DailySummaryHistoryItem = DailySummaryData & {
  generatedAt: string;
};

export type ProfileData = {
  id: string;
  username: string;
  email: string;
  businessName: string;
  ownerPhone: string;
  inboundNumber: string;
  timezone: string;
  retellSipTerminationUri: string;
  retellSipTrunkAuthUsername: string;
  hasRetellSipTrunkAuthPassword: boolean;
  retellAgentId: string;
  provisioningStatus: "pending" | "in_progress" | "active" | "failed" | "manual_required";
  provisioningError: string;
  demoNumber?: {
    id: number;
    phoneNumber: string;
    status: "assigned" | "promoted" | "available" | "expired";
    expiresAt: string | null;
  } | null;
};

export type ProvisionNumberData = {
  userId: number;
  inboundNumber: string;
  twilioPhoneNumberSid: string;
  retellAgentId: string;
  provisioningStatus: "pending" | "in_progress" | "active" | "failed" | "manual_required";
  provisioningError: string;
  websiteKnowledgeBase?: {
    imported: boolean;
    source?: string;
    error?: string;
    skipped?: boolean;
    reason?: string;
  };
};

export type DemoNumberAssignment = {
  demoId: number;
  phoneNumber: string;
  expiresAt: string | null;
  status: "assigned" | "promoted" | "available" | "expired";
  provider: string;
  providerNumberId: string;
};

export type AvailableBusinessNumberItem = {
  phoneNumber: string;
  friendlyName: string;
  locality: string;
  region: string;
  isoCountry: string;
};

export type GeneratedRetellPromptData = {
  prompt: string;
  model: string;
};

export type KnowledgeBaseItem = {
  id: string;
  title: string;
  content: string;
  category: string;
  attachmentName: string;
  attachmentDataUrl: string;
};

export type FeatureToggleConfig = {
  callHandling: {
    appointmentBooking: { enabled: boolean };
    depositCollection: { enabled: boolean; amount: number; amountType: "fixed" | "percentage"; paymentWindowHours: number };
    waitlistManagement: { enabled: boolean };
    urgentCallRouting: { enabled: boolean; triggerKeywords: string[]; transferNumber: string };
    outOfHoursHandling: { enabled: boolean; openingHours: string };
    callRecording: { enabled: boolean };
    callTranscriptsEmailed: { enabled: boolean };
    callerIdCapture: { enabled: boolean };
  };
  customerCommunication: {
    googleReviewAutomation: { enabled: boolean };
    smsFollowUpAfterBooking: { enabled: boolean };
    appointmentReminderCalls: { enabled: boolean; hoursBefore: number };
    cancellationHandling: { enabled: boolean };
    reschedulingHandling: { enabled: boolean };
    callbackRequestOption: { enabled: boolean };
  };
  businessConfiguration: {
    customVoice: { enabled: boolean; mode: string };
    multiLanguageSupport: { enabled: boolean; languages: string[] };
    personalisedGreetingScript: { enabled: boolean; openingLine: string };
    staffNameMentions: { enabled: boolean; staffNames: string[] };
  };
  payments: {
    depositCollection: { enabled: boolean; configuredPerService: boolean };
    paymentConfirmationSms: { enabled: boolean };
    refundHandlingScript: { enabled: boolean };
  };
  reportingAndAlerts: {
    weeklyCallSummaryEmail: { enabled: boolean };
    usageAlert70Percent: { enabled: boolean; locked: boolean };
    realTimeMissedCallAlerts: { enabled: boolean };
    monthlyPerformanceReport: { enabled: boolean };
  };
};

export type BillingData = {
  currentPlan: { name: string; price: number; calls: number; current: boolean } | null;
  callsUsed: number;
  callsLimit: number;
  nextBillingDate: string;
  referralBonus: {
    minutes: number;
    expiresAt: string | null;
    referralCode: string;
  };
  plans: Array<{ name: string; price: number; calls: number; current: boolean }>;
  invoices: Array<{ id: string; date: string; amount: string; status: string }>;
};

export type ReferralUserItem = {
  id: string;
  name: string;
  email: string;
  businessName: string;
  plan: string;
  status: string;
  joinedAt: string;
  joinedVia: "link" | "code" | string;
  bonusAwardedMinutes: number;
  bonusExpiresAt: string | null;
};

export type ReferralOverviewData = {
  referralCode: string;
  referralBonusMinutes: number;
  referralBonusExpiresAt: string | null;
  referredUsers: ReferralUserItem[];
};

export type AdminOverviewData = {
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  totalCalls: number;
  growth: { users: number; revenue: number; calls: number };
  revenueData: Array<{ month: string; revenue: number }>;
};

export type AdminUserItem = {
  id: string;
  name: string;
  email: string;
  business: string;
  plan: string;
  status: string;
  calls: number;
  joined: string;
};

export type AdminSubscriptionsData = {
  summary: {
    totalSubscribers: number;
    monthlyRevenue: number;
    avgRevenuePerUser: number;
  };
  plans: Array<{ name: string; count: number; revenue: number; color: string }>;
};

export type AdminAnalyticsData = {
  callData: Array<{ month: string; calls: number }>;
  sentimentData: Array<{ name: string; value: number; color: string }>;
};

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const authToken = localStorage.getItem("qc_auth_token");
  const response = await fetch(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  let payload: ApiEnvelope<T> | T;
  try {
    payload = await response.json();
  } catch {
    payload = {} as T;
  }

  if (!response.ok) {
    const message = (payload as ApiEnvelope<T>).message || `${response.status} ${response.statusText}`;
    throw new Error(`API Error: ${message}`);
  }

  if (payload && typeof payload === "object" && "data" in (payload as ApiEnvelope<T>)) {
    return (payload as ApiEnvelope<T>).data;
  }

  return payload as T;
}

const getOwnerContext = () => ({
  tenantEmail: localStorage.getItem("qc_user_email") || "",
  ownerPhone: localStorage.getItem("qc_owner_phone") || "",
  dialedNumber: localStorage.getItem("qc_inbound_number") || "",
});

export const authApi = {
  login: (data: { email: string; password: string }) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
  signup: (data: {
    name: string;
    email: string;
    password: string;
    businessName: string;
    phone?: string;
    country?: string;
    referralCode?: string;
    referralMethod?: string;
  }) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.name,
        email: data.email,
        password: data.password,
        businessName: data.businessName,
        ownerPhone: data.phone || "",
        country: data.country,
        countryCode: data.country,
        referralCode: data.referralCode,
        referralMethod: data.referralMethod,
      }),
    }),
  getAvailableBusinessNumbers: (params?: { country?: string; areaCode?: string; contains?: string; limit?: number }) => {
    const safeParams: Record<string, string> = {};
    if (params?.country) safeParams.country = params.country;
    if (params?.areaCode) safeParams.areaCode = params.areaCode;
    if (params?.contains) safeParams.contains = params.contains;
    if (typeof params?.limit === "number") safeParams.limit = String(params.limit);
    const query = Object.keys(safeParams).length > 0 ? `?${new URLSearchParams(safeParams).toString()}` : "";
    return request<AvailableBusinessNumberItem[]>(`/api/auth/available-numbers${query}`);
  },
  provisionBusinessNumber: (data?: { phoneNumber?: string; country?: string; areaCode?: string; customPrompt?: string; websiteUrl?: string }) =>
    request<ProvisionNumberData>("/api/auth/provision-number", { method: "POST", body: JSON.stringify(data || {}) }),
  provisionRetellVoiceAgent: (data?: { force?: boolean; customPrompt?: string }) =>
    request<ProvisionNumberData>("/api/auth/provision-retell-agent", { method: "POST", body: JSON.stringify(data || {}) }),
  generateRetellPrompt: (data?: { businessName?: string; ownerName?: string; ownerPhone?: string; userInstructions?: string }) =>
    request<GeneratedRetellPromptData>("/api/auth/generate-retell-prompt", { method: "POST", body: JSON.stringify(data || {}) }),
  importWebsiteKnowledge: (data: { websiteUrl: string }) =>
    request<{ imported: boolean; source?: string; error?: string; skipped?: boolean; reason?: string }>(
      "/api/auth/import-website-knowledge",
      { method: "POST", body: JSON.stringify(data) }
    ),
};

export const numbersApi = {
  assignDemoNumber: (data?: { region?: string; voicePreferences?: Record<string, any>; ttlHours?: number }) =>
    request<DemoNumberAssignment>("/api/auth/assign-demo", { method: "POST", body: JSON.stringify(data || {}) }),
  promoteDemoNumber: (data: { demoId: number; paymentId?: string }) =>
    request<DemoNumberAssignment>("/api/numbers/promote", { method: "POST", body: JSON.stringify(data) }),
  getActiveDemoNumber: () => request<DemoNumberAssignment | null>("/api/auth/active-demo"),
};

export type AiReceptionistScheduleRow = {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
};

export type AiReceptionistConfigData = {
  name: string;
  voice: string;
  customGreeting: string;
  status: "live" | "paused" | "scheduled";
  scheduleMode: "always_on" | "custom";
  weeklySchedule: AiReceptionistScheduleRow[];
  faqActiveMap: Record<string, boolean>;
  bookingRules: Record<string, any>;
  isActiveNow: boolean;
  timezone: string;
};

export const dashboardApi = {
  getOverview: (params?: { range?: "weekly" | "monthly" | "custom"; startDate?: string; endDate?: string }) => {
    const query = new URLSearchParams();
    if (params?.range) query.set("range", params.range);
    if (params?.startDate) query.set("startDate", params.startDate);
    if (params?.endDate) query.set("endDate", params.endDate);
    const suffix = query.toString() ? `?${query.toString()}` : "";
    return request<DashboardOverviewData>(`/api/dashboard${suffix}`);
  },
};

export const profileApi = {
  get: () => request<ProfileData>("/api/profile"),
  update: (data: {
    username: string;
    email: string;
    businessName: string;
    ownerPhone: string;
    inboundNumber?: string;
    timezone: string;
    retellSipTerminationUri?: string;
    retellSipTrunkAuthUsername?: string;
    retellSipTrunkAuthPassword?: string;
  }) => request<ProfileData>("/api/profile", { method: "PUT", body: JSON.stringify(data) }),
};

export const callsApi = {
  getAll: (params?: { search?: string; filter?: string }) => {
    const safeParams: Record<string, string> = {};
    if (params?.search && params.search !== "undefined") {
      safeParams.search = params.search;
    }
    if (params?.filter && params.filter !== "undefined") {
      safeParams.filter = params.filter;
    }
    const query = Object.keys(safeParams).length > 0 ? `?${new URLSearchParams(safeParams).toString()}` : "";
    return request<CallLogItem[]>(`/api/calls${query}`);
  },
};

export const knowledgeBaseApi = {
  getAll: () => request<KnowledgeBaseItem[]>("/api/knowledge-base"),
  create: (data: { title: string; content: string; category: string; attachmentName?: string; attachmentDataUrl?: string }) =>
    request<KnowledgeBaseItem>("/api/knowledge-base", { method: "POST", body: JSON.stringify(data) }),
  delete: (id: string) => request(`/api/knowledge-base/${id}`, { method: "DELETE" }),
};

export const appointmentsApi = {
  getAll: () => request<AppointmentItem[]>("/api/appointments"),
  create: (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    date: string;
    time: string;
    type: string;
  }) =>
    request<AppointmentItem>("/api/appointments", {
      method: "POST",
      body: JSON.stringify({ ...data, ...getOwnerContext() }),
    }),
  cancel: (id: string, reason?: string) =>
    request<AppointmentItem>(`/api/appointments/${id}/cancel`, {
      method: "PATCH",
      body: JSON.stringify({ reason: reason || "manual_cancel_from_dashboard", ...getOwnerContext() }),
    }),
  updateStatus: (id: string, status: AppointmentItem["status"]) =>
    request<AppointmentItem>(`/api/appointments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, ...getOwnerContext() }),
    }),
  createDepositLink: (
    id: string,
    data: { amount?: number; totalAmount?: number; percentage?: number; currency?: string }
  ) =>
    request<{
      appointmentId: string;
      amount: number;
      currency: string;
      paymentUrl: string;
      checkoutSessionId: string;
      status: string;
    }>(`/api/appointments/${id}/deposit-link`, {
      method: "POST",
      body: JSON.stringify({ ...data, ...getOwnerContext() }),
    }),
  refreshDepositStatus: (id: string) =>
    request<{
      appointmentId: string;
      status: string;
      paymentStatus: string;
      deposit: NonNullable<AppointmentItem["deposit"]>;
    }>(`/api/appointments/${id}/deposit-status/refresh`, {
      method: "POST",
      body: JSON.stringify({ ...getOwnerContext() }),
    }),
};

export const summaryApi = {
  generateDaily: (targetDate?: string) =>
    request<DailySummaryData>("/api/summary/daily", {
      method: "POST",
      body: JSON.stringify(targetDate ? { targetDate } : {}),
    }),
  getHistory: (params?: { date?: string; startDate?: string; endDate?: string; limit?: number }) => {
    const safeParams: Record<string, string> = {};
    if (params?.date) safeParams.date = params.date;
    if (params?.startDate) safeParams.startDate = params.startDate;
    if (params?.endDate) safeParams.endDate = params.endDate;
    if (typeof params?.limit === "number") safeParams.limit = String(params.limit);
    const query = Object.keys(safeParams).length > 0 ? `?${new URLSearchParams(safeParams).toString()}` : "";
    return request<DailySummaryHistoryItem[]>(`/api/summary/daily/history${query}`);
  },
};

export const featureTogglesApi = {
  get: () => request<FeatureToggleConfig>("/api/feature-toggles"),
  update: (config: FeatureToggleConfig) =>
    request<FeatureToggleConfig>("/api/feature-toggles", { method: "PUT", body: JSON.stringify(config) }),
};

export const aiReceptionistApi = {
  getConfig: () => request<AiReceptionistConfigData>("/api/ai-receptionist/config"),
  updateConfig: (payload: Partial<AiReceptionistConfigData>) =>
    request<AiReceptionistConfigData>("/api/ai-receptionist/config", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};

export const billingApi = {
  getInfo: (email?: string) => request<BillingData>(`/api/billing${email ? `?email=${encodeURIComponent(email)}` : ""}`),
  purchase: (data: { email?: string; planName: string }) =>
    request<{ plan: string; invoiceId: string; referralAwarded: boolean; referralBonusMinutes: number; referralBonusExpiresAt: string | null }>("/api/billing/purchase", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  createCheckoutSession: (data: { email?: string; planName: string }) =>
    request<{ mode: "stripe" | "free"; url: string; sessionId: string; plan?: string; invoiceId?: string }>("/api/billing/checkout/session", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  confirmCheckoutSession: (data: { email?: string; sessionId: string }) =>
    request<{ plan: string; invoiceId: string; sessionId: string; paymentStatus: string }>("/api/billing/checkout/confirm", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getPaymentMethodUpdateUrl: (email?: string) =>
    request<{ url: string; provider: "portal" | "unavailable"; message?: string }>(
      `/api/billing/payment-method/update-url${email ? `?email=${encodeURIComponent(email)}` : ""}`
    ),
};

export const referralsApi = {
  getOverview: (email?: string) =>
    request<ReferralOverviewData>(`/api/referrals${email ? `?email=${encodeURIComponent(email)}` : ""}`),
};

export const adminApi = {
  getOverview: () => request<AdminOverviewData>("/api/admin/overview"),
  getUsers: () => request<AdminUserItem[]>("/api/admin/users"),
  getSubscriptions: () => request<AdminSubscriptionsData>("/api/admin/subscriptions"),
  getAnalytics: () => request<AdminAnalyticsData>("/api/admin/analytics"),
};
