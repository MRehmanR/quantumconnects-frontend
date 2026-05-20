import { useMemo, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useLocation } from "react-router-dom";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
}

const QUICK_ACTIONS = [
  "How do I get started?",
  "How do I book appointments?",
  "How do I check call logs?",
  "How does billing work?",
  "How do I update settings?",
];

function buildRouteTip(pathname: string): string {
  if (pathname === "/" || pathname.startsWith("/features") || pathname.startsWith("/pricing")) {
    return "You are on a marketing page. Use Login or Start Free Trial to access the application.";
  }

  if (pathname.startsWith("/login")) {
    return "Login tip: use your registered email and password. If you are new, open Signup first.";
  }

  if (pathname.startsWith("/signup")) {
    return "Signup tip: complete all required details, then login to open your dashboard.";
  }

  if (pathname === "/dashboard") {
    return "Dashboard overview: see usage, performance highlights, and quick operational status.";
  }

  if (pathname.startsWith("/dashboard/calls")) {
    return "Call Logs: review call outcomes, transcripts, and escalation events for quality checks.";
  }

  if (pathname.startsWith("/dashboard/appointments")) {
    return "Appointments: create, reschedule, or cancel bookings and monitor waitlist changes.";
  }

  if (pathname.startsWith("/dashboard/knowledge-base")) {
    return "Knowledge Base: upload and organize FAQ content so AI call responses stay accurate.";
  }

  if (pathname.startsWith("/dashboard/billing")) {
    return "Billing: track plan usage, threshold alerts, and upcoming invoice cycle details.";
  }

  if (pathname.startsWith("/dashboard/settings")) {
    return "Settings: update profile, preferences, and operational controls for your account.";
  }

  if (pathname.startsWith("/admin")) {
    return "Admin area: manage users, subscriptions, and analytics for platform-wide operations.";
  }

  return "Need help? Ask me how to navigate features, bookings, calls, billing, or settings.";
}

function answerQuestion(input: string): string {
  const text = input.trim().toLowerCase();

  if (text.includes("start") || text.includes("get started") || text.includes("setup")) {
    return "Start here: 1) Signup/Login 2) Configure your profile and business details 3) Add knowledge base content 4) Verify calls and appointment flow in dashboard.";
  }

  if (text.includes("book") || text.includes("appointment") || text.includes("schedule")) {
    return "For appointments, open Dashboard > Appointments. You can create, reschedule, and cancel bookings. The automation flow handles reminders and waitlist triggers.";
  }

  if (text.includes("call") || text.includes("log") || text.includes("transcript")) {
    return "Open Dashboard > Call Logs to inspect inbound/outbound calls, outcomes, transcripts, and escalations.";
  }

  if (text.includes("billing") || text.includes("usage") || text.includes("invoice") || text.includes("plan")) {
    return "Open Dashboard > Billing to monitor current usage, thresholds, and subscription details. Alerts are generated as usage approaches limits.";
  }

  if (text.includes("knowledge") || text.includes("rag") || text.includes("faq")) {
    return "Use Dashboard > Knowledge Base to maintain content for AI answers. Better content quality improves call resolution and lowers escalations.";
  }

  if (text.includes("setting") || text.includes("profile") || text.includes("password")) {
    return "Use Dashboard > Settings for account and application preferences. Save changes and re-test your workflow where relevant.";
  }

  if (text.includes("admin") || text.includes("user") || text.includes("subscription")) {
    return "Admin users can manage users/subscriptions from the Admin panel. Standard users should work from the Dashboard area.";
  }

  return "I can help with onboarding, appointments, call logs, billing, knowledge base, and settings. Ask one of these topics and I will guide you.";
}

export default function AppAssistantChatbot() {
  const location = useLocation();
  const routeTip = useMemo(() => buildRouteTip(location.pathname), [location.pathname]);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "bot",
      text: "Hi, I am your app assistant. I can help you understand how to use each section of the application.",
    },
  ]);
  const [input, setInput] = useState("");

  const sendUserMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: "user",
      text: trimmed,
    };

    const botMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: "bot",
      text: answerQuestion(trimmed),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const addRouteTip = () => {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      type: "bot",
      text: routeTip,
    };

    setMessages((prev) => [...prev, msg]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg transition-all hover:shadow-xl"
        aria-label="Open app assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[560px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-white shadow-2xl">
      <div className="flex items-center justify-between bg-gradient-to-r from-primary to-accent px-4 py-3 text-white">
        <div>
          <p className="text-sm font-semibold">Application Assistant</p>
          <p className="text-xs opacity-90">Ask me how to use this app</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded p-1 transition-colors hover:bg-white/20"
          aria-label="Close app assistant"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto bg-secondary/30 p-4">
        {messages.map((message) => (
          <div key={message.id} className={message.type === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                message.type === "user"
                  ? "max-w-[85%] rounded-lg rounded-br-none bg-primary px-3 py-2 text-sm text-white"
                  : "max-w-[85%] rounded-lg rounded-bl-none bg-white px-3 py-2 text-sm text-foreground border border-border"
              }
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-white p-3">
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            onClick={addRouteTip}
            className="rounded-md border border-border px-2 py-1 text-xs text-foreground transition-colors hover:bg-secondary"
          >
            Help on this page
          </button>
          {QUICK_ACTIONS.slice(0, 2).map((q) => (
            <button
              key={q}
              onClick={() => sendUserMessage(q)}
              className="rounded-md border border-border px-2 py-1 text-xs text-foreground transition-colors hover:bg-secondary"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendUserMessage(input);
              }
            }}
            placeholder="Ask how to use any feature"
            className="flex-1 rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={() => sendUserMessage(input)}
            className="rounded-md bg-primary p-2 text-white transition-colors hover:bg-primary/90"
            aria-label="Send question"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
