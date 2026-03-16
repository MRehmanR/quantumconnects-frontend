import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const breadcrumbMap: Record<string, string> = {
  "/admin": "Admin Overview",
  "/admin/users": "Users",
  "/admin/subscriptions": "Subscriptions",
  "/admin/analytics": "Analytics",
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const title = breadcrumbMap[location.pathname] ?? "Admin";
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={cn("flex-1 flex flex-col transition-all duration-200", collapsed ? "ml-16" : "ml-60")}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-6">
          <div className="flex-1">
            <h1 className="text-base font-semibold text-foreground">{title}</h1>
          </div>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-semibold">A</div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
