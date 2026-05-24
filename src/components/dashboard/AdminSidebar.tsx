import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CreditCard, BarChart3, LogOut, Zap, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
  hideCollapseToggle?: boolean;
  onNavigate?: () => void;
}

export default function AdminSidebar({
  collapsed,
  onToggle,
  className,
  hideCollapseToggle = false,
  onNavigate,
}: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("qc_auth_token");
    localStorage.removeItem("qc_user_role");
    localStorage.removeItem("qc_user_email");
    localStorage.removeItem("qc_referral_code");
    localStorage.removeItem("qc_inbound_number");
    localStorage.removeItem("qc_user_name");
    localStorage.removeItem("qc_business_name");
    localStorage.removeItem("qc_owner_phone");
    localStorage.removeItem("qc_user_timezone");
    localStorage.removeItem("qc_retell_agent_id");
    localStorage.removeItem("qc_provisioning_status");
    navigate("/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-40 flex flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      <div className={cn("flex h-16 items-center border-b border-border px-4", collapsed ? "justify-center" : "gap-2")}>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && <span className="text-sm font-bold text-foreground truncate">Admin <span className="text-primary">Portal</span></span>}
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              title={collapsed ? item.label : undefined}
              onClick={onNavigate}
              className={cn("sidebar-item", collapsed ? "justify-center px-2" : "", active && "active")}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-2 space-y-1">
        <button
          onClick={handleSignOut}
          className={cn("sidebar-item w-full", collapsed ? "justify-center px-2" : "")}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        {!hideCollapseToggle && (
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
        )}
      </div>
    </aside>
  );
}
