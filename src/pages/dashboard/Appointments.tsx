import { motion } from "framer-motion";
import { Calendar, Clock, User, CheckCircle, AlertCircle, Circle } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { mockData } from "@/lib/api";

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  Confirmed: { color: "status-completed", icon: CheckCircle },
  Pending: { color: "status-active", icon: Circle },
  Completed: { color: "bg-muted text-muted-foreground", icon: CheckCircle },
};

export default function Appointments() {
  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: mockData.appointments.length, color: "text-foreground" },
            { label: "Confirmed", value: mockData.appointments.filter(a => a.status === "Confirmed").length, color: "text-accent" },
            { label: "Pending", value: mockData.appointments.filter(a => a.status === "Pending").length, color: "text-primary" },
            { label: "Completed", value: mockData.appointments.filter(a => a.status === "Completed").length, color: "text-muted-foreground" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="card-surface p-4 text-center"
            >
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Appointments list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-surface overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Upcoming Appointments</h3>
            <p className="text-xs text-muted-foreground mt-0.5">AI-booked appointments from call interactions</p>
          </div>

          <div className="divide-y divide-border">
            {mockData.appointments.map((appt, i) => {
              const config = statusConfig[appt.status] || statusConfig.Pending;
              const StatusIcon = config.icon;
              return (
                <motion.div
                  key={appt.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{appt.caller}</p>
                    <p className="text-xs text-muted-foreground">{appt.type}</p>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {appt.date}
                  </div>

                  <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {appt.time}
                  </div>

                  <span className={`status-badge ${config.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    {appt.status}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
