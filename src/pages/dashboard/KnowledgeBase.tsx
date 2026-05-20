import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot, Building2, CalendarDays, ChevronRight, Clock3, Info, Plus, Save, Trash2,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  aiReceptionistApi,
  featureTogglesApi,
  knowledgeBaseApi,
  profileApi,
  type AiReceptionistConfigData,
  type FeatureToggleConfig,
  type KnowledgeBaseItem,
  type ProfileData,
} from "@/lib/api";

type TabKey = "overview" | "setup" | "faqs" | "training" | "booking";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "setup", label: "Setup" },
  { key: "faqs", label: "FAQs" },
  { key: "training", label: "Training" },
  { key: "booking", label: "Booking" },
];

const defaultReceptionistConfig: AiReceptionistConfigData = {
  name: "Aria",
  voice: "Aria",
  customGreeting: "",
  status: "paused",
  scheduleMode: "always_on",
  weeklySchedule: [
    { day: "monday", enabled: true, start: "09:00", end: "17:00" },
    { day: "tuesday", enabled: true, start: "09:00", end: "17:00" },
    { day: "wednesday", enabled: true, start: "09:00", end: "17:00" },
    { day: "thursday", enabled: true, start: "09:00", end: "17:00" },
    { day: "friday", enabled: true, start: "09:00", end: "17:00" },
    { day: "saturday", enabled: false, start: "09:00", end: "17:00" },
    { day: "sunday", enabled: false, start: "09:00", end: "17:00" },
  ],
  faqActiveMap: {},
  bookingRules: {
    duration: "15 minutes",
    buffer: "None",
    minNotice: "1 hour",
    maxSlotsPerCall: "2 slots",
  },
  isActiveNow: false,
  timezone: "UTC",
};

const defaultFaqs = [
  { title: "What are your opening hours?", content: "We are open Monday to Friday from 9:00am to 6:00pm, and Saturday from 10:00am to 4:00pm." },
  { title: "How do I book an appointment?", content: "You can book online through our website, or I can help secure a slot now." },
  { title: "Do you require a deposit?", content: "Yes, we request a deposit to confirm your booking." },
  { title: "What is your cancellation policy?", content: "Please provide at least 24 hours notice for cancellations or rescheduling." },
  { title: "Where are you located?", content: "We are located in central London. Full address is shared in your booking confirmation." },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="relative inline-flex cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-12 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6" />
    </label>
  );
}

export default function KnowledgeBase() {
  const [tab, setTab] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [toggles, setToggles] = useState<FeatureToggleConfig | null>(null);
  const [entries, setEntries] = useState<KnowledgeBaseItem[]>([]);
  const [config, setConfig] = useState<AiReceptionistConfigData>(defaultReceptionistConfig);

  const [newTraining, setNewTraining] = useState({ title: "", content: "" });
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  useEffect(() => {
    const run = async () => {
      try {
        const [profileData, toggleData, kbData, configData] = await Promise.all([
          profileApi.get(),
          featureTogglesApi.get(),
          knowledgeBaseApi.getAll(),
          aiReceptionistApi.getConfig(),
        ]);
        setProfile(profileData);
        setToggles(toggleData);
        setEntries(kbData);
        setConfig({
          ...defaultReceptionistConfig,
          ...configData,
          bookingRules: {
            ...defaultReceptionistConfig.bookingRules,
            ...(configData.bookingRules || {}),
          },
        });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const faqEntries = useMemo(() => entries.filter((entry) => entry.category === "FAQ"), [entries]);
  const trainingEntries = useMemo(() => entries.filter((entry) => entry.category !== "FAQ"), [entries]);
  const mergedFaqs = useMemo(
    () =>
      faqEntries.length > 0
        ? faqEntries
        : defaultFaqs.map((item, index) => ({
            id: `default-${index + 1}`,
            title: item.title,
            content: item.content,
            category: "FAQ",
            attachmentName: "",
            attachmentDataUrl: "",
          })),
    [faqEntries]
  );

  const saveReceptionistConfig = async (nextConfig?: Partial<AiReceptionistConfigData>) => {
    setSaving(true);
    setMessage("");
    try {
      const payload = nextConfig || config;
      const saved = await aiReceptionistApi.updateConfig(payload);
      setConfig((prev) => ({ ...prev, ...saved }));
      setMessage("AI receptionist settings saved.");
    } catch (error: any) {
      setMessage(error?.message || "Failed to save AI receptionist settings");
    } finally {
      setSaving(false);
    }
  };

  const saveFeatureToggles = async () => {
    if (!toggles) return;
    setSaving(true);
    setMessage("");
    try {
      const updated = await featureTogglesApi.update(toggles);
      setToggles(updated);
      setMessage("Call handling settings saved.");
    } catch (error: any) {
      setMessage(error?.message || "Failed to save call handling settings");
    } finally {
      setSaving(false);
    }
  };

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    setMessage("");
    try {
      const saved = await profileApi.update({
        username: profile.username,
        email: profile.email,
        businessName: profile.businessName,
        ownerPhone: profile.ownerPhone,
        inboundNumber: profile.inboundNumber,
        timezone: profile.timezone,
        retellSipTerminationUri: profile.retellSipTerminationUri,
        retellSipTrunkAuthUsername: profile.retellSipTrunkAuthUsername,
      });
      setProfile((prev) => (prev ? { ...prev, ...saved } : prev));
      localStorage.setItem("qc_business_name", saved.businessName || "");
      localStorage.setItem("qc_owner_phone", saved.ownerPhone || "");
      localStorage.setItem("qc_inbound_number", saved.inboundNumber || "");
      localStorage.setItem("qc_user_timezone", saved.timezone || "UTC");
      setMessage("Business setup saved.");
    } catch (error: any) {
      setMessage(error?.message || "Failed to save business setup");
    } finally {
      setSaving(false);
    }
  };

  const addTrainingEntry = async () => {
    if (!newTraining.title.trim() || !newTraining.content.trim()) return;
    setSaving(true);
    setMessage("");
    try {
      const created = await knowledgeBaseApi.create({
        title: newTraining.title.trim(),
        content: newTraining.content.trim(),
        category: "Training",
      });
      setEntries((prev) => [created, ...prev]);
      setNewTraining({ title: "", content: "" });
      setMessage("Training data added.");
    } catch (error: any) {
      setMessage(error?.message || "Failed to add training data");
    } finally {
      setSaving(false);
    }
  };

  const addFaqEntry = async () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;
    setSaving(true);
    setMessage("");
    try {
      const created = await knowledgeBaseApi.create({
        title: newFaq.question.trim(),
        content: newFaq.answer.trim(),
        category: "FAQ",
      });
      setEntries((prev) => [created, ...prev]);
      setConfig((prev) => ({ ...prev, faqActiveMap: { ...prev.faqActiveMap, [created.id]: true } }));
      setNewFaq({ question: "", answer: "" });
      setMessage("FAQ added.");
    } catch (error: any) {
      setMessage(error?.message || "Failed to add FAQ");
    } finally {
      setSaving(false);
    }
  };

  const deleteEntry = async (id: string) => {
    if (id.startsWith("default-")) return;
    await knowledgeBaseApi.delete(id);
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  if (loading || !profile || !toggles) {
    return (
      <DashboardShell>
        <div className="rounded-2xl border border-border bg-card/60 p-6">
          <p className="text-sm text-muted-foreground">Loading AI receptionist...</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="card-surface p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">My AI Receptionist</h2>
            <p className={`text-sm font-semibold capitalize ${config.status === "paused" ? "text-amber-500" : "text-primary"}`}>
              Ã¢â‚¬Â¢ {config.status}
            </p>
          </div>

          <div className="mt-4 inline-flex rounded-xl p-1 bg-muted/40 border border-border overflow-x-auto">
            {tabs.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  tab === item.key ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {message && <p className="mt-3 text-xs text-primary">{message}</p>}
        </div>

        {tab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="card-surface p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center">
                  <Bot className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-semibold text-foreground">{config.name}</p>
                  <p className="text-muted-foreground">AI Receptionist Ã‚Â· Voice: {config.voice}</p>
                  <span className="mt-1 inline-flex rounded-full bg-amber-500/20 text-amber-500 px-3 py-1 text-xs font-semibold">7-day trial</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-border pb-2"><span className="text-muted-foreground uppercase">Business</span><span className="text-foreground font-semibold">{profile.businessName || "Not set"}</span></div>
                <div className="flex items-center justify-between border-b border-border pb-2"><span className="text-muted-foreground uppercase">Phone</span><span className="text-foreground font-semibold">{profile.inboundNumber || "Not assigned"}</span></div>
                <div className="flex items-center justify-between border-b border-border pb-2"><span className="text-muted-foreground uppercase">Timezone</span><span className="text-foreground font-semibold">{profile.timezone || "UTC"}</span></div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {(["live", "paused", "scheduled"] as const).map((value) => (
                  <button
                    key={value}
                    onClick={() => setConfig((prev) => ({ ...prev, status: value }))}
                    className={`rounded-xl border py-2 text-sm font-semibold capitalize ${
                      config.status === value
                        ? value === "paused"
                          ? "border-amber-500/50 bg-amber-500/15 text-amber-500"
                          : "border-primary/50 bg-primary/15 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="card-surface p-5">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <p className="text-foreground">After-hours message</p>
                  <Toggle
                    checked={toggles.callHandling.outOfHoursHandling.enabled}
                    onChange={(enabled) => setToggles({
                      ...toggles,
                      callHandling: { ...toggles.callHandling, outOfHoursHandling: { ...toggles.callHandling.outOfHoursHandling, enabled } },
                    })}
                  />
                </div>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <p className="text-foreground">Google Reviews request</p>
                  <Toggle
                    checked={toggles.customerCommunication.googleReviewAutomation.enabled}
                    onChange={(enabled) => setToggles({
                      ...toggles,
                      customerCommunication: { ...toggles.customerCommunication, googleReviewAutomation: { enabled } },
                    })}
                  />
                </div>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <p className="text-foreground">Deposit collection</p>
                  <Toggle
                    checked={toggles.callHandling.depositCollection.enabled}
                    onChange={(enabled) => setToggles({
                      ...toggles,
                      callHandling: { ...toggles.callHandling, depositCollection: { ...toggles.callHandling.depositCollection, enabled } },
                    })}
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider mb-2 block">Urgent call routing number</Label>
                  <Input
                    value={toggles.callHandling.urgentCallRouting.transferNumber}
                    onChange={(e) => setToggles({
                      ...toggles,
                      callHandling: { ...toggles.callHandling, urgentCallRouting: { ...toggles.callHandling.urgentCallRouting, transferNumber: e.target.value } },
                    })}
                  />
                </div>
                <button onClick={() => setTab("setup")} className="w-full rounded-xl border border-primary/40 bg-primary/10 p-4 text-left flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">Greeting & Voice</p>
                    <p className="text-sm text-muted-foreground">Customise name, voice and greeting</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground" onClick={saveFeatureToggles} disabled={saving}>{saving ? "Saving..." : "Save Quick Settings"}</Button>
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground" onClick={() => saveReceptionistConfig()} disabled={saving}>{saving ? "Saving..." : "Save Status"}</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "setup" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="card-surface p-5 space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Business Name</Label><Input value={profile.businessName} onChange={(e) => setProfile({ ...profile, businessName: e.target.value })} /></div>
                <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Phone Number</Label><Input value={profile.ownerPhone} onChange={(e) => setProfile({ ...profile, ownerPhone: e.target.value })} /></div>
                <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Inbound Number</Label><Input value={profile.inboundNumber} onChange={(e) => setProfile({ ...profile, inboundNumber: e.target.value })} /></div>
                <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Timezone</Label><Input value={profile.timezone} onChange={(e) => setProfile({ ...profile, timezone: e.target.value })} /></div>
              </div>
            </div>

            <div className="card-surface p-5 space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><Bot className="h-5 w-5 text-primary" /> AI Receptionist Name & Voice</h3>
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Receptionist Name</Label><Input className="max-w-xs" value={config.name} onChange={(e) => setConfig((prev) => ({ ...prev, name: e.target.value }))} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {["Aria", "Sophie", "Emma", "Grace", "James", "Oliver", "Marcus", "Ethan"].map((voice) => (
                  <button key={voice} className={`rounded-xl border p-3 text-left ${config.voice === voice ? "border-primary bg-primary/15" : "border-border"}`} onClick={() => setConfig((prev) => ({ ...prev, voice }))}>
                    <p className="font-semibold text-foreground">{voice}</p>
                    <p className="text-xs text-muted-foreground">{["Aria", "Sophie", "Emma", "Grace"].includes(voice) ? "Female voice" : "Male voice"}</p>
                  </button>
                ))}
              </div>
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Custom Greeting</Label><Textarea rows={4} value={config.customGreeting} onChange={(e) => setConfig((prev) => ({ ...prev, customGreeting: e.target.value }))} /></div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setShowScheduleModal(true)}><Clock3 className="h-4 w-4 mr-1" /> Open Agent Schedule</Button>
                <Button size="sm" className="bg-primary text-primary-foreground" onClick={saveProfile} disabled={saving}>{saving ? "Saving..." : "Save Business Details"}</Button>
                <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => saveReceptionistConfig()} disabled={saving}>{saving ? "Saving..." : "Save Voice & Greeting"}</Button>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "faqs" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="card-surface p-5 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Suggested FAQs</h3>
              {mergedFaqs.map((faq) => {
                const active = config.faqActiveMap[faq.id] ?? true;
                return (
                  <div key={faq.id} className="rounded-xl border border-border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Toggle checked={active} onChange={(enabled) => setConfig((prev) => ({ ...prev, faqActiveMap: { ...prev.faqActiveMap, [faq.id]: enabled } }))} />
                        <p className="font-semibold text-foreground">{faq.title}</p>
                      </div>
                      {!faq.id.startsWith("default-") && <button className="text-muted-foreground hover:text-destructive" onClick={() => deleteEntry(faq.id)}><Trash2 className="h-4 w-4" /></button>}
                    </div>
                    <p className="mt-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground/90">{faq.content}</p>
                  </div>
                );
              })}
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => saveReceptionistConfig()} disabled={saving}>{saving ? "Saving..." : "Save FAQ Toggles"}</Button>
            </div>

            <div className="card-surface p-5 space-y-3">
              <h3 className="text-base font-semibold text-foreground">Add a Custom FAQ</h3>
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Question</Label><Input value={newFaq.question} onChange={(e) => setNewFaq((prev) => ({ ...prev, question: e.target.value }))} /></div>
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Answer</Label><Textarea rows={4} value={newFaq.answer} onChange={(e) => setNewFaq((prev) => ({ ...prev, answer: e.target.value }))} /></div>
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={addFaqEntry} disabled={saving}><Plus className="h-4 w-4 mr-1" /> Add FAQ</Button>
            </div>
          </motion.div>
        )}

        {tab === "training" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="card-surface p-5 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Training Data</h3>
              <p className="text-sm text-muted-foreground">Add services, pricing, team details and policies.</p>
              {trainingEntries.map((entry) => (
                <div key={entry.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">{entry.title}</p>
                    <button className="text-muted-foreground hover:text-destructive" onClick={() => deleteEntry(entry.id)}><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{entry.content}</p>
                </div>
              ))}
              {trainingEntries.length === 0 && <p className="text-sm text-muted-foreground">No training entries yet.</p>}
            </div>
            <div className="card-surface p-5 space-y-3">
              <h3 className="text-base font-semibold text-foreground">Add Training Data</h3>
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Title</Label><Input value={newTraining.title} onChange={(e) => setNewTraining((prev) => ({ ...prev, title: e.target.value }))} /></div>
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Content</Label><Textarea rows={6} value={newTraining.content} onChange={(e) => setNewTraining((prev) => ({ ...prev, content: e.target.value }))} /></div>
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={addTrainingEntry} disabled={saving}><Plus className="h-4 w-4 mr-1" /> Add to Training</Button>
            </div>
          </motion.div>
        )}

        {tab === "booking" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-5 space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> Booking Configuration</h3>
            <p className="text-sm text-muted-foreground">Connect your calendar and configure slot offering rules.</p>
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-muted-foreground flex items-start gap-2"><Info className="h-4 w-4 text-primary mt-0.5" /><p>When connected, Aria can check live availability during calls.</p></div>

            <div className="space-y-2">
              {[
                { name: "Google Calendar", desc: "Connect your Google account." },
                { name: "Microsoft Outlook", desc: "Connect via Microsoft 365 or Outlook." },
                { name: "Apple Calendar / iCal", desc: "Connect via iCloud or CalDAV URL." },
              ].map((item) => (
                <div key={item.name} className="rounded-xl border border-border p-3 flex items-center justify-between">
                  <div><p className="font-semibold text-foreground">{item.name}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Default appointment duration</Label><select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={String(config.bookingRules.duration || "15 minutes")} onChange={(e) => setConfig((prev) => ({ ...prev, bookingRules: { ...prev.bookingRules, duration: e.target.value } }))}>{["15 minutes", "30 minutes", "45 minutes", "60 minutes"].map((v) => <option key={v}>{v}</option>)}</select></div>
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Buffer between bookings</Label><select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={String(config.bookingRules.buffer || "None")} onChange={(e) => setConfig((prev) => ({ ...prev, bookingRules: { ...prev.bookingRules, buffer: e.target.value } }))}>{["None", "5 minutes", "10 minutes", "15 minutes"].map((v) => <option key={v}>{v}</option>)}</select></div>
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Minimum advance notice</Label><select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={String(config.bookingRules.minNotice || "1 hour")} onChange={(e) => setConfig((prev) => ({ ...prev, bookingRules: { ...prev.bookingRules, minNotice: e.target.value } }))}>{["30 minutes", "1 hour", "2 hours", "4 hours", "24 hours"].map((v) => <option key={v}>{v}</option>)}</select></div>
              <div><Label className="text-xs uppercase tracking-wider mb-1.5 block">Max slots per call</Label><select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={String(config.bookingRules.maxSlotsPerCall || "2 slots")} onChange={(e) => setConfig((prev) => ({ ...prev, bookingRules: { ...prev.bookingRules, maxSlotsPerCall: e.target.value } }))}>{["1 slot", "2 slots", "3 slots", "4 slots"].map((v) => <option key={v}>{v}</option>)}</select></div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div><p className="font-semibold text-foreground">Send confirmation SMS after booking</p><p className="text-xs text-muted-foreground">Send booking details immediately.</p></div>
                <Toggle checked={toggles.customerCommunication.smsFollowUpAfterBooking.enabled} onChange={(enabled) => setToggles({ ...toggles, customerCommunication: { ...toggles.customerCommunication, smsFollowUpAfterBooking: { enabled } } })} />
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div><p className="font-semibold text-foreground">Collect deposit at booking</p><p className="text-xs text-muted-foreground">Collect payment before confirmation.</p></div>
                <Toggle checked={toggles.callHandling.depositCollection.enabled} onChange={(enabled) => setToggles({ ...toggles, callHandling: { ...toggles.callHandling, depositCollection: { ...toggles.callHandling.depositCollection, enabled } } })} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={saveFeatureToggles} disabled={saving}>{saving ? "Saving..." : "Save Booking Toggles"}</Button>
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => saveReceptionistConfig({ bookingRules: config.bookingRules })} disabled={saving}><Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Save Booking Rules"}</Button>
            </div>
          </motion.div>
        )}
      </div>

            {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-[520px] rounded-2xl border border-border bg-[#071a34] p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-foreground">Agent Schedule</h3>
              <button className="text-muted-foreground hover:text-foreground text-xl leading-none" onClick={() => setShowScheduleModal(false)}>
                ×
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
              Set when {config.name || "Aria"} is active and answering calls. Run 24/7 or define daily hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              <button onClick={() => setConfig((prev) => ({ ...prev, scheduleMode: "always_on" }))} className={`rounded-xl border p-3 text-left ${config.scheduleMode === "always_on" ? "border-primary bg-primary/15" : "border-border bg-card/40"}`}>
                <p className="font-semibold text-foreground">24/7 - Always on</p>
                <p className="text-xs text-muted-foreground">Aria answers calls any time, any day</p>
              </button>
              <button onClick={() => setConfig((prev) => ({ ...prev, scheduleMode: "custom" }))} className={`rounded-xl border p-3 text-left ${config.scheduleMode === "custom" ? "border-primary bg-primary/15" : "border-border bg-card/40"}`}>
                <p className="font-semibold text-foreground">Custom schedule</p>
                <p className="text-xs text-muted-foreground">Set specific days and times for Aria to be active</p>
              </button>
            </div>

            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Daily Schedule</p>
            <div className="space-y-2 max-h-[44vh] overflow-auto pr-1">
              {config.weeklySchedule.map((row, index) => (
                <div key={row.day} className="rounded-lg border border-border/80 px-3 py-2.5 bg-card/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <Toggle checked={row.enabled} onChange={(enabled) => {
                        const next = [...config.weeklySchedule];
                        next[index] = { ...next[index], enabled };
                        setConfig((prev) => ({ ...prev, weeklySchedule: next }));
                      }} />
                      <span className="capitalize text-foreground font-medium min-w-20">{row.day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {row.enabled ? (
                        <>
                          <Input
                            className="w-28 h-9"
                            value={row.start}
                            onChange={(e) => {
                              const next = [...config.weeklySchedule];
                              next[index] = { ...next[index], start: e.target.value };
                              setConfig((prev) => ({ ...prev, weeklySchedule: next }));
                            }}
                            placeholder="09:00"
                          />
                          <span className="text-muted-foreground">-</span>
                          <Input
                            className="w-28 h-9"
                            value={row.end}
                            onChange={(e) => {
                              const next = [...config.weeklySchedule];
                              next[index] = { ...next[index], end: e.target.value };
                              setConfig((prev) => ({ ...prev, weeklySchedule: next }));
                            }}
                            placeholder="17:00"
                          />
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">Off - Aria won't answer</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button size="sm" className="w-full mt-4 bg-primary text-primary-foreground h-11 text-sm font-semibold" onClick={async () => {
              await saveReceptionistConfig({
                scheduleMode: config.scheduleMode,
                weeklySchedule: config.weeklySchedule,
              });
              setShowScheduleModal(false);
            }} disabled={saving}>
              {saving ? "Saving..." : "Save Schedule"}
            </Button>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
