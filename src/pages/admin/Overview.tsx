import { motion } from "framer-motion";
import { Users, CreditCard, DollarSign, Phone, TrendingUp } from "lucide-react";
import AdminShell from "@/components/dashboard/AdminShell";
import { mockData } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const metrics = [
  { label: "Total Users", value: mockData.adminOverview.totalUsers.toLocaleString(), icon: Users, delta: `+${mockData.adminOverview.growth.users}%`, iconBg: "bg-primary/10", iconColor: "text-primary" },
  { label: "Active Subscriptions", value: mockData.adminOverview.activeSubscriptions.toLocaleString(), icon: CreditCard, delta: "+5.2%", iconBg: "bg-accent/10", iconColor: "text-accent" },
  { label: "Monthly Revenue", value: `$${mockData.adminOverview.monthlyRevenue.toLocaleString()}`, icon: DollarSign, delta: `+${mockData.adminOverview.growth.revenue}%`, iconBg: "bg-yellow-500/10", iconColor: "text-yellow-600" },
  { label: "Total Calls", value: mockData.adminOverview.totalCalls.toLocaleString(), icon: Phone, delta: `+${mockData.adminOverview.growth.calls}%`, iconBg: "bg-primary/10", iconColor: "text-primary" },
];

const revenueData = [
  { month: "Oct", revenue: 31200 }, { month: "Nov", revenue: 34800 }, { month: "Dec", revenue: 38100 },
  { month: "Jan", revenue: 41500 }, { month: "Feb", revenue: 44200 }, { month: "Mar", revenue: 48920 },
];

export default function AdminOverview() {
  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card-surface p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.iconBg}`}>
                  <m.icon className={`h-5 w-5 ${m.iconColor}`} />
                </div>
                <span className="text-xs font-semibold text-accent">{m.delta}</span>
              </div>
              <div className="text-2xl font-bold text-foreground tracking-tight mb-1">{m.value}</div>
              <div className="text-sm text-muted-foreground">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card-surface p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(214 32% 91%)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(239 84% 67%)" strokeWidth={2.5} dot={{ fill: "hsl(239 84% 67%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </AdminShell>
  );
}
