import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Phone, PlayCircle, FileText, ChevronDown } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Input } from "@/components/ui/input";
import { callsApi, type CallLogItem } from "@/lib/api";

const sentimentColors: Record<string, string> = {
  Positive: "status-completed",
  Neutral: "status-active",
  Negative: "status-escalated",
};

const statusColors: Record<string, string> = {
  Completed: "status-completed",
  Escalated: "status-escalated",
  Missed: "status-missed",
};

export default function CallLogs() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [calls, setCalls] = useState<CallLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const data = await callsApi.getAll({
          search: search || undefined,
          filter: filter === "All" ? undefined : filter,
        });
        setCalls(data);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [search, filter]);

  const filters = ["All", "Completed", "Escalated", "Missed"];

  const filtered = calls;

  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name, phone, email or transcripts..."
              className="pl-9 h-9 text-sm bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-surface overflow-hidden"
        >
          <div className="overflow-x-auto">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wide text-muted-foreground min-w-[900px]">
            <div className="col-span-3">Caller</div>
            <div className="col-span-2">Date & Time</div>
            <div className="col-span-1">Duration</div>
            <div className="col-span-2">Sentiment</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-3">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border">
            {filtered.map((call) => (
              <div key={call.id}>
                <div className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-muted/30 transition-colors min-w-[900px]">
                  <div className="col-span-3 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{call.callerName}</p>
                      <p className="text-xs text-muted-foreground">{call.callerPhone}</p>
                      <p className="text-xs text-muted-foreground">{call.callerEmail || "No email"}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-foreground">{call.date}</div>
                    <div className="text-xs text-muted-foreground">{call.time}</div>
                  </div>
                  <div className="col-span-1 text-sm text-muted-foreground font-mono">{call.duration}</div>
                  <div className="col-span-2">
                    <span className={`status-badge ${sentimentColors[call.sentiment] || "status-active"}`}>
                      {call.sentiment}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <span className={`status-badge ${statusColors[call.status] || "status-active"}`}>
                      {call.status}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <button
                      disabled
                      className="flex items-center gap-1 text-xs text-muted-foreground cursor-not-allowed font-medium"
                      title="Call recording playback is not available yet"
                    >
                      <PlayCircle className="h-3.5 w-3.5" />
                      Play Soon
                    </button>
                    <button
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => setExpanded(expanded === call.id ? null : call.id)}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Transcript
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${expanded === call.id ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Transcript expand */}
                {expanded === call.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-4 bg-muted/20 border-t border-border"
                  >
                    <p className="text-xs text-muted-foreground leading-relaxed pt-3">
                      <span className="font-semibold text-foreground">Transcript: </span>
                      {call.transcript}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          </div>

          {filtered.length === 0 && (
            <div className="px-5 py-16 text-center">
              <Phone className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">{loading ? "Loading call logs..." : "No calls match your search"}</p>
            </div>
          )}
        </motion.div>

        <p className="text-xs text-muted-foreground text-right">
          Showing {filtered.length} calls
        </p>
      </div>
    </DashboardShell>
  );
}
