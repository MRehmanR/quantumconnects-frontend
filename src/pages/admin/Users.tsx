import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, UserX, Edit } from "lucide-react";
import AdminShell from "@/components/dashboard/AdminShell";
import { Input } from "@/components/ui/input";
import { adminApi, type AdminUserItem } from "@/lib/api";

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState<AdminUserItem[]>([]);

  useEffect(() => {
    const run = async () => {
      const data = await adminApi.getUsers();
      setAllUsers(data);
    };

    run();
  }, []);

  const users = allUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.business.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9 h-9 text-sm bg-card" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="text-xs text-muted-foreground">{users.length} users</div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card-surface overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <div className="col-span-3">User</div>
            <div className="col-span-2">Business</div>
            <div className="col-span-2">Plan</div>
            <div className="col-span-1">Calls</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Joined</div>
            <div className="col-span-1">Actions</div>
          </div>
          <div className="divide-y divide-border">
            {users.map((user, i) => (
              <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-4 px-5 py-3.5 items-center hover:bg-muted/30 transition-colors">
                <div className="col-span-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground truncate">{user.business}</div>
                <div className="col-span-2">
                  <span className="status-badge status-active text-xs">{user.plan}</span>
                </div>
                <div className="col-span-1 text-sm text-foreground font-mono">{user.calls}</div>
                <div className="col-span-2">
                  <span className={`status-badge ${user.status === "Active" ? "status-completed" : "status-escalated"}`}>
                    {user.status}
                  </span>
                </div>
                <div className="col-span-1 text-xs text-muted-foreground">{user.joined.split(",")[0]}</div>
                <div className="col-span-1 flex items-center gap-1">
                  <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Suspend">
                    <UserX className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminShell>
  );
}
