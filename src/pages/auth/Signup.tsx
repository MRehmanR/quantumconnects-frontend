import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api";

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const countryOptions = [
    { code: "US", label: "United States (US)" },
    { code: "CA", label: "Canada (CA)" },
    { code: "GB", label: "United Kingdom (GB)" },
    { code: "AU", label: "Australia (AU)" },
    { code: "PK", label: "Pakistan (PK)" },
    { code: "AE", label: "United Arab Emirates (AE)" },
    { code: "DE", label: "Germany (DE)" },
    { code: "FR", label: "France (FR)" },
  ];
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    country: "US",
    websiteUrl: "",
    referralCode: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const passwordValid =
    passwordChecks.length && passwordChecks.uppercase && passwordChecks.number && passwordChecks.special;

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setForm((prev) => ({ ...prev, referralCode: ref }));
    }
  }, [searchParams]);

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const runPasswordChecks = (pw: string) => {
    const checks = {
      length: pw.length >= 8,
      uppercase: /[A-Z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[^A-Za-z0-9]/.test(pw),
    };
    setPasswordChecks(checks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLoadingStep("Creating account...");
    localStorage.removeItem("qc_inbound_number");
    try {
      const payloadData: any = await authApi.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        businessName: form.businessName,
        country: form.country,
        referralCode: form.referralCode,
        referralMethod: searchParams.get("ref") ? "link" : form.referralCode ? "code" : "",
      });

      if (payloadData?.email) {
        localStorage.setItem("qc_user_email", payloadData.email);
      }
      if (payloadData?.token) {
        localStorage.setItem("qc_auth_token", payloadData.token);
      }
      if (payloadData?.role) {
        localStorage.setItem("qc_user_role", payloadData.role);
      }
      if (payloadData?.username) {
        localStorage.setItem("qc_user_name", payloadData.username);
      }
      if (payloadData?.businessName) {
        localStorage.setItem("qc_business_name", payloadData.businessName);
      }
      if (payloadData?.ownerPhone) {
        localStorage.setItem("qc_owner_phone", payloadData.ownerPhone);
      }
      if (payloadData?.inboundNumber) {
        localStorage.setItem("qc_inbound_number", payloadData.inboundNumber);
      } else {
        localStorage.removeItem("qc_inbound_number");
      }
      if (payloadData?.retellAgentId) {
        localStorage.setItem("qc_retell_agent_id", payloadData.retellAgentId);
      } else {
        localStorage.removeItem("qc_retell_agent_id");
      }
      if (payloadData?.provisioningStatus) {
        localStorage.setItem("qc_provisioning_status", payloadData.provisioningStatus);
      } else {
        localStorage.removeItem("qc_provisioning_status");
      }
      if (payloadData?.timezone) {
        localStorage.setItem("qc_user_timezone", payloadData.timezone);
      }
      if (payloadData?.referralCode) {
        localStorage.setItem("qc_referral_code", payloadData.referralCode);
      }

      const authToken = payloadData?.token;
      if (!authToken) {
        throw new Error("Signup succeeded but auth token is missing.");
      }

      localStorage.setItem("qc_onboarding_country", form.country);
      localStorage.setItem("qc_business_website", form.websiteUrl.trim());

      const websiteUrl = form.websiteUrl.trim();

      if (websiteUrl) {
        setLoadingStep("Extracting website data...");
        await authApi.importWebsiteKnowledge({ websiteUrl }).catch(() => null);
      }

      if (!payloadData?.inboundNumber && payloadData?.provisioningError) {
        localStorage.setItem("qc_onboarding_error", payloadData.provisioningError);
      }

      if (!payloadData?.retellAgentId && localStorage.getItem("qc_inbound_number")) {
        setLoadingStep("Setting up voice agent...");
        try {
          const retell = await authApi.provisionRetellVoiceAgent();
          if (retell?.retellAgentId) {
            localStorage.setItem("qc_retell_agent_id", retell.retellAgentId);
          }
          if (retell?.provisioningStatus) {
            localStorage.setItem("qc_provisioning_status", retell.provisioningStatus);
          }
        } catch (retellError: any) {
          localStorage.setItem("qc_onboarding_error", retellError?.message || "Voice agent setup needs attention.");
        }
      }

      setLoadingStep("Finalizing dashboard...");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoadingStep("");
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
              <Label htmlFor="country" className="text-sm font-medium">Business Country</Label>
              <select
                id="country"
                className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.country}
                onChange={(e) => update("country", e.target.value.toUpperCase())}
              >
                {countryOptions.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="referralCode" className="text-sm font-medium">Referral Code (optional)</Label>
              <Input
                id="referralCode"
                type="text"
                placeholder="Enter referral code"
                className="mt-1.5 h-10"
                value={form.referralCode}
                onChange={(e) => update("referralCode", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="websiteUrl" className="text-sm font-medium">Business Website (optional)</Label>
              <Input
                id="websiteUrl"
                type="url"
                placeholder="https://yourbusiness.com"
                className="mt-1.5 h-10"
                value={form.websiteUrl}
                onChange={(e) => update("websiteUrl", e.target.value)}
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
                  onChange={(e) => {
                    update("password", e.target.value);
                    runPasswordChecks(e.target.value);
                  }}
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

            <div className="text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-2">
                <Check className={`h-4 w-4 ${passwordChecks.length ? 'text-accent' : 'text-muted-foreground'}`} />
                <span>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Check className={`h-4 w-4 ${passwordChecks.uppercase ? 'text-accent' : 'text-muted-foreground'}`} />
                <span>At least 1 uppercase letter</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Check className={`h-4 w-4 ${passwordChecks.number ? 'text-accent' : 'text-muted-foreground'}`} />
                <span>At least 1 number</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Check className={`h-4 w-4 ${passwordChecks.special ? 'text-accent' : 'text-muted-foreground'}`} />
                <span>At least 1 special character</span>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="confirmPassword"
                  type={showPwd ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="h-10 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {confirmPassword && (
                    <span className={`${form.password === confirmPassword ? 'text-accent' : 'text-destructive'}`}>
                      {form.password === confirmPassword ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      )}
                    </span>
                  )}
                </div>
              </div>
              {confirmPassword && form.password !== confirmPassword && (
                <p className="text-xs text-destructive mt-2">Passwords do not match</p>
              )}
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading || !passwordValid || form.password !== confirmPassword}
              className="w-full h-10 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {loadingStep || "Setting up..."}
                </span>
              ) : "Create account"}
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
