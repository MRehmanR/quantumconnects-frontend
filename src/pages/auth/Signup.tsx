import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    phone: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // POST /api/auth/signup
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      // Navigate to dashboard (for demo since API doesn't exist)
      navigate("/dashboard");
    } catch {
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "50 calls free, no credit card required",
    "Live in under 10 minutes",
    "Cancel any time",
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-foreground items-center justify-center p-16 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(at 20% 30%, hsl(239 84% 67% / 0.3) 0px, transparent 50%), radial-gradient(at 80% 70%, hsl(160 84% 39% / 0.2) 0px, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-xs">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary-foreground">QuantumConnects</span>
          </Link>

          <h2 className="text-2xl font-bold text-primary-foreground mb-3">
            Start automating your calls today
          </h2>
          <p className="text-primary-foreground/70 text-sm mb-8 leading-relaxed">
            Join 1,800+ businesses that trust QuantumConnects to handle every customer call.
          </p>

          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20">
                  <Check className="h-3 w-3 text-accent" />
                </div>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-start justify-center px-6 py-12 overflow-y-auto">
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
            <span className="text-lg font-bold text-foreground">
              Quantum<span className="text-primary">Connects</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Free trial — 50 calls included, no credit card needed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  className="mt-1.5 h-10"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="mt-1.5 h-10"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="businessName" className="text-sm font-medium">Business Name</Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Acme Medical Group"
                className="mt-1.5 h-10"
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="mt-1.5 h-10"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="h-10 pr-10"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  minLength={8}
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
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">Terms</a> and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </p>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
