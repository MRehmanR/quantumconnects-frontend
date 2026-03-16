import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Phone, Shield, Globe, Save } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const sections = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "phone", icon: Phone, label: "Phone Settings" },
  { id: "security", icon: Shield, label: "Security" },
];

export default function Settings() {
  const [active, setActive] = useState("profile");
  const [profile, setProfile] = useState({ name: "Acme Corp", email: "admin@acme.com", phone: "+1 (555) 234-5678", timezone: "America/New_York" });

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings nav */}
          <div className="md:w-48 flex-shrink-0">
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    active === s.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Settings content */}
          <div className="flex-1">
            {active === "profile" && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-surface p-6 space-y-5"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Business Profile</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Update your business information</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Business Name</Label>
                    <Input className="h-9 text-sm" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Email</Label>
                    <Input type="email" className="h-9 text-sm" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Phone Number</Label>
                    <Input className="h-9 text-sm" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Timezone</Label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>America/New_York</option>
                      <option>America/Chicago</option>
                      <option>America/Los_Angeles</option>
                      <option>Europe/London</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <Button size="sm" className="bg-gradient-primary text-primary-foreground gap-1.5">
                    <Save className="h-3.5 w-3.5" />
                    Save Changes
                  </Button>
                </div>
              </motion.div>
            )}

            {active === "notifications" && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-surface p-6 space-y-4"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Notification Preferences</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Choose when you receive alerts</p>
                </div>
                {[
                  { label: "Missed Calls", desc: "Get notified when a call is missed or failed" },
                  { label: "New Appointments", desc: "Alert when AI books a new appointment" },
                  { label: "Escalations", desc: "Immediate alert when a call is escalated" },
                  { label: "Weekly Summary", desc: "Weekly digest of your call analytics" },
                  { label: "Billing Reminders", desc: "Reminders before billing cycles" },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                ))}
              </motion.div>
            )}

            {active === "phone" && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-surface p-6 space-y-5"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Phone Configuration</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Configure your AI receptionist phone settings</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Forwarding Number</Label>
                    <Input className="h-9 text-sm" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">AI Voice</Label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Professional Female (Default)</option>
                      <option>Professional Male</option>
                      <option>Friendly Female</option>
                      <option>Friendly Male</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Language</Label>
                    <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Mandarin</option>
                    </select>
                  </div>
                </div>
                <Button size="sm" className="bg-gradient-primary text-primary-foreground gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Settings
                </Button>
              </motion.div>
            )}

            {active === "security" && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-surface p-6 space-y-5"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Security</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage your password and security settings</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Current Password</Label>
                    <Input type="password" className="h-9 text-sm" placeholder="••••••••" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">New Password</Label>
                    <Input type="password" className="h-9 text-sm" placeholder="Min. 8 characters" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Confirm New Password</Label>
                    <Input type="password" className="h-9 text-sm" placeholder="••••••••" />
                  </div>
                </div>
                <Button size="sm" className="bg-gradient-primary text-primary-foreground gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Update Password
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
