import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CreditCard, BarChart3, LogOut, Zap, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
];

export default function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside className={cn("fixed left-0 top-0 h-full z-40 flex flex-col border-r border-border bg-card transition-all duration-200", collapsed ? "w-16" : "w-60")}>
      <div className={cn("flex h-16 items-center border-b border-border px-4", collapsed ? "justify-center" : "gap-2")}>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && <span className="text-sm font-bold text-foreground truncate">Admin <span className="text-primary">Portal</span></span>}
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link key={item.label} to={item.href} title={collapsed ? item.label : undefined}
              className={cn("sidebar-item", collapsed ? "justify-center px-2" : "", active && "active")}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-2 space-y-1">
        <Link to="/dashboard" className={cn("sidebar-item", collapsed ? "justify-center px-2" : "")}>
          <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Customer View</span>}
        </Link>
        <button onClick={onToggle} className={cn("w-full flex items-center rounded-md p-2 text-xs text-muted-foreground hover:bg-muted transition-colors", collapsed ? "justify-center" : "gap-2")}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
