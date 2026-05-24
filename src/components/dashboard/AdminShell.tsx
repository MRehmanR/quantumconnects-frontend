import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const breadcrumbMap: Record<string, string> = {
  "/admin": "Admin Overview",
  "/admin/users": "Users",
  "/admin/subscriptions": "Subscriptions",
  "/admin/analytics": "Analytics",
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const title = breadcrumbMap[location.pathname] ?? "Admin";

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar
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
          <AdminSidebar
            collapsed={false}
            onToggle={() => setMobileOpen(false)}
            className="z-50"
            hideCollapseToggle
            onNavigate={() => setMobileOpen(false)}
          />
        </>
      )}

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-200",
          isMobile ? "ml-0" : collapsed ? "md:ml-16" : "md:ml-60"
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 sm:gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-3 sm:px-6">
          <button
            type="button"
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle sidebar"
          >
            {mobileOpen ? (
              <X className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Menu className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-foreground">{title}</h1>
          </div>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-semibold">A</div>
        </header>
        <main className="flex-1 p-3 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
