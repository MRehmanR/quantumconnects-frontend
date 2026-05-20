import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, PhoneCall, CheckCircle, AlertTriangle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authApi, profileApi, type AvailableBusinessNumberItem } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function OnboardingBuyNumber() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [retellLoading, setRetellLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [retellError, setRetellError] = useState("");
  const [successNumber, setSuccessNumber] = useState(localStorage.getItem("qc_inbound_number") || "");
  const [retellAgentId, setRetellAgentId] = useState(localStorage.getItem("qc_retell_agent_id") || "");
  const [country, setCountry] = useState(localStorage.getItem("qc_onboarding_country") || "US");
  const [areaCode, setAreaCode] = useState("");
  const [contains, setContains] = useState("");
  const [availableNumbers, setAvailableNumbers] = useState<AvailableBusinessNumberItem[]>([]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const countryCode = country.trim().toUpperCase();
  const isNanpCountry = countryCode === "US" || countryCode === "CA";

  const userName = localStorage.getItem("qc_user_name") || "there";
  const businessName = localStorage.getItem("qc_business_name") || "your business";

  const loadAvailableNumbers = async () => {
    setSearching(true);
    setError("");
    try {
      if (!isNanpCountry && areaCode.trim()) {
        setError("Area code search is only supported for US/CA. Clear area code for this country.");
        setAvailableNumbers([]);
        setSelectedNumber("");
        setSearching(false);
        return;
      }

      const data = await authApi.getAvailableBusinessNumbers({
        country: countryCode,
        areaCode: isNanpCountry ? areaCode : "",
        contains,
        limit: 10,
      });
      setAvailableNumbers(data || []);
      setSelectedNumber(data?.[0]?.phoneNumber || "");
    } catch (err: any) {
      setAvailableNumbers([]);
      setSelectedNumber("");
      setError(err?.message || "Failed to fetch available numbers");
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    const savedError = localStorage.getItem("qc_onboarding_error");
    if (savedError) {
      setError(savedError);
      localStorage.removeItem("qc_onboarding_error");
    }

    const run = async () => {
      try {
        const profile = await profileApi.get();
        if (profile?.inboundNumber) {
          localStorage.setItem("qc_inbound_number", profile.inboundNumber);
          setSuccessNumber(profile.inboundNumber);
        }
        if (profile?.retellAgentId) {
          localStorage.setItem("qc_retell_agent_id", profile.retellAgentId);
          setRetellAgentId(profile.retellAgentId);
        } else {
          localStorage.removeItem("qc_retell_agent_id");
          setRetellAgentId("");
        }
        if (profile?.provisioningStatus) {
          localStorage.setItem("qc_provisioning_status", profile.provisioningStatus);
        }
      } catch {
        // fallback to local values if profile endpoint is unavailable
      }

      if (!localStorage.getItem("qc_inbound_number")) {
        loadAvailableNumbers();
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuyNumber = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await authApi.provisionBusinessNumber({
        phoneNumber: selectedNumber || undefined,
        country: countryCode,
        areaCode: isNanpCountry ? areaCode : "",
      });
      if (data?.inboundNumber) {
        localStorage.setItem("qc_inbound_number", data.inboundNumber);
      }
      if (data?.inboundNumber) {
        setSuccessNumber(data.inboundNumber);
      }
      if (data?.retellAgentId) {
        localStorage.setItem("qc_retell_agent_id", data.retellAgentId);
        setRetellAgentId(data.retellAgentId);
      }
      if (data?.provisioningStatus) {
        localStorage.setItem("qc_provisioning_status", data.provisioningStatus);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to buy business number");
    } finally {
      setLoading(false);
    }
  };

  const handleProvisionRetell = async () => {
    setRetellLoading(true);
    setRetellError("");
    try {
      const customPrompt = localStorage.getItem("qc_retell_custom_prompt") || undefined;
      const data = await authApi.provisionRetellVoiceAgent({ customPrompt });
      if (data?.retellAgentId) {
        localStorage.setItem("qc_retell_agent_id", data.retellAgentId);
        setRetellAgentId(data.retellAgentId);
      }
      if (data?.provisioningStatus) {
        localStorage.setItem("qc_provisioning_status", data.provisioningStatus);
      }
    } catch (err: any) {
      setRetellError(err?.message || "Failed to setup Retell voice agent");
    } finally {
      setRetellLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-medium text-primary uppercase tracking-wide">Client Onboarding</p>
          <h1 className="text-2xl font-bold text-foreground">Buy Your Business Number</h1>
          <p className="text-sm text-muted-foreground">
            Welcome {userName}. Choose and buy a dedicated Twilio number for {businessName} so your AI receptionist can receive calls.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <p>This will:</p>
          <p>1. Purchase an available Twilio number</p>
          <p>2. Connect it to your account</p>
          <p>3. Finish voice-agent provisioning</p>
          <p className="mt-2">Tip: use ISO country code like US, GB, PK. (`UK` is treated as `GB`.)</p>
        </div>

        {!successNumber && (
          <div className="rounded-lg border border-border p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs mb-1.5 block">Country</Label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountry(e.target.value.toUpperCase())}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {COUNTRY_OPTIONS.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Area Code (optional)</Label>
                <Input
                  value={areaCode}
                  onChange={(e) => setAreaCode(e.target.value)}
                  placeholder={isNanpCountry ? "212" : "US/CA only"}
                  className="h-9 text-sm"
                  disabled={!isNanpCountry}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Contains (optional)</Label>
                <Input value={contains} onChange={(e) => setContains(e.target.value)} placeholder="+1415" className="h-9 text-sm" />
              </div>
            </div>
            {!isNanpCountry && (
              <p className="text-xs text-muted-foreground">Area-code filtering is disabled outside US/CA.</p>
            )}
            <Button type="button" variant="outline" onClick={loadAvailableNumbers} disabled={searching} className="h-9">
              {searching ? "Searching..." : "Search Available Numbers"}
            </Button>
            <div className="space-y-2 max-h-52 overflow-auto pr-1">
              {availableNumbers.map((item) => (
                <label key={item.phoneNumber} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="selectedNumber"
                    value={item.phoneNumber}
                    checked={selectedNumber === item.phoneNumber}
                    onChange={(e) => setSelectedNumber(e.target.value)}
                  />
                  <span className="font-medium text-foreground">{item.phoneNumber}</span>
                  <span className="text-xs text-muted-foreground">{[item.locality, item.region, item.isoCountry].filter(Boolean).join(", ")}</span>
                </label>
              ))}
              {!searching && availableNumbers.length === 0 && (
                <p className="text-xs text-muted-foreground">No numbers found for this search. Try another area code/country.</p>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {successNumber && (
          <div className="rounded-md border border-accent/30 bg-accent/10 p-3 text-sm text-accent flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5" />
            <p>Business number is ready: {successNumber}</p>
          </div>
        )}

        <div className="rounded-lg border border-border p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Retell Voice Agent</p>
            <p className="text-xs text-muted-foreground mt-1">
              Setup your Retell agent after buying number. This links your number with the AI voice workflow.
            </p>
          </div>
          {retellAgentId && (
            <div className="rounded-md border border-accent/30 bg-accent/10 p-3 text-sm text-accent flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5" />
              <p>Retell agent connected: {retellAgentId}</p>
            </div>
          )}
          {retellError && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <p>{retellError}</p>
            </div>
          )}
          <Button
            type="button"
            onClick={handleProvisionRetell}
            disabled={retellLoading || !successNumber}
            variant="outline"
            className="h-9"
          >
            {retellLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Bot className="h-4 w-4 mr-2" />}
            {retellLoading ? "Setting up Retell..." : "Setup Retell Voice Agent"}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={handleBuyNumber}
            disabled={loading || Boolean(successNumber) || !selectedNumber}
            className="bg-gradient-primary text-primary-foreground"
          >
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <PhoneCall className="h-4 w-4 mr-2" />}
            {loading ? "Provisioning..." : successNumber ? "Number Purchased" : "Buy Number"}
          </Button>

          <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
