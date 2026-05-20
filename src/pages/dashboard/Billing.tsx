import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Download, TrendingUp, Check } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { billingApi, type BillingData } from "@/lib/api";

export default function Billing() {
  const [billing, setBilling] = useState<BillingData | null>(null);
  const [switchingTo, setSwitchingTo] = useState<string | null>(null);
  const [updatingPaymentMethod, setUpdatingPaymentMethod] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const currentUserEmail = localStorage.getItem("qc_user_email") || undefined;

  const loadBilling = async () => {
    const data = await billingApi.getInfo(currentUserEmail);
    setBilling(data);
    localStorage.setItem("qc_calls_used", String(data.callsUsed || 0));
    localStorage.setItem("qc_calls_limit", String(data.callsLimit || 0));
  };

  useEffect(() => {
    const run = async () => {
      await loadBilling();

      const params = new URLSearchParams(window.location.search);
      const checkoutState = params.get("checkout");
      const sessionId = params.get("session_id");

      if (checkoutState === "success" && sessionId) {
        try {
          await billingApi.confirmCheckoutSession({
            email: currentUserEmail,
            sessionId,
          });
          setActionSuccess("Payment successful. Your plan has been updated.");
          await loadBilling();
        } catch (error: any) {
          setActionError(error?.message || "Payment completed but confirmation failed. Please refresh.");
        }

        window.history.replaceState({}, "", "/dashboard/billing");
      }

      if (checkoutState === "cancel") {
        setActionError("Checkout was canceled.");
        window.history.replaceState({}, "", "/dashboard/billing");
      }
    };

    run();
  }, []);

  const handleSwitch = async (planName: string) => {
    setActionError("");
    setActionSuccess("");
    setSwitchingTo(planName);
    try {
      const session = await billingApi.createCheckoutSession({ email: currentUserEmail, planName });

      if (session.mode === "free") {
        setActionSuccess("Plan updated successfully.");
        await loadBilling();
        return;
      }

      if (!session.url) {
        throw new Error("Stripe checkout URL not received");
      }

      window.location.href = session.url;
      await loadBilling();
    } catch (error: any) {
      setActionError(error?.message || "Failed to start checkout");
    } finally {
      setSwitchingTo(null);
    }
  };

  const handleUpdatePaymentMethod = async () => {
    setActionError("");
    setUpdatingPaymentMethod(true);
    try {
      const data = await billingApi.getPaymentMethodUpdateUrl(currentUserEmail);
      if (!data?.url || data.provider === "unavailable") {
        throw new Error(data?.message || "Payment method update is not configured yet");
      }

      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (error: any) {
      setActionError(error?.message || "Failed to open payment update flow");
    } finally {
      setUpdatingPaymentMethod(false);
    }
  };

  const usagePercent = useMemo(() => {
    if (!billing) {
      return 0;
    }

    return Math.round((billing.callsUsed / Math.max(billing.callsLimit, 1)) * 100);
  }, [billing]);

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Current plan */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-surface p-6"
        >
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-0.5">Current Plan</h3>
              <p className="text-xs text-muted-foreground">Your subscription renews on {billing?.nextBillingDate || "-"}</p>
            </div>
            <Button disabled variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive text-xs">
              Cancel Plan (Soon)
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">{billing?.currentPlan?.name || "-"} Plan</span>
                <span className="status-badge status-active">Active</span>
              </div>
              <p className="text-sm text-muted-foreground">{billing?.callsLimit || 0} min/month - GBP {billing?.currentPlan?.price || 0}/mo</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl font-bold text-foreground">GBP {billing?.currentPlan?.price || 0}</div>
              <div className="text-xs text-muted-foreground">per month</div>
            </div>
          </div>

          {/* Usage bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">Monthly usage</span>
              <span className="font-semibold text-foreground">{billing?.callsUsed || 0} / {billing?.callsLimit || 0} min</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-primary"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Upgrade plans */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-surface p-5"
        >
          {actionSuccess && <p className="text-xs text-accent mb-3">{actionSuccess}</p>}
          {actionError && <p className="text-xs text-destructive mb-3">{actionError}</p>}

          {!!billing?.referralBonus?.referralCode && (
            <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <p className="text-xs text-muted-foreground">Your referral code</p>
              <p className="text-sm font-semibold text-foreground">{billing.referralBonus.referralCode}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Referral bonus: {billing.referralBonus.minutes} minutes
                {billing.referralBonus.expiresAt ? ` (expires ${new Date(billing.referralBonus.expiresAt).toLocaleDateString()})` : ""}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Upgrade Your Plan</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Choose any plan below and click Buy / Upgrade.</p>

          {(billing?.plans || []).length === 0 && (
            <p className="text-xs text-destructive mb-3">No plans found. Please contact support to initialize plans.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(billing?.plans || []).map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-3 text-center transition-all ${
                  plan.current
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 cursor-pointer hover:bg-muted/50"
                }`}
              >
                {plan.current && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Current
                  </div>
                )}
                <div className="text-sm font-semibold text-foreground mt-1">{plan.name}</div>
                <div className="text-lg font-bold text-foreground my-1">GBP {plan.price}</div>
                <div className="text-xs text-muted-foreground">{plan.calls} min</div>
                {!plan.current && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 h-7 text-xs"
                    onClick={() => handleSwitch(plan.name)}
                    disabled={switchingTo === plan.name}
                  >
                    {switchingTo === plan.name ? "Processing..." : "Buy / Upgrade"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment method */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-surface p-5"
        >
          <div className="flex items-center justify-between mb-4 gap-2">
            <h3 className="text-sm font-semibold text-foreground">Payment Method</h3>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={handleUpdatePaymentMethod}
              disabled={updatingPaymentMethod}
            >
              {updatingPaymentMethod ? "Opening..." : "Update"}
            </Button>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex h-8 w-12 items-center justify-center rounded-md bg-card border border-border text-xs font-bold text-foreground">
              VISA
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">**** **** **** 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2028</p>
            </div>
            <div className="ml-auto">
              <span className="status-badge status-completed">
                <Check className="h-3 w-3" />
                Default
              </span>
            </div>
          </div>
        </motion.div>

        {/* Invoices */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-surface overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Invoices</h3>
          </div>
          <div className="divide-y divide-border">
            {(billing?.invoices || []).map((inv) => (
              <div key={inv.id} className="flex flex-wrap sm:flex-nowrap items-center gap-3 px-5 py-3.5 hover:bg-muted/30">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{inv.amount}</span>
                <span className="status-badge status-completed">{inv.status}</span>
                <button disabled className="flex items-center gap-1 text-xs text-muted-foreground cursor-not-allowed font-medium" title="Invoice PDF download will be available in a future update">
                  <Download className="h-3.5 w-3.5" />
                  PDF Soon
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}

