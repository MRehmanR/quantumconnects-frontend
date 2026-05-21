import { type ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Copy, Gift, Link as LinkIcon, Save, Shield, SlidersHorizontal, User } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { featureTogglesApi, profileApi, referralsApi, type FeatureToggleConfig, type ReferralOverviewData } from "@/lib/api";

function ToggleRow({
  title,
  description,
  enabled,
  locked,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  onToggle: (value: boolean) => void;
  children?: ReactNode;
}) {
  return (
    <div className="py-3 border-b border-border last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
        <label className="relative inline-flex cursor-pointer mt-0.5">
          <input
            type="checkbox"
            checked={enabled}
            disabled={locked}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 peer-disabled:opacity-60" />
        </label>
      </div>
      {children ? <div className="mt-3 pl-0 sm:pl-2">{children}</div> : null}
    </div>
  );
}

export default function Settings() {
  const isAdmin = localStorage.getItem("qc_user_role") === "admin";
  const [active, setActive] = useState<"profile" | "toggles" | "notifications" | "security" | "referrals">("toggles");
  const [saving, setSaving] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [toggles, setToggles] = useState<FeatureToggleConfig | null>(null);
  const [referrals, setReferrals] = useState<ReferralOverviewData | null>(null);
  const [profile, setProfile] = useState({
    name: localStorage.getItem("qc_user_name") || "",
    businessName: localStorage.getItem("qc_business_name") || "",
    email: localStorage.getItem("qc_user_email") || "",
    inboundNumber: localStorage.getItem("qc_inbound_number") || "",
    timezone: localStorage.getItem("qc_user_timezone") || "UTC",
    retellSipTerminationUri: "",
    retellSipTrunkAuthUsername: "",
    retellSipTrunkAuthPassword: "",
  });
  const [sipPasswordTouched, setSipPasswordTouched] = useState(false);
  const [hasSipPasswordSaved, setHasSipPasswordSaved] = useState(false);

  useEffect(() => {
    const run = async () => {
      const currentUserEmail = localStorage.getItem("qc_user_email") || undefined;
      const [toggleData, referralsData, profileData] = await Promise.all([
        featureTogglesApi.get(),
        referralsApi.getOverview(currentUserEmail),
        profileApi.get(),
      ]);
      setToggles(toggleData);
      setReferrals(referralsData);
      setProfile({
        name: profileData.username || "",
        businessName: profileData.businessName || "",
        email: profileData.email || "",
        inboundNumber: profileData.inboundNumber || "",
        timezone: profileData.timezone || "UTC",
        retellSipTerminationUri: profileData.retellSipTerminationUri || "",
        retellSipTrunkAuthUsername: profileData.retellSipTrunkAuthUsername || "",
        retellSipTrunkAuthPassword: "",
      });
      setHasSipPasswordSaved(Boolean(profileData.hasRetellSipTrunkAuthPassword));
      setSipPasswordTouched(false);
    };
    run();
  }, []);

  const referralLink = referrals?.referralCode
    ? `${window.location.origin}/signup?ref=${encodeURIComponent(referrals.referralCode)}`
    : "";

  const copyText = async (text: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
  };

  const saveToggles = async () => {
    if (!toggles) return;
    setSaving(true);
    try {
      const data = await featureTogglesApi.update(toggles);
      setToggles(data);
    } finally {
      setSaving(false);
    }
  };

  const saveProfile = async () => {
    setProfileSaving(true);
    setProfileMessage("");
    try {
      const saved = await profileApi.update({
        username: profile.name,
        email: profile.email,
        businessName: profile.businessName,
        inboundNumber: profile.inboundNumber,
        timezone: profile.timezone,
        retellSipTerminationUri: profile.retellSipTerminationUri,
        retellSipTrunkAuthUsername: profile.retellSipTrunkAuthUsername,
        ...(sipPasswordTouched ? { retellSipTrunkAuthPassword: profile.retellSipTrunkAuthPassword } : {}),
      });

      localStorage.setItem("qc_user_name", saved.username || "");
      localStorage.setItem("qc_user_email", saved.email || "");
      localStorage.setItem("qc_business_name", saved.businessName || "");
      localStorage.setItem("qc_owner_phone", saved.ownerPhone || "");
      localStorage.setItem("qc_inbound_number", saved.inboundNumber || "");
      localStorage.setItem("qc_user_timezone", saved.timezone || "UTC");

      setProfile((prev) => ({
        ...prev,
        name: saved.username || prev.name,
        businessName: saved.businessName || "",
        email: saved.email || "",
        inboundNumber: saved.inboundNumber || "",
        timezone: saved.timezone || "UTC",
        retellSipTerminationUri: saved.retellSipTerminationUri || "",
        retellSipTrunkAuthUsername: saved.retellSipTrunkAuthUsername || "",
        retellSipTrunkAuthPassword: "",
      }));
      setHasSipPasswordSaved(Boolean(saved.hasRetellSipTrunkAuthPassword));
      setSipPasswordTouched(false);

      setProfileMessage("Profile saved successfully.");
    } catch (error: any) {
      setProfileMessage(error?.message || "Failed to save profile");
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-56 flex-shrink-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActive("toggles")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active === "toggles" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Feature Toggles
              </button>
              <button
                onClick={() => setActive("profile")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active === "profile" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                onClick={() => setActive("notifications")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active === "notifications" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Bell className="h-4 w-4" />
                Notifications
              </button>
              <button
                onClick={() => setActive("security")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active === "security" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Shield className="h-4 w-4" />
                Security
              </button>
              <button
                onClick={() => setActive("referrals")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active === "referrals" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Gift className="h-4 w-4" />
                Referrals
              </button>
            </nav>
          </div>

          <div className="flex-1">
            {active === "profile" && (
              <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="card-surface p-6 space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Business Profile</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Update your business information</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Owner Name</Label>
                    <Input className="h-9 text-sm" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Business Name</Label>
                    <Input className="h-9 text-sm" value={profile.businessName} onChange={(e) => setProfile({ ...profile, businessName: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Email</Label>
                    <Input className="h-9 text-sm" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Inbound Booking Number</Label>
                    <Input className="h-9 text-sm" value={profile.inboundNumber} onChange={(e) => setProfile({ ...profile, inboundNumber: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Timezone</Label>
                    <Input className="h-9 text-sm" value={profile.timezone} onChange={(e) => setProfile({ ...profile, timezone: e.target.value })} />
                  </div>
                  {!isAdmin ? (
                    <>
                      <div className="sm:col-span-2 pt-2 border-t border-border">
                        <p className="text-xs font-semibold text-foreground mb-2">Per-Business SIP Trunk (Retell Import)</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          These settings are saved per business and used when importing Twilio SIP numbers into Retell.
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium mb-1.5 block">Termination URI</Label>
                        <Input
                          className="h-9 text-sm"
                          placeholder="example.pstn.twilio.com"
                          value={profile.retellSipTerminationUri}
                          onChange={(e) => setProfile({ ...profile, retellSipTerminationUri: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium mb-1.5 block">SIP Username</Label>
                        <Input
                          className="h-9 text-sm"
                          placeholder="Twilio SIP credential username"
                          value={profile.retellSipTrunkAuthUsername}
                          onChange={(e) => setProfile({ ...profile, retellSipTrunkAuthUsername: e.target.value })}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-xs font-medium mb-1.5 block">SIP Password</Label>
                        <Input
                          type="password"
                          className="h-9 text-sm"
                          placeholder={hasSipPasswordSaved ? "Saved. Enter new value to rotate, or leave unchanged." : "Set SIP password"}
                          value={profile.retellSipTrunkAuthPassword}
                          onChange={(e) => {
                            setSipPasswordTouched(true);
                            setProfile({ ...profile, retellSipTrunkAuthPassword: e.target.value });
                          }}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
                {profileMessage && (
                  <p className={`text-xs ${profileMessage.includes("success") ? "text-accent" : "text-destructive"}`}>
                    {profileMessage}
                  </p>
                )}
                <Button size="sm" disabled={profileSaving} onClick={saveProfile} className="bg-gradient-primary text-primary-foreground gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  {profileSaving ? "Saving..." : "Save Profile"}
                </Button>
              </motion.div>
            )}

            {active === "toggles" && toggles && (
              <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div className="card-surface p-4">
                  <p className="text-sm text-foreground font-medium">Industry-based default setup is applied from onboarding.</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Each toggle has a plain-English description below, and you can change any setting at any time.
                  </p>
                </div>

                <div className="card-surface p-6">
                  <h3 className="text-sm font-semibold text-foreground">Call Handling</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-4">Control how calls are answered and routed</p>
                  <ToggleRow
                    title="Appointment booking"
                    description="Allow AI to book appointments during calls"
                    enabled={toggles.callHandling.appointmentBooking.enabled}
                    onToggle={(enabled) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, appointmentBooking: { enabled } } })}
                  />
                  <ToggleRow
                    title="Deposit collection"
                    description="Collect deposits and configure amount/window"
                    enabled={toggles.callHandling.depositCollection.enabled}
                    onToggle={(enabled) =>
                      setToggles({ ...toggles, callHandling: { ...toggles.callHandling, depositCollection: { ...toggles.callHandling.depositCollection, enabled } } })
                    }
                  >
                    {toggles.callHandling.depositCollection.enabled && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          type="number"
                          value={toggles.callHandling.depositCollection.amount}
                          onChange={(e) => setToggles({
                            ...toggles,
                            callHandling: {
                              ...toggles.callHandling,
                              depositCollection: { ...toggles.callHandling.depositCollection, amount: Number(e.target.value) },
                            },
                          })}
                          placeholder="Deposit amount"
                          className="h-8 text-xs"
                        />
                        <Input
                          type="number"
                          value={toggles.callHandling.depositCollection.paymentWindowHours}
                          onChange={(e) => setToggles({
                            ...toggles,
                            callHandling: {
                              ...toggles.callHandling,
                              depositCollection: { ...toggles.callHandling.depositCollection, paymentWindowHours: Number(e.target.value) },
                            },
                          })}
                          placeholder="Payment window (hours)"
                          className="h-8 text-xs"
                        />
                      </div>
                    )}
                  </ToggleRow>
                  <ToggleRow title="Waitlist management" description="Auto-fill slots from waitlist" enabled={toggles.callHandling.waitlistManagement.enabled} onToggle={(enabled) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, waitlistManagement: { enabled } } })} />
                  <ToggleRow title="Urgent call routing" description="Route urgent calls by keyword" enabled={toggles.callHandling.urgentCallRouting.enabled} onToggle={(enabled) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, urgentCallRouting: { ...toggles.callHandling.urgentCallRouting, enabled } } })}>
                    {toggles.callHandling.urgentCallRouting.enabled && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input className="h-8 text-xs" value={toggles.callHandling.urgentCallRouting.triggerKeywords.join(", ")} onChange={(e) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, urgentCallRouting: { ...toggles.callHandling.urgentCallRouting, triggerKeywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } } })} placeholder="urgent, emergency, asap" />
                        <Input className="h-8 text-xs" value={toggles.callHandling.urgentCallRouting.transferNumber} onChange={(e) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, urgentCallRouting: { ...toggles.callHandling.urgentCallRouting, transferNumber: e.target.value } } })} placeholder="Transfer number" />
                      </div>
                    )}
                  </ToggleRow>
                  <ToggleRow title="Out of hours handling" description="Configure after-hours behaviour" enabled={toggles.callHandling.outOfHoursHandling.enabled} onToggle={(enabled) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, outOfHoursHandling: { ...toggles.callHandling.outOfHoursHandling, enabled } } })}>
                    {toggles.callHandling.outOfHoursHandling.enabled && (
                      <Input className="h-8 text-xs" value={toggles.callHandling.outOfHoursHandling.openingHours} onChange={(e) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, outOfHoursHandling: { ...toggles.callHandling.outOfHoursHandling, openingHours: e.target.value } } })} placeholder="Opening hours" />
                    )}
                  </ToggleRow>
                  <ToggleRow title="Call recording" description="Record calls for quality and compliance" enabled={toggles.callHandling.callRecording.enabled} onToggle={(enabled) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, callRecording: { enabled } } })} />
                  <ToggleRow title="Call transcripts emailed after each call" description="Send transcript emails automatically" enabled={toggles.callHandling.callTranscriptsEmailed.enabled} onToggle={(enabled) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, callTranscriptsEmailed: { enabled } } })} />
                  <ToggleRow title="Caller ID capture" description="Capture caller details for records" enabled={toggles.callHandling.callerIdCapture.enabled} onToggle={(enabled) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, callerIdCapture: { enabled } } })} />
                </div>

                <div className="card-surface p-6">
                  <h3 className="text-sm font-semibold text-foreground">Customer Communication</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-4">Automations for follow-up and reminders</p>
                  <ToggleRow title="Google Review automation" description="Auto-request reviews from customers" enabled={toggles.customerCommunication.googleReviewAutomation.enabled} onToggle={(enabled) => setToggles({ ...toggles, customerCommunication: { ...toggles.customerCommunication, googleReviewAutomation: { enabled } } })} />
                  <ToggleRow title="SMS follow-up after booking" description="Send a confirmation SMS after booking" enabled={toggles.customerCommunication.smsFollowUpAfterBooking.enabled} onToggle={(enabled) => setToggles({ ...toggles, customerCommunication: { ...toggles.customerCommunication, smsFollowUpAfterBooking: { enabled } } })} />
                  <ToggleRow title="Appointment reminder calls" description="Configure reminder lead time" enabled={toggles.customerCommunication.appointmentReminderCalls.enabled} onToggle={(enabled) => setToggles({ ...toggles, customerCommunication: { ...toggles.customerCommunication, appointmentReminderCalls: { ...toggles.customerCommunication.appointmentReminderCalls, enabled } } })}>
                    {toggles.customerCommunication.appointmentReminderCalls.enabled && (
                      <Input type="number" className="h-8 text-xs max-w-xs" value={toggles.customerCommunication.appointmentReminderCalls.hoursBefore} onChange={(e) => setToggles({ ...toggles, customerCommunication: { ...toggles.customerCommunication, appointmentReminderCalls: { ...toggles.customerCommunication.appointmentReminderCalls, hoursBefore: Number(e.target.value) } } })} placeholder="Hours before appointment" />
                    )}
                  </ToggleRow>
                  <ToggleRow title="Cancellation handling" description="Handle cancellations with scripts" enabled={toggles.customerCommunication.cancellationHandling.enabled} onToggle={(enabled) => setToggles({ ...toggles, customerCommunication: { ...toggles.customerCommunication, cancellationHandling: { enabled } } })} />
                  <ToggleRow title="Rescheduling handling" description="Offer rescheduling options" enabled={toggles.customerCommunication.reschedulingHandling.enabled} onToggle={(enabled) => setToggles({ ...toggles, customerCommunication: { ...toggles.customerCommunication, reschedulingHandling: { enabled } } })} />
                  <ToggleRow title="Callback request option" description="Let caller request callback" enabled={toggles.customerCommunication.callbackRequestOption.enabled} onToggle={(enabled) => setToggles({ ...toggles, customerCommunication: { ...toggles.customerCommunication, callbackRequestOption: { enabled } } })} />
                </div>

                <div className="card-surface p-6">
                  <h3 className="text-sm font-semibold text-foreground">Business Configuration</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-4">Voice, language, and business customisations</p>
                  <ToggleRow title="Custom voice" description="Switch between standard and cloned voice" enabled={toggles.businessConfiguration.customVoice.enabled} onToggle={(enabled) => setToggles({ ...toggles, businessConfiguration: { ...toggles.businessConfiguration, customVoice: { ...toggles.businessConfiguration.customVoice, enabled } } })}>
                    {toggles.businessConfiguration.customVoice.enabled && (
                      <Input className="h-8 text-xs max-w-xs" value={toggles.businessConfiguration.customVoice.mode} onChange={(e) => setToggles({ ...toggles, businessConfiguration: { ...toggles.businessConfiguration, customVoice: { ...toggles.businessConfiguration.customVoice, mode: e.target.value } } })} placeholder="standard or cloned" />
                    )}
                  </ToggleRow>
                  <ToggleRow title="Multi-language support" description="Enable multiple supported languages" enabled={toggles.businessConfiguration.multiLanguageSupport.enabled} onToggle={(enabled) => setToggles({ ...toggles, businessConfiguration: { ...toggles.businessConfiguration, multiLanguageSupport: { ...toggles.businessConfiguration.multiLanguageSupport, enabled } } })}>
                    {toggles.businessConfiguration.multiLanguageSupport.enabled && (
                      <Input className="h-8 text-xs" value={toggles.businessConfiguration.multiLanguageSupport.languages.join(", ")} onChange={(e) => setToggles({ ...toggles, businessConfiguration: { ...toggles.businessConfiguration, multiLanguageSupport: { ...toggles.businessConfiguration.multiLanguageSupport, languages: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } } })} placeholder="English, Spanish" />
                    )}
                  </ToggleRow>
                  <ToggleRow title="Custom hold music" description="Play business-specific hold music" enabled={toggles.businessConfiguration.customHoldMusic.enabled} onToggle={(enabled) => setToggles({ ...toggles, businessConfiguration: { ...toggles.businessConfiguration, customHoldMusic: { enabled } } })} />
                  <ToggleRow title="Personalised greeting script" description="Set your preferred opening line" enabled={toggles.businessConfiguration.personalisedGreetingScript.enabled} onToggle={(enabled) => setToggles({ ...toggles, businessConfiguration: { ...toggles.businessConfiguration, personalisedGreetingScript: { ...toggles.businessConfiguration.personalisedGreetingScript, enabled } } })}>
                    {toggles.businessConfiguration.personalisedGreetingScript.enabled && (
                      <Input className="h-8 text-xs" value={toggles.businessConfiguration.personalisedGreetingScript.openingLine} onChange={(e) => setToggles({ ...toggles, businessConfiguration: { ...toggles.businessConfiguration, personalisedGreetingScript: { ...toggles.businessConfiguration.personalisedGreetingScript, openingLine: e.target.value } } })} placeholder="Preferred opening line" />
                    )}
                  </ToggleRow>
                  <ToggleRow title="Staff name mentions" description="Mention team members by name" enabled={toggles.businessConfiguration.staffNameMentions.enabled} onToggle={(enabled) => setToggles({ ...toggles, businessConfiguration: { ...toggles.businessConfiguration, staffNameMentions: { ...toggles.businessConfiguration.staffNameMentions, enabled } } })}>
                    {toggles.businessConfiguration.staffNameMentions.enabled && (
                      <Input className="h-8 text-xs" value={toggles.businessConfiguration.staffNameMentions.staffNames.join(", ")} onChange={(e) => setToggles({ ...toggles, businessConfiguration: { ...toggles.businessConfiguration, staffNameMentions: { ...toggles.businessConfiguration.staffNameMentions, staffNames: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } } })} placeholder="Alice, Bob" />
                    )}
                  </ToggleRow>
                </div>

                <div className="card-surface p-6">
                  <h3 className="text-sm font-semibold text-foreground">Payments</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-4">Payment and refund handling behaviour</p>
                  <ToggleRow title="Deposit collection" description="Enable deposits per service" enabled={toggles.payments.depositCollection.enabled} onToggle={(enabled) => setToggles({ ...toggles, payments: { ...toggles.payments, depositCollection: { ...toggles.payments.depositCollection, enabled } } })} />
                  <ToggleRow title="Payment confirmation SMS to client" description="Send SMS once payment is confirmed" enabled={toggles.payments.paymentConfirmationSms.enabled} onToggle={(enabled) => setToggles({ ...toggles, payments: { ...toggles.payments, paymentConfirmationSms: { enabled } } })} />
                  <ToggleRow title="Refund handling script" description="Use refund-response script during calls" enabled={toggles.payments.refundHandlingScript.enabled} onToggle={(enabled) => setToggles({ ...toggles, payments: { ...toggles.payments, refundHandlingScript: { enabled } } })} />
                </div>

                <div className="card-surface p-6">
                  <h3 className="text-sm font-semibold text-foreground">Reporting and Alerts</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-4">Emails and alert behaviour for performance</p>
                  <ToggleRow title="Weekly call summary email" description="Send weekly summary reports" enabled={toggles.reportingAndAlerts.weeklyCallSummaryEmail.enabled} onToggle={(enabled) => setToggles({ ...toggles, reportingAndAlerts: { ...toggles.reportingAndAlerts, weeklyCallSummaryEmail: { enabled } } })} />
                  <ToggleRow title="70% usage alert" description="Always on for quota protection" enabled={toggles.reportingAndAlerts.usageAlert70Percent.enabled} locked onToggle={() => undefined} />
                  <ToggleRow title="Real-time missed call alerts" description="Alert instantly for missed calls" enabled={toggles.reportingAndAlerts.realTimeMissedCallAlerts.enabled} onToggle={(enabled) => setToggles({ ...toggles, reportingAndAlerts: { ...toggles.reportingAndAlerts, realTimeMissedCallAlerts: { enabled } } })} />
                  <ToggleRow title="Monthly performance report" description="Send monthly KPI report" enabled={toggles.reportingAndAlerts.monthlyPerformanceReport.enabled} onToggle={(enabled) => setToggles({ ...toggles, reportingAndAlerts: { ...toggles.reportingAndAlerts, monthlyPerformanceReport: { enabled } } })} />
                </div>

                <div className="flex justify-end">
                  <Button size="sm" disabled={saving} onClick={saveToggles} className="bg-gradient-primary text-primary-foreground gap-1.5">
                    <Save className="h-3.5 w-3.5" />
                    {saving ? "Saving..." : "Save Feature Toggles"}
                  </Button>
                </div>
              </motion.div>
            )}

            {active === "notifications" && (
              <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="card-surface p-6 space-y-4">
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

            {active === "security" && (
              <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="card-surface p-6 space-y-5">
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

            {active === "referrals" && referrals && (
              <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div className="card-surface p-6">
                  <h3 className="text-sm font-semibold text-foreground">Referral System</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Share your code or link. When a referred user buys a plan, you get 20 bonus minutes for 7 days.</p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-xs text-muted-foreground">Referral code</p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">{referrals.referralCode || "-"}</p>
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => copyText(referrals.referralCode)}>
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border p-3">
                      <p className="text-xs text-muted-foreground">Bonus balance</p>
                      <p className="text-sm font-semibold text-foreground mt-1">{referrals.referralBonusMinutes} minutes</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {referrals.referralBonusExpiresAt ? `Expires ${new Date(referrals.referralBonusExpiresAt).toLocaleDateString()}` : "No active expiry"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">Referral link</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Input readOnly className="h-8 text-xs" value={referralLink} />
                      <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => copyText(referralLink)}>
                        <LinkIcon className="h-3.5 w-3.5 mr-1" />
                        Copy link
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">New users can join using either your link or your referral code during signup.</p>
                  </div>
                </div>

                <div className="card-surface p-6">
                  <h3 className="text-sm font-semibold text-foreground">Referred Users</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-4">Users who joined using your referral link or code</p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                          <th className="text-left py-2">Name</th>
                          <th className="text-left py-2">Email</th>
                          <th className="text-left py-2">Joined Via</th>
                          <th className="text-left py-2">Joined</th>
                          <th className="text-left py-2">Plan</th>
                          <th className="text-left py-2">Bonus</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referrals.referredUsers.map((u) => (
                          <tr key={u.id} className="border-b border-border/60">
                            <td className="py-2 text-foreground font-medium">{u.name}</td>
                            <td className="py-2 text-muted-foreground">{u.email}</td>
                            <td className="py-2 text-foreground">{u.joinedVia === "link" ? "Link" : "Code"}</td>
                            <td className="py-2 text-muted-foreground">{u.joinedAt}</td>
                            <td className="py-2 text-foreground">{u.plan}</td>
                            <td className="py-2 text-muted-foreground">{u.bonusAwardedMinutes > 0 ? `${u.bonusAwardedMinutes} min` : "Not awarded"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {referrals.referredUsers.length === 0 && (
                    <p className="text-xs text-muted-foreground mt-3">No referred users yet.</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
