import { motion } from "framer-motion";
import AdminShell from "@/components/dashboard/AdminShell";
import { mockData } from "@/lib/api";

const plans = [
  { name: "Trial", count: 284, revenue: 0, color: "bg-muted" },
  { name: "Starter", count: 412, revenue: 11948, color: "bg-primary/40" },
  { name: "Core", count: 356, revenue: 28124, color: "bg-primary/70" },
  { name: "Pro", count: 188, revenue: 28012, color: "bg-primary" },
  { name: "Scale", count: 64, revenue: 19136, color: "bg-primary-glow" },
];

export default function AdminSubscriptions() {
  const total = plans.reduce((a, p) => a + p.count, 0);
  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Subscribers", value: mockData.adminOverview.activeSubscriptions.toLocaleString() },
            { label: "Monthly Recurring Revenue", value: `$${mockData.adminOverview.monthlyRevenue.toLocaleString()}` },
            { label: "Avg Revenue / User", value: "$40.63" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card-surface p-5">
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card-surface p-5">
          <h3 className="text-sm font-semibold text-foreground mb-5">Plan Distribution</h3>
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-foreground">{plan.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{plan.count} users</span>
                    <span className="font-semibold text-foreground w-20 text-right">${plan.revenue.toLocaleString()}/mo</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(plan.count / total) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`h-full rounded-full ${plan.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminShell>
  );
}
