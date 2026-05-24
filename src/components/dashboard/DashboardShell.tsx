import { ReactNode, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";
import { Bell, Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardShellProps {
  children: ReactNode;
}

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/calls": "Calls & Recordings",
  "/dashboard/appointments": "Appointments",
  "/dashboard/knowledge-base": "My AI Receptionist",
  "/dashboard/billing": "Billing",
  "/dashboard/settings": "Settings",
};

export default function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const title = breadcrumbMap[location.pathname] ?? "Dashboard";
  const userName = localStorage.getItem("qc_user_name") || "Account";
  const userEmail = localStorage.getItem("qc_user_email") || "";
  const ownerPhone = localStorage.getItem("qc_owner_phone") || "";
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AC";

  return (
    <div className="flex min-h-screen bg-background">
      <CustomerSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        className="hidden md:flex"
      />

      {isMobile && mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          />
          <CustomerSidebar
            collapsed={false}
            onToggle={() => setMobileOpen(false)}
            hideCollapseToggle
            onNavigate={() => setMobileOpen(false)}
            className="z-50"
          />
        </>
      )}

      {/* Main */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-200",
          isMobile ? "ml-0" : collapsed ? "md:ml-16" : "md:ml-72"
        )}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 sm:gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-3 sm:px-6">
          <button
            type="button"
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle sidebar"
          >
            {mobileOpen ? <X className="h-4 w-4 text-muted-foreground" /> : <Menu className="h-4 w-4 text-muted-foreground" />}
          </button>

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

          <div className="hidden sm:block text-right mr-1">
            <p className="text-xs font-medium text-foreground leading-tight">{userName}</p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              {[userEmail, ownerPhone].filter(Boolean).join(" | ")}
            </p>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {initials}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

