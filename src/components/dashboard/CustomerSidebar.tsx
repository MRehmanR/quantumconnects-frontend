import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Phone, BookOpen, Calendar, CreditCard,
  Settings, LogOut, Zap, ChevronLeft, ChevronRight, Bell
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Phone, label: "Call Logs", href: "/dashboard/calls" },
  { icon: Calendar, label: "Appointments", href: "/dashboard/appointments" },
  { icon: BookOpen, label: "Knowledge Base", href: "/dashboard/knowledge-base" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

interface CustomerSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function CustomerSidebar({ collapsed, onToggle }: CustomerSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-40 flex flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn("flex h-16 items-center border-b border-border px-4", collapsed ? "justify-center" : "gap-2")}>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-sm font-bold tracking-tight text-foreground truncate">
            Quantum<span className="text-primary">Connects</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "sidebar-item",
                collapsed ? "justify-center px-2" : "",
                active && "active"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-2 space-y-1">
        <button
          onClick={() => navigate("/")}
          className={cn("sidebar-item w-full", collapsed ? "justify-center px-2" : "")}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className={cn(
            "w-full flex items-center rounded-md p-2 text-xs text-muted-foreground hover:bg-muted transition-colors",
            collapsed ? "justify-center" : "gap-2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
