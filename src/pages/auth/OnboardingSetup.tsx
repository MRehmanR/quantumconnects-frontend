import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi, numbersApi } from "@/lib/api";

const COUNTRY_OPTIONS = [
  { code: "US", label: "United States (US)" },
  { code: "CA", label: "Canada (CA)" },
  { code: "GB", label: "United Kingdom (GB)" },
  { code: "AU", label: "Australia (AU)" },
  { code: "PK", label: "Pakistan (PK)" },
  { code: "AE", label: "United Arab Emirates (AE)" },
  { code: "DE", label: "Germany (DE)" },
  { code: "FR", label: "France (FR)" },
];

export default function OnboardingSetup() {
  const navigate = useNavigate();
  const [country, setCountry] = useState(localStorage.getItem("qc_onboarding_country") || "US");
  const [websiteUrl, setWebsiteUrl] = useState(localStorage.getItem("qc_business_website") || "");
  const [instructions, setInstructions] = useState(localStorage.getItem("qc_retell_prompt_notes") || "");
  const [customPrompt, setCustomPrompt] = useState(localStorage.getItem("qc_retell_custom_prompt") || "");
  const [setupLoading, setSetupLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"idle" | "agent" | "number" | "done">("idle");

  const businessName = localStorage.getItem("qc_business_name") || "your business";
  const ownerName = localStorage.getItem("qc_user_name") || "";
  const ownerPhone = localStorage.getItem("qc_owner_phone") || "";
  const canSetup = useMemo(() => !setupLoading && !!country, [setupLoading, country]);

  const generatePrompt = async () => {
    setGenerating(true);
    setError("");
    try {
      localStorage.setItem("qc_retell_prompt_notes", instructions.trim());
      const data = await authApi.generateRetellPrompt({
        businessName,
        ownerName,
        ownerPhone,
        userInstructions: instructions.trim() || undefined,
      });
      const prompt = data?.prompt || "";
      setCustomPrompt(prompt);
      localStorage.setItem("qc_retell_custom_prompt", prompt);
    } catch (err: any) {
      setError(err?.message || "Failed to generate prompt");
    } finally {
      setGenerating(false);
    }
  };

  const runSetup = async () => {
    setSetupLoading(true);
    setError("");
    setStep("agent");
    try {
      const promptValue = customPrompt.trim();
      localStorage.setItem("qc_retell_custom_prompt", promptValue);
      localStorage.setItem("qc_onboarding_country", country);
      localStorage.setItem("qc_business_website", websiteUrl.trim());

      const trimmedWebsite = websiteUrl.trim();
      if (trimmedWebsite) {
        await authApi.importWebsiteKnowledge({ websiteUrl: trimmedWebsite }).catch(() => null);
      }

      setStep("number");
      const demo = await numbersApi.assignDemoNumber({
        region: country,
      }).catch((demoError: any) => {
        localStorage.setItem("qc_onboarding_error", demoError?.message || "Demo number assignment needs attention.");
        return null;
      });

      if (demo?.phoneNumber) {
        localStorage.setItem("qc_inbound_number", demo.phoneNumber);
      }
      if (demo?.demoId) {
        localStorage.setItem("qc_demo_number_id", String(demo.demoId));
      }
      if (demo?.expiresAt) {
        localStorage.setItem("qc_demo_expires_at", demo.expiresAt);
      } else {
        localStorage.removeItem("qc_demo_expires_at");
      }
      if (demo?.status) {
        localStorage.setItem("qc_demo_status", demo.status);
      }

      if (!localStorage.getItem("qc_inbound_number")) {
        setStep("done");
        navigate("/dashboard");
        return;
      }

      const retell = await authApi.provisionRetellVoiceAgent({
        customPrompt: promptValue || undefined,
      });

      if (retell?.retellAgentId) {
        localStorage.setItem("qc_retell_agent_id", retell.retellAgentId);
      } else {
        localStorage.removeItem("qc_retell_agent_id");
      }
      if (retell?.provisioningStatus) {
        localStorage.setItem("qc_provisioning_status", retell.provisioningStatus);
      }

      setStep("done");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Setup failed");
      setStep("idle");
    } finally {
      setSetupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wide">Guided Onboarding</p>
          <h1 className="text-2xl font-bold text-foreground mt-1">Set Up Your AI Receptionist</h1>
          <p className="text-sm text-muted-foreground mt-2">
            We will configure {businessName} in 3 steps: business prompt, dedicated number, and voice agent connection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className={`rounded-md border px-3 py-2 ${step === "agent" || step === "number" || step === "done" ? "border-accent/40 bg-accent/10" : "border-border"}`}>
            1. Configure agent
          </div>
          <div className={`rounded-md border px-3 py-2 ${step === "number" || step === "done" ? "border-accent/40 bg-accent/10" : "border-border"}`}>
            2. Assign number
          </div>
          <div className={`rounded-md border px-3 py-2 ${step === "done" ? "border-accent/40 bg-accent/10" : "border-border"}`}>
            3. Go to dashboard
          </div>
        </div>

        <div className="rounded-lg border border-border p-4 space-y-3">
          <div>
            <Label className="text-xs font-medium mb-1.5 block">Country</Label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value.toUpperCase())}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {COUNTRY_OPTIONS.map((item) => (
                <option key={item.code} value={item.code}>{item.label}</option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-xs font-medium mb-1.5 block">Prompt Notes (optional)</Label>
            <Input
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Example: ask for service type first, urgent calls transfer immediately."
              className="h-9 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium mb-1.5 block">Business Website (optional)</Label>
            <Input
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://yourbusiness.com"
              className="h-9 text-sm"
            />
          </div>

          <div>
            <Label className="text-xs font-medium mb-1.5 block">Agent Prompt (editable)</Label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Generate with AI, then adjust wording as needed."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={generatePrompt} disabled={generating}>
              <Sparkles className="h-4 w-4 mr-2" />
              {generating ? "Generating..." : "Generate Prompt with AI"}
            </Button>
            <Button type="button" onClick={runSetup} disabled={!canSetup} className="bg-gradient-primary text-primary-foreground">
              {setupLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Bot className="h-4 w-4 mr-2" />}
              {setupLoading ? "Setting Up..." : "Start Setup"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {!error && step === "done" && (
          <div className="rounded-md border border-accent/30 bg-accent/10 p-3 text-sm text-accent flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5" />
            <p>Setup complete. Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
