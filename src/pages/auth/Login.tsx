import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.data?.token || !payload?.data?.user?.role) {
        throw new Error(payload?.message || "Invalid email or password");
      }

      const email = payload.data.user.email || form.email;
      localStorage.setItem("qc_auth_token", payload.data.token);
      localStorage.setItem("qc_user_role", payload.data.user.role);
      if (payload?.data?.user?.username) {
        localStorage.setItem("qc_user_name", payload.data.user.username);
      }
      if (email) {
        localStorage.setItem("qc_user_email", email);
      }
      if (payload?.data?.user?.businessName) {
        localStorage.setItem("qc_business_name", payload.data.user.businessName);
      }
      if (payload?.data?.user?.ownerPhone) {
        localStorage.setItem("qc_owner_phone", payload.data.user.ownerPhone);
      }
      if (payload?.data?.user?.inboundNumber) {
        localStorage.setItem("qc_inbound_number", payload.data.user.inboundNumber);
      } else {
        localStorage.removeItem("qc_inbound_number");
      }
      if (payload?.data?.user?.retellAgentId) {
        localStorage.setItem("qc_retell_agent_id", payload.data.user.retellAgentId);
      } else {
        localStorage.removeItem("qc_retell_agent_id");
      }
      if (payload?.data?.user?.provisioningStatus) {
        localStorage.setItem("qc_provisioning_status", payload.data.user.provisioningStatus);
      } else {
        localStorage.removeItem("qc_provisioning_status");
      }
      if (payload?.data?.user?.timezone) {
        localStorage.setItem("qc_user_timezone", payload.data.user.timezone);
      }
      if (payload?.data?.user?.referralCode) {
        localStorage.setItem("qc_referral_code", payload.data.user.referralCode);
      }
      if (payload.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate(payload?.data?.user?.inboundNumber ? "/dashboard" : "/onboarding/setup");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-foreground items-center justify-center p-16 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(at 30% 40%, hsl(239 84% 67% / 0.3) 0px, transparent 50%), radial-gradient(at 80% 80%, hsl(191 91% 55% / 0.2) 0px, transparent 50%)"
        }} />
        <div className="relative z-10 max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary-foreground">QuantumConnects</span>
          </Link>
          <blockquote className="mt-8">
            <p className="text-2xl font-semibold text-primary-foreground leading-snug">
              "Our missed-call rate dropped to zero in the first week. The AI handles everything perfectly."
            </p>
            <footer className="mt-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/30 flex items-center justify-center text-primary-foreground font-bold text-sm">SJ</div>
                <div>
                  <div className="text-sm font-medium text-primary-foreground">Sarah Johnson</div>
                  <div className="text-xs text-primary-foreground/60">CEO, Acme Medical Group</div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Quantum<span className="text-primary">Connects</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your QuantumConnects account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="mt-1.5 h-10"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="********"
                  className="h-10 pr-10"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

