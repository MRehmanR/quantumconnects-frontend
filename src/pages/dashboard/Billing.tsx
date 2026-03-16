import { motion } from "framer-motion";
import { CreditCard, Download, TrendingUp, AlertCircle, Check } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/api";

const plans = [
  { name: "Trial", price: 0, calls: 50, current: false },
  { name: "Starter", price: 29, calls: 75, current: false },
  { name: "Core", price: 79, calls: 200, current: true },
  { name: "Pro", price: 149, calls: 500, current: false },
  { name: "Scale", price: 299, calls: 1200, current: false },
];

const invoices = [
  { id: "INV-2026-003", date: "Mar 15, 2026", amount: "$79.00", status: "Paid" },
  { id: "INV-2026-002", date: "Feb 15, 2026", amount: "$79.00", status: "Paid" },
  { id: "INV-2026-001", date: "Jan 15, 2026", amount: "$79.00", status: "Paid" },
  { id: "INV-2025-012", date: "Dec 15, 2025", amount: "$29.00", status: "Paid" },
];

export default function Billing() {
  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Current plan */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-surface p-6"
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-0.5">Current Plan</h3>
              <p className="text-xs text-muted-foreground">Your subscription renews on {mockData.dashboard.nextBillingDate}</p>
            </div>
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive text-xs">
              Cancel Plan
            </Button>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">Core Plan</span>
                <span className="status-badge status-active">Active</span>
              </div>
              <p className="text-sm text-muted-foreground">200 calls/month · 5 concurrent · $79/mo</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">$79</div>
              <div className="text-xs text-muted-foreground">per month</div>
            </div>
          </div>

          {/* Usage bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">Monthly usage</span>
              <span className="font-semibold text-foreground">{mockData.dashboard.callsUsed} / 200 calls</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-primary"
                style={{ width: `${(mockData.dashboard.callsUsed / 200) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Upgrade plans */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-surface p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Upgrade Your Plan</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-3 text-center transition-all ${
                  plan.current
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 cursor-pointer hover:bg-muted/50"
                }`}
              >
                {plan.current && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Current
                  </div>
                )}
                <div className="text-sm font-semibold text-foreground mt-1">{plan.name}</div>
                <div className="text-lg font-bold text-foreground my-1">${plan.price}</div>
                <div className="text-xs text-muted-foreground">{plan.calls} calls</div>
                {!plan.current && (
                  <Button size="sm" variant="outline" className="w-full mt-3 h-7 text-xs">
                    Switch
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment method */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-surface p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Payment Method</h3>
            <Button variant="outline" size="sm" className="text-xs h-8">Update</Button>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex h-8 w-12 items-center justify-center rounded-md bg-card border border-border text-xs font-bold text-foreground">
              VISA
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2028</p>
            </div>
            <div className="ml-auto">
              <span className="status-badge status-completed">
                <Check className="h-3 w-3" />
                Default
              </span>
            </div>
          </div>
        </motion.div>

        {/* Invoices */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-surface overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Invoices</h3>
          </div>
          <div className="divide-y divide-border">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{inv.amount}</span>
                <span className="status-badge status-completed">{inv.status}</span>
                <button className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
                  <Download className="h-3.5 w-3.5" />
                  PDF
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
