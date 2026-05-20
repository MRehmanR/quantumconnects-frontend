import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneOff, Calendar, CreditCard, TrendingUp, ArrowUpRight, Building2, BookOpenText, BadgeDollarSign } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { dashboardApi, summaryApi, type DashboardOverviewData, type DailySummaryData, type DailySummaryHistoryItem } from "@/lib/api";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockDailyPerformance: DashboardOverviewData["dailyPerformance"] = [
  { date: "Mon", calls: 12, bookings: 4, revenue: 180 },
  { date: "Tue", calls: 18, bookings: 6, revenue: 320 },
  { date: "Wed", calls: 15, bookings: 5, revenue: 240 },
  { date: "Thu", calls: 23, bookings: 8, revenue: 410 },
  { date: "Fri", calls: 20, bookings: 7, revenue: 360 },
  { date: "Sat", calls: 14, bookings: 4, revenue: 190 },
  { date: "Sun", calls: 10, bookings: 3, revenue: 120 },
];

function StatCard({ stat, i }: { stat: { label: string; value: string | number; icon: React.ElementType; iconBg: string; iconColor: string; delta: string; trend: string }; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08 }}
      className="card-surface p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
          <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
        </div>
        {stat.trend === "up" && <TrendingUp className="h-4 w-4 text-accent" />}
      </div>
      <div className="text-2xl font-bold text-foreground tracking-tight mb-1">
        {stat.value}
      </div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
      <div className={`mt-2 text-xs font-medium ${stat.trend === "up" ? "text-accent" : "text-muted-foreground"}`}>
        {stat.delta}
      </div>
    </motion.div>
  );
}

export default function DashboardOverview() {
  const now = new Date();
  const todayDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const [overview, setOverview] = useState<DashboardOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<DailySummaryData | null>(null);
  const [summaryHistory, setSummaryHistory] = useState<DailySummaryHistoryItem[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [summaryDate, setSummaryDate] = useState(todayDate);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await dashboardApi.getOverview();
        setOverview(data);
        localStorage.setItem("qc_calls_used", String(data.callsUsed || 0));
        localStorage.setItem("qc_calls_limit", String((data.callsUsed || 0) + (data.callsRemaining || 0)));
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        const history = await summaryApi.getHistory({ limit: 30 });
        setSummaryHistory(history || []);
      } catch {
        setSummaryHistory([]);
      }
    };

    run();
  }, []);

  const handleGenerateSummary = async () => {
    if (summaryDate > todayDate) {
      setSummaryError("You can generate summaries for today or any previous date only.");
      return;
    }

    setSummaryLoading(true);
    setSummaryError("");
    try {
      const data = await summaryApi.generateDaily(summaryDate || undefined);
      setSummary(data);
      const history = await summaryApi.getHistory({ limit: 30 });
      setSummaryHistory(history || []);
    } catch (error: any) {
      setSummaryError(error?.message || "Failed to generate summary");
    } finally {
      setSummaryLoading(false);
    }
  };

  const callsLimit = (overview?.callsUsed || 0) + (overview?.callsRemaining || 0) || 1;
  const usagePercent = Math.round(((overview?.callsUsed || 0) / callsLimit) * 100);
  const performanceData = (overview?.dailyPerformance || []).length > 0
    ? overview?.dailyPerformance || []
    : mockDailyPerformance;

  const stats = useMemo(
    () => [
      {
        label: "Minutes Remaining",
        value: overview?.callsRemaining ?? 0,
        icon: PhoneOff,
        iconBg: "bg-muted",
        iconColor: "text-muted-foreground",
        delta: `${Math.round(((overview?.callsRemaining || 0) / callsLimit) * 100)}% of plan`,
        trend: "neutral",
      },
      {
        label: "Total Revenue Generated",
        value: `GBP ${(overview?.totalRevenueGenerated ?? 0).toFixed(2)}`,
        icon: BadgeDollarSign,
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        delta: "From paid deposits",
        trend: "up",
      },
      {
        label: "Total Calls Answered",
        value: overview?.totalCallsAnswered ?? 0,
        icon: Phone,
        iconBg: "bg-accent/10",
        iconColor: "text-accent",
        delta: "Completed calls",
        trend: "up",
      },
      {
        label: "Current Plan",
        value: overview?.currentPlan || "-",
        icon: CreditCard,
        iconBg: "bg-muted",
        iconColor: "text-muted-foreground",
        delta: `Next billing ${overview?.nextBillingDate || "-"}`,
        trend: "neutral",
      },
    ],
    [overview, callsLimit]
  );

  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto space-y-6">
        {loading && <p className="text-sm text-muted-foreground">Loading dashboard data...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} i={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-2 card-surface p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Performance Overview</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Daily calls, bookings, and revenue trend</p>
              </div>
              <span className="status-badge status-active">This week</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 100%)",
                    border: "1px solid hsl(214 32% 91%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="calls" name="Calls" fill="hsl(239 84% 67%)" radius={[4, 4, 0, 0]} barSize={18} />
                <Bar dataKey="bookings" name="Bookings" fill="hsl(160 84% 39% / 0.7)" radius={[4, 4, 0, 0]} barSize={18} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue (GBP)" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-surface p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Recent Calls</h3>
            <div className="space-y-3">
              {(overview?.recentCalls || []).map((call) => (
                <div key={call.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-[10px] font-semibold ${
                      call.status === "Completed" ? "bg-accent/10 text-accent" :
                      call.status === "Escalated" ? "bg-destructive/10 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      <Phone className="h-3 w-3" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{call.callerNumber}</p>
                      <p className="text-xs text-muted-foreground">{call.time}</p>
                    </div>
                  </div>
                  <span className={`status-badge flex-shrink-0 ${
                    call.status === "Completed" ? "status-completed" :
                    call.status === "Escalated" ? "status-escalated" :
                    "status-missed"
                  }`}>
                    {call.status}
                  </span>
                </div>
              ))}
            </div>
            <Link to="/dashboard/calls" className="mt-4 flex items-center gap-1 text-xs text-primary hover:underline font-medium">
              View all calls <ArrowUpRight className="h-3 w-3" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-surface p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Plan Usage</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{overview?.currentPlan || "Core"} plan usage</p>
            </div>
            <Link to="/dashboard/billing" className="text-xs text-primary hover:underline font-medium">
              Upgrade plan
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Calls used</span>
                <span className="font-semibold text-foreground">
                  {overview?.callsUsed || 0} / {callsLimit}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{usagePercent}%</div>
              <div className="text-xs text-muted-foreground">used</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          className="card-surface p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Business Overview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Business details and extracted website knowledge</p>
            </div>
            <Link to="/dashboard/knowledge-base" className="text-xs text-primary hover:underline font-medium">
              Open knowledge base
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg border border-border px-3 py-2">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                Business Name
              </div>
              <p className="text-sm font-semibold text-foreground mt-1">
                {overview?.businessName || localStorage.getItem("qc_business_name") || "Not set"}
              </p>
            </div>
            <div className="rounded-lg border border-border px-3 py-2">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                Business Number
              </div>
              <p className="text-sm font-semibold text-foreground mt-1">
                {overview?.businessNumber || localStorage.getItem("qc_inbound_number") || "Not set"}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpenText className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs font-semibold text-foreground">Extracted Website Data</p>
            </div>
            {(overview?.extractedKnowledgePreview || []).length === 0 ? (
              <p className="text-xs text-muted-foreground">No extracted website data found yet.</p>
            ) : (
              <div className="space-y-2">
                {(overview?.extractedKnowledgePreview || []).map((entry) => (
                  <div key={entry.id} className="rounded-lg border border-border px-3 py-2">
                    <p className="text-xs font-medium text-foreground">{entry.title || "Website Knowledge"}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-3">{entry.preview}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="card-surface p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Daily Summary</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Generate summary for today or any previous date</p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={summaryDate}
                onChange={(e) => setSummaryDate(e.target.value)}
                className="h-8 text-xs w-[150px]"
                max={todayDate}
              />
              <Button type="button" size="sm" onClick={handleGenerateSummary} disabled={summaryLoading}>
              {summaryLoading ? "Generating..." : "Generate Summary"}
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Same-day summary includes data captured so far and can be generated multiple times as the day progresses.
          </p>

          {summaryError && <p className="text-xs text-destructive mb-3">{summaryError}</p>}

          {summary && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              <div className="rounded-lg border border-border px-3 py-2">
                <p className="text-[11px] text-muted-foreground">Calls</p>
                <p className="text-lg font-semibold text-foreground">{summary.totalCalls}</p>
              </div>
              <div className="rounded-lg border border-border px-3 py-2">
                <p className="text-[11px] text-muted-foreground">Bookings</p>
                <p className="text-lg font-semibold text-foreground">{summary.bookings}</p>
              </div>
              <div className="rounded-lg border border-border px-3 py-2">
                <p className="text-[11px] text-muted-foreground">Cancellations</p>
                <p className="text-lg font-semibold text-foreground">{summary.cancellations}</p>
              </div>
              <div className="rounded-lg border border-border px-3 py-2">
                <p className="text-[11px] text-muted-foreground">Escalations</p>
                <p className="text-lg font-semibold text-foreground">{summary.escalations}</p>
              </div>
              <div className="rounded-lg border border-border px-3 py-2">
                <p className="text-[11px] text-muted-foreground">Revenue Generated</p>
                <p className="text-lg font-semibold text-foreground">GBP {summary.revenueGenerated.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border border-border px-3 py-2 col-span-2">
                <p className="text-[11px] text-muted-foreground">Date</p>
                <p className="text-sm font-semibold text-foreground">{summary.date}</p>
              </div>
            </div>
          )}

          {summaryHistory.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-foreground mb-2">Saved Daily Summaries</p>
              <div className="space-y-2 max-h-44 overflow-auto pr-1">
                {summaryHistory.map((item) => (
                  <div key={item.date} className="rounded-lg border border-border px-3 py-2 text-xs flex items-center justify-between gap-2">
                    <span className="text-foreground font-medium">{item.date}</span>
                    <span className="text-muted-foreground">Calls {item.totalCalls}</span>
                    <span className="text-muted-foreground">Bookings {item.bookings}</span>
                    <span className="text-muted-foreground">Cancels {item.cancellations}</span>
                    <span className="text-muted-foreground">Revenue GBP {item.revenueGenerated.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-surface p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Upcoming Appointments</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Booked appointments from your call flows</p>
            </div>
            <Link to="/dashboard/appointments" className="text-xs text-primary hover:underline font-medium">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {(overview?.appointments || []).slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{appointment.customerName || appointment.caller}</p>
                  <p className="text-xs text-muted-foreground truncate">{appointment.customerPhone || "No phone"}</p>
                  <p className="text-xs text-muted-foreground truncate">{appointment.customerEmail || "No email"}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-foreground">{appointment.date}</p>
                  <p className="text-xs text-muted-foreground">{appointment.time}</p>
                  <span className={`status-badge mt-1 ${appointment.status === "Confirmed" ? "status-completed" : "status-active"}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}

            {(!overview?.appointments || overview.appointments.length === 0) && (
              <p className="text-xs text-muted-foreground">No appointments yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
