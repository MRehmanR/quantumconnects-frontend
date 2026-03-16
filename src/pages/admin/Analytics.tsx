import { motion } from "framer-motion";
import AdminShell from "@/components/dashboard/AdminShell";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const callData = [
  { month: "Oct", calls: 58200 }, { month: "Nov", calls: 64100 }, { month: "Dec", calls: 71300 },
  { month: "Jan", calls: 76800 }, { month: "Feb", calls: 83400 }, { month: "Mar", calls: 94731 },
];
const sentimentData = [
  { name: "Positive", value: 68, color: "hsl(160 84% 39%)" },
  { name: "Neutral", value: 24, color: "hsl(239 84% 67%)" },
  { name: "Negative", value: 8, color: "hsl(0 84% 60%)" },
];

export default function AdminAnalytics() {
  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-2 card-surface p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Total Calls Over Time</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={callData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(214 32% 91%)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="calls" fill="hsl(239 84% 67%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-surface p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Call Sentiment</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {sentimentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`]} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {sentimentData.map(s => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{s.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminShell>
  );
}
