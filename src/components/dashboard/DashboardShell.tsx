import { ReactNode, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: ReactNode;
}

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/calls": "Call Logs",
  "/dashboard/appointments": "Appointments",
  "/dashboard/knowledge-base": "Knowledge Base",
  "/dashboard/billing": "Billing",
  "/dashboard/settings": "Settings",
};

export default function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const title = breadcrumbMap[location.pathname] ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-background">
      <CustomerSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Main */}
      <div className={cn("flex-1 flex flex-col transition-all duration-200", collapsed ? "ml-16" : "ml-60")}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-6">
          <div className="flex-1">
            <h1 className="text-base font-semibold text-foreground">{title}</h1>
          </div>

          <div className="hidden md:flex items-center w-64">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 h-9 bg-muted/50 border-border text-sm" />
            </div>
          </div>

          <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
          </button>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            AC
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
