import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, CheckCircle, Circle, RefreshCw, Link2 } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { appointmentsApi, type AppointmentItem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizePhoneForSubmit } from "@/lib/phone";

const PHONE_COUNTRY_CODES = [
  { label: "Pakistan (+92)", code: "+92" },
  { label: "United Kingdom (+44)", code: "+44" },
  { label: "United States (+1)", code: "+1" },
  { label: "India (+91)", code: "+91" },
  { label: "UAE (+971)", code: "+971" },
  { label: "Saudi Arabia (+966)", code: "+966" },
  { label: "Qatar (+974)", code: "+974" },
  { label: "Kuwait (+965)", code: "+965" },
  { label: "Oman (+968)", code: "+968" },
  { label: "Bahrain (+973)", code: "+973" },
  { label: "Australia (+61)", code: "+61" },
  { label: "Germany (+49)", code: "+49" },
  { label: "France (+33)", code: "+33" },
  { label: "Italy (+39)", code: "+39" },
  { label: "Spain (+34)", code: "+34" }
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  Confirmed: { color: "status-completed", icon: CheckCircle },
  Pending: { color: "status-active", icon: Circle },
  Completed: { color: "bg-muted text-muted-foreground", icon: CheckCircle },
  Cancelled: { color: "status-escalated", icon: Circle },
  NoShow: { color: "status-missed", icon: Circle },
};

const manualStatuses: AppointmentItem["status"][] = ["Pending", "Confirmed", "Completed", "Cancelled", "NoShow"];

export default function Appointments() {
  const ownerName = localStorage.getItem("qc_user_name") || "User";
  const ownerEmail = localStorage.getItem("qc_user_email") || "";
  const ownerPhone = localStorage.getItem("qc_owner_phone") || "";
  const inboundNumber = localStorage.getItem("qc_inbound_number") || "";

  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    date: "",
    time: "",
    type: "Consultation",
  });
  const [saving, setSaving] = useState(false);
  const [busyAppointmentId, setBusyAppointmentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [notificationWarning, setNotificationWarning] = useState("");
  const [formError, setFormError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [appointmentDateFilter, setAppointmentDateFilter] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState(
    localStorage.getItem("qc_phone_country_code") || "+92"
  );

  const loadAppointments = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const data = await appointmentsApi.getAll();
      setAppointments(data || []);
      setLoadError("");
    } catch (error: any) {
      setLoadError(error?.message || "Failed to load appointments");
    } finally {
      if (showLoading) {
        setLoading(false);
      } else {
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    loadAppointments(true);

    const intervalId = setInterval(() => {
      loadAppointments(false);
    }, 15000);

    return () => clearInterval(intervalId);
  }, [loadAppointments]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const normalizedPhone = normalizePhoneForSubmit(form.customerPhone, phoneCountryCode);
    if (!normalizedPhone.ok) {
      setFormError(normalizedPhone.message);
      return;
    }

    localStorage.setItem("qc_phone_country_code", phoneCountryCode);

    setSaving(true);
    try {
      const created = await appointmentsApi.create({
        ...form,
        customerPhone: normalizedPhone.e164 || "",
      });
      if (created?.notification?.attempted && !created.notification.ok) {
        setNotificationWarning(`Appointment saved, but notification failed (${created.notification.status || 0}): ${created.notification.message || "Unknown error"}`);
      } else {
        setNotificationWarning("");
      }
      await loadAppointments(false);
      setForm({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        date: "",
        time: "",
        type: "Consultation",
      });
    } catch (error: any) {
      setFormError(error?.message || "Failed to create appointment");
    } finally {
      setSaving(false);
    }
  };

  const applyLocalStatus = (appointmentId: string, status: AppointmentItem["status"]) => {
    setAppointments((prev) => prev.map((appt) => (appt.id === appointmentId ? { ...appt, status } : appt)));
  };

  const handleCancel = async (appointmentId: string) => {
    setBusyAppointmentId(appointmentId);
    try {
      await appointmentsApi.cancel(appointmentId);
      await loadAppointments(false);
    } finally {
      setBusyAppointmentId(null);
    }
  };

  const handleStatusChange = async (appointmentId: string, nextStatus: AppointmentItem["status"]) => {
    setBusyAppointmentId(appointmentId);
    try {
      const updated = await appointmentsApi.updateStatus(appointmentId, nextStatus);
      applyLocalStatus(appointmentId, updated.status);
      await loadAppointments(false);
    } finally {
      setBusyAppointmentId(null);
    }
  };

  const handleCreateDepositLink = async (appointmentId: string) => {
    const totalAmountRaw = window.prompt("Enter total appointment fee amount (e.g. 200):", "200");
    if (!totalAmountRaw) {
      return;
    }
    const percentageRaw = window.prompt("Enter advance/deposit percentage (e.g. 30):", "30");
    if (!percentageRaw) {
      return;
    }

    const totalAmount = Number(totalAmountRaw);
    const percentage = Number(percentageRaw);
    if (!(totalAmount > 0) || !(percentage > 0)) {
      setActionMessage("Please provide valid total fee and percentage.");
      return;
    }

    setBusyAppointmentId(appointmentId);
    setActionMessage("");
    try {
      const data = await appointmentsApi.createDepositLink(appointmentId, {
        totalAmount,
        percentage,
        currency: "usd",
      });
      if (data?.paymentUrl) {
        await navigator.clipboard.writeText(data.paymentUrl);
        setActionMessage(`Deposit link created and copied. Amount ${data.amount} ${data.currency}.`);
      } else {
        setActionMessage("Deposit link created.");
      }
      await loadAppointments(false);
    } catch (error: any) {
      setActionMessage(error?.message || "Failed to create deposit link");
    } finally {
      setBusyAppointmentId(null);
    }
  };

  const handleRefreshDepositStatus = async (appointmentId: string) => {
    setBusyAppointmentId(appointmentId);
    setActionMessage("");
    try {
      const data = await appointmentsApi.refreshDepositStatus(appointmentId);
      setActionMessage(`Payment status: ${data.paymentStatus}`);
      await loadAppointments(false);
    } catch (error: any) {
      setActionMessage(error?.message || "Failed to refresh deposit status");
    } finally {
      setBusyAppointmentId(null);
    }
  };

  const filteredAppointments = useMemo(() => {
    if (!appointmentDateFilter) {
      return appointments;
    }

    return appointments.filter((appt) => {
      const parsed = new Date(appt.date);
      if (Number.isNaN(parsed.getTime())) {
        return false;
      }

      const yyyy = parsed.getFullYear();
      const mm = String(parsed.getMonth() + 1).padStart(2, "0");
      const dd = String(parsed.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}` === appointmentDateFilter;
    });
  }, [appointments, appointmentDateFilter]);

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Appointments</h2>
          <Button type="button" size="sm" variant="outline" className="h-8 text-xs" onClick={() => loadAppointments(false)} disabled={refreshing}>
            <RefreshCw className={`mr-1 h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {loading && <p className="text-xs text-muted-foreground">Loading appointments...</p>}
        {!loading && loadError && <p className="text-xs text-destructive">{loadError}</p>}
        {notificationWarning && <p className="text-xs text-destructive">{notificationWarning}</p>}
        {formError && <p className="text-xs text-destructive">{formError}</p>}
        {actionMessage && <p className="text-xs text-primary">{actionMessage}</p>}

        <div className="card-surface p-4">
          <h3 className="text-sm font-semibold text-foreground">Business Owner Details</h3>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground">Name</p>
              <p className="text-sm text-foreground font-medium">{ownerName}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Email</p>
              <p className="text-sm text-foreground font-medium break-all">{ownerEmail || "Not set"}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Owner Number</p>
              <p className="text-sm text-foreground font-medium">{ownerPhone || "Not set"}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Booking Number</p>
              <p className="text-sm text-foreground font-medium">{inboundNumber || "Not set"}</p>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={onSubmit}
          className="card-surface p-5 space-y-4"
        >
          <div>
            <h3 className="text-sm font-semibold text-foreground">Add Appointment</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Input customer details and booking information</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Customer Name</Label>
              <Input
                className="h-9 text-sm"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Phone</Label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  className="h-9 rounded-md border border-input bg-background px-2 text-xs"
                  value={phoneCountryCode}
                  onChange={(e) => setPhoneCountryCode(e.target.value)}
                >
                  {PHONE_COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <Input
                  className="h-9 text-sm col-span-2"
                  value={form.customerPhone}
                  onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                  placeholder="3001234567 or +923001234567"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Email</Label>
              <Input
                type="email"
                className="h-9 text-sm"
                value={form.customerEmail}
                onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Date</Label>
              <Input
                type="date"
                className="h-9 text-sm"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Time</Label>
              <Input
                type="time"
                className="h-9 text-sm"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Type</Label>
              <Input
                className="h-9 text-sm"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
            </div>
          </div>
          <Button size="sm" type="submit" disabled={saving} className="bg-gradient-primary text-primary-foreground">
            {saving ? "Saving..." : "Add Appointment"}
          </Button>
        </motion.form>

        <div className="card-surface p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Filter Appointments</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Check appointments date-wise</p>
            </div>
            <div className="w-full sm:w-[220px]">
              <Label className="text-xs font-medium mb-1.5 block">Appointment Date</Label>
              <Input
                type="date"
                className="h-9 text-sm"
                value={appointmentDateFilter}
                onChange={(e) => setAppointmentDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: filteredAppointments.length, color: "text-foreground" },
            { label: "Confirmed", value: filteredAppointments.filter(a => a.status === "Confirmed").length, color: "text-accent" },
            { label: "Pending", value: filteredAppointments.filter(a => a.status === "Pending").length, color: "text-primary" },
            { label: "Completed", value: filteredAppointments.filter(a => a.status === "Completed").length, color: "text-muted-foreground" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="card-surface p-4 text-center"
            >
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Appointments list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-surface overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Upcoming Appointments</h3>
            <p className="text-xs text-muted-foreground mt-0.5">AI-booked appointments from call interactions</p>
          </div>

          <div className="divide-y divide-border">
            {filteredAppointments.map((appt, i) => {
              const config = statusConfig[appt.status] || statusConfig.Pending;
              const StatusIcon = config.icon;
              return (
                <motion.div
                  key={appt.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{appt.customerName || appt.caller}</p>
                    <p className="text-xs text-muted-foreground">{appt.customerPhone || "No phone"}</p>
                    <p className="text-xs text-muted-foreground">{appt.customerEmail || "No email"}</p>
                    <p className="text-xs text-muted-foreground">{appt.type}</p>
                    <p className="text-xs text-muted-foreground">
                      Deposit: {appt.deposit?.status || "None"}
                      {appt.deposit?.requiredAmount ? ` (${appt.deposit.requiredAmount} ${appt.deposit.currency})` : ""}
                    </p>
                    {appt.deposit?.paymentUrl && (
                      <a
                        href={appt.deposit.paymentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <Link2 className="h-3 w-3" />
                        Open payment link
                      </a>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {appt.date}
                  </div>

                  <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {appt.time}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                      value={appt.status}
                      disabled={busyAppointmentId === appt.id}
                      onChange={(e) => handleStatusChange(appt.id, e.target.value as AppointmentItem["status"])}
                    >
                      {manualStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      disabled={busyAppointmentId === appt.id || appt.status === "Cancelled"}
                      onClick={() => handleCancel(appt.id)}
                    >
                      {busyAppointmentId === appt.id ? "Updating..." : "Cancel"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      disabled={busyAppointmentId === appt.id}
                      onClick={() => handleCreateDepositLink(appt.id)}
                    >
                      {busyAppointmentId === appt.id ? "Working..." : "Create Deposit Link"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      disabled={busyAppointmentId === appt.id || !appt.deposit?.checkoutSessionId}
                      onClick={() => handleRefreshDepositStatus(appt.id)}
                    >
                      {busyAppointmentId === appt.id ? "Refreshing..." : "Refresh Payment"}
                    </Button>
                  </div>

                  <span className={`status-badge ${config.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    {appt.status}
                  </span>
                </motion.div>
              );
            })}
            {filteredAppointments.length === 0 && (
              <div className="px-5 py-6 text-xs text-muted-foreground">
                No appointments found for the selected date.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
