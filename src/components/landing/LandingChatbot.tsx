import { useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
}

interface LeadData {
  industry?: string;
  callsPerMonth?: string;
  missedPercentage?: string;
  bookingValue?: string;
  hasReceptionist?: string;
  challenge?: string;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
}

const QUESTIONS = [
  {
    id: "industry",
    question: "What industry are you in?",
    options: [
      "Hair Salon",
      "Dental Practice",
      "Plumbing",
      "Electrician",
      "Restaurant",
      "Physiotherapy",
      "Beauty/Spa",
      "Law Firm",
      "Accounting",
      "Other",
    ],
  },
  {
    id: "callsPerMonth",
    question: "How many calls do you typically receive per month?",
    options: ["Less than 20", "20-50", "50-100", "100-200", "200+"],
  },
  {
    id: "missedPercentage",
    question: "What percentage do you think you're missing?",
    options: ["5-10%", "10-20%", "20-30%", "30-50%", "Not sure"],
  },
  {
    id: "bookingValue",
    question: "What's the average value of each booking?",
    options: ["£20-50", "£50-100", "£100-250", "£250-500", "£500+"],
  },
  {
    id: "hasReceptionist",
    question: "Do you currently have a receptionist or system in place?",
    options: ["Yes, full-time", "Yes, part-time", "No, just me", "Voicemail only"],
  },
  {
    id: "challenge",
    question: "What's your biggest challenge with call handling?",
    options: ["Missing calls", "No-shows", "Slow response time", "Booking errors", "After-hours calls"],
  },
] as const;

export default function LandingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      text: "Hi! I'm Quantum, the AI assistant. I'd love to show how Quantum Connects can help your business. Do you have 2 minutes?",
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [isCollectingContact, setIsCollectingContact] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuestionResponse = (response: string) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    if (!currentQuestion) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: "user", text: response },
    ]);

    setLeadData((prev) => ({
      ...prev,
      [currentQuestion.id]: response,
    }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        const nextQuestion = QUESTIONS[currentQuestionIndex + 1];
        setCurrentQuestionIndex((prev) => prev + 1);
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: "bot", text: nextQuestion.question },
        ]);
      }, 500);
      return;
    }

    setTimeout(() => {
      setIsCollectingContact(true);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "bot",
          text: "Great! Let me grab your contact details so I can show your estimated ROI. What's your name?",
        },
      ]);
    }, 500);
  };

  const handleContactSubmit = (value: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: "user", text: value || "No website" },
    ]);

    if (!leadData.name) {
      setLeadData((prev) => ({ ...prev, name: value }));
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: "bot", text: "Nice to meet you! What's your email address?" },
        ]);
      }, 400);
      return;
    }

    if (!leadData.email) {
      setLeadData((prev) => ({ ...prev, email: value }));
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: "bot", text: "Perfect. And your phone number?" },
        ]);
      }, 400);
      return;
    }

    if (!leadData.phone) {
      setLeadData((prev) => ({ ...prev, phone: value }));
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: "bot", text: "Last one: do you have a website? (optional)" },
        ]);
      }, 400);
      return;
    }

    if (!leadData.website) {
      setLeadData((prev) => ({ ...prev, website: value || "Not provided" }));
      setTimeout(() => {
        generatePersonalizedResponse();
      }, 500);
    }
  };

  const generatePersonalizedResponse = () => {
    const callsPerMonth = parseInt(leadData.callsPerMonth?.split("-")[0] || "50", 10);
    const missedPercent = parseInt(leadData.missedPercentage?.split("-")[0] || "20", 10);
    const bookingValue = parseInt(leadData.bookingValue?.replace(/[^0-9]/g, "") || "100", 10);

    const missedCalls = Math.max(1, Math.round((callsPerMonth * missedPercent) / 100));
    const monthlyLoss = missedCalls * bookingValue;
    const annualLoss = monthlyLoss * 12;

    const recommendation = callsPerMonth > 100 ? "Pro" : callsPerMonth > 50 ? "Core" : "Starter";
    const planPrice = recommendation === "Pro" ? 499 : recommendation === "Core" ? 249 : 99;
    const estimatedDailyRecovery = Math.max(1, monthlyLoss / 30);
    const paybackDays = Math.ceil(planPrice / estimatedDailyRecovery);

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "bot",
        text: `Excellent. Here's what I found:\n\nYour situation:\n- You're likely missing about ${missedCalls} calls/month\n- That's roughly £${monthlyLoss.toLocaleString()} lost monthly\n- Or £${annualLoss.toLocaleString()} per year\n\nRecommendation:\nThe ${recommendation} plan (£${planPrice}/month) fits your volume best.\n\nROI estimate:\nYou could recover your plan cost in about ${paybackDays} days.\n\nReady to start your free 7-day trial?`,
      },
    ]);

    setIsCollectingContact(false);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    if (isCollectingContact) {
      handleContactSubmit(userInput.trim());
    } else if (currentQuestionIndex < QUESTIONS.length) {
      handleQuestionResponse(userInput.trim());
    }
    setUserInput("");
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-white z-40 animate-bounce"
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[92vw] max-w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-border">
      <div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-t-lg flex items-center justify-between">
        <div>
          <h3 className="font-bold">Quantum Assistant</h3>
          <p className="text-xs opacity-90">Online</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-2 rounded transition-colors"
          aria-label="Close chatbot"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.type === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-secondary text-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4 bg-secondary rounded-b-lg">
        {currentQuestionIndex < QUESTIONS.length && !isCollectingContact ? (
          <div className="space-y-2 mb-4 max-h-44 overflow-y-auto">
            {QUESTIONS[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                onClick={() => handleQuestionResponse(option)}
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded hover:bg-primary hover:text-white hover:border-primary transition-all text-left"
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}

        {isCollectingContact || currentQuestionIndex >= QUESTIONS.length ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Type your answer..."
              className="flex-1 px-3 py-2 border border-border rounded bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !userInput.trim()}
              className="px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 transition-all"
              aria-label="Send message"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        ) : null}

        {!isCollectingContact && currentQuestionIndex >= QUESTIONS.length ? (
          <div className="space-y-2 mt-3">
            <Button onClick={() => (window.location.href = "/signup")} className="w-full bg-primary hover:bg-primary/90" size="sm">
              Start Free Trial
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full" size="sm">
              Close
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
