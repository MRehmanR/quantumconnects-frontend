import { motion } from "framer-motion";
import { Phone, PhoneOff, Calendar, CreditCard, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { mockData } from "@/lib/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";
import { Link } from "react-router-dom";

const stats = [
  {
    label: "Calls Used",
    value: mockData.dashboard.callsUsed,
    icon: Phone,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    delta: "+12 today",
    trend: "up",
  },
  {
    label: "Calls Remaining",
    value: mockData.dashboard.callsRemaining,
    icon: PhoneOff,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    delta: `${Math.round((mockData.dashboard.callsRemaining / 200) * 100)}% of plan`,
    trend: "neutral",
  },
  {
    label: "Current Plan",
    value: mockData.dashboard.currentPlan,
    icon: CreditCard,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    delta: "Active",
    trend: "up",
  },
  {
    label: "Next Billing",
    value: mockData.dashboard.nextBillingDate,
    icon: Calendar,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    delta: "In 30 days",
    trend: "neutral",
  },
];

function StatCard({ stat, i }: { stat: typeof stats[0]; i: number }) {
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
  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} i={i} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Daily calls chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-2 card-surface p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Call Activity</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Daily calls & bookings this week</p>
              </div>
              <span className="status-badge status-active">This week</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mockData.dashboard.dailyCalls} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 100%)",
                    border: "1px solid hsl(214 32% 91%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="calls" fill="hsl(239 84% 67%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bookings" fill="hsl(160 84% 39% / 0.6)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quick actions / recent */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-surface p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Recent Calls</h3>
            <div className="space-y-3">
              {mockData.calls.slice(0, 4).map((call) => (
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

        {/* Usage progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-surface p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Plan Usage</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Core Plan — resets Apr 15, 2026</p>
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
                  {mockData.dashboard.callsUsed} / 200
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${(mockData.dashboard.callsUsed / 200) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {Math.round((mockData.dashboard.callsUsed / 200) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">used</div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
