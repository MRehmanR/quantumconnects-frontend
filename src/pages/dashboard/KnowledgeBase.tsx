import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, BookOpen, Tag, Search } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockData } from "@/lib/api";

const categoryColors: Record<string, string> = {
  General: "bg-primary/10 text-primary",
  Appointments: "bg-accent/10 text-accent",
  Pricing: "bg-yellow-500/10 text-yellow-600",
  Policies: "bg-muted text-muted-foreground",
};

export default function KnowledgeBase() {
  const [entries, setEntries] = useState(mockData.knowledgeBase);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", category: "General" });
  const [loading, setLoading] = useState(false);

  const categories = ["General", "Appointments", "Pricing", "Policies"];

  const filtered = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // POST /api/knowledge-base
      await fetch("/api/knowledge-base", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    setEntries([...entries, { id: Date.now().toString(), ...form }]);
    setForm({ title: "", content: "", category: "General" });
    setShowForm(false);
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search knowledge base..."
              className="pl-9 h-9 text-sm bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            size="sm"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground gap-1.5"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>

        {/* Add form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleAdd}
            className="card-surface p-5 space-y-4"
          >
            <h3 className="text-sm font-semibold text-foreground">New Knowledge Base Entry</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Title</Label>
                <Input
                  placeholder="E.g., Business Hours"
                  className="h-9 text-sm"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Category</Label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Content</Label>
              <Textarea
                placeholder="Enter the information your AI should know..."
                className="text-sm resize-none"
                rows={3}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button size="sm" type="submit" disabled={loading} className="bg-gradient-primary text-primary-foreground">
                Save Entry
              </Button>
            </div>
          </motion.form>
        )}

        {/* Entries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-surface p-5 group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">{entry.title}</h4>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{entry.content}</p>
              <div className="flex items-center gap-1.5">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <span className={`status-badge text-xs ${categoryColors[entry.category] || "bg-muted text-muted-foreground"}`}>
                  {entry.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card-surface py-16 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No entries yet. Add your first knowledge base entry.</p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
