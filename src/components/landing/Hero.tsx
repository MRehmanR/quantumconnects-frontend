import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Calendar, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingCards = [
  {
    icon: Phone,
    label: "Incoming Call",
    sub: "AI handling +1 (555) 234-5678",
    color: "text-primary",
    bg: "bg-primary/10",
    delay: 0,
    position: "top-12 -left-4 md:top-16 md:-left-8",
  },
  {
    icon: Calendar,
    label: "Appointment Booked",
    sub: "Sarah J. — Mar 20 @ 2:00 PM",
    color: "text-accent",
    bg: "bg-accent/10",
    delay: 0.2,
    position: "bottom-24 -left-4 md:bottom-28 md:-left-12",
  },
  {
    icon: Star,
    label: "Customer Satisfied",
    sub: "Positive sentiment · 4.9★",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    delay: 0.4,
    position: "top-8 -right-4 md:top-12 md:-right-8",
  },
  {
    icon: TrendingUp,
    label: "98.7% Resolution Rate",
    sub: "↑ 12% this month",
    color: "text-accent",
    bg: "bg-accent/10",
    delay: 0.6,
    position: "bottom-12 -right-4 md:bottom-16 md:-right-8",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_70%,hsl(210_40%_98%)_100%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(239 84% 67%) 1px, transparent 1px), linear-gradient(90deg, hsl(239 84% 67%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          Now available — Multi-language AI Support
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.1]"
        >
          AI Receptionist That{" "}
          <span className="gradient-text">Never Misses</span> a Call
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
        >
          QuantumConnects answers calls, books appointments, and manages
          customers automatically — 24/7, no staff required.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground h-12 px-8 text-base font-semibold shadow-elevated group"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <a href="#pricing">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-semibold border-border hover:bg-muted"
            >
              View Pricing
            </Button>
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xs text-muted-foreground"
        >
          Trusted by <strong className="text-foreground">1,800+</strong> businesses · No credit card required
        </motion.p>

        {/* Hero dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          {/* Floating cards */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + card.delay, duration: 0.4 }}
              className={`absolute z-20 hidden md:flex items-center gap-3 card-surface px-4 py-3 ${card.position} animate-float`}
              style={{ animationDelay: `${card.delay}s` }}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-foreground">{card.label}</div>
                <div className="text-xs text-muted-foreground">{card.sub}</div>
              </div>
            </motion.div>
          ))}

          {/* Dashboard preview */}
          <div className="card-elevated overflow-hidden rounded-xl mx-4 md:mx-8">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <div className="ml-4 flex-1 h-6 rounded-md bg-border/50 max-w-sm" />
            </div>

            {/* Dashboard mini */}
            <div className="flex h-64 md:h-80">
              {/* Sidebar */}
              <div className="hidden md:flex w-48 flex-col border-r border-border bg-muted/30 px-3 py-4 gap-1">
                {["Overview", "Call Logs", "Appointments", "Knowledge Base", "Billing"].map((item, idx) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs ${
                      idx === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
                    }`}
                  >
                    <div className={`h-1.5 w-1.5 rounded-full ${idx === 0 ? "bg-primary" : "bg-muted-foreground/40"}`} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 p-4 md:p-6 bg-background">
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "Calls Today", value: "28", delta: "+4" },
                    { label: "Bookings", value: "11", delta: "+2" },
                    { label: "Resolution", value: "98.7%", delta: "+1.2%" },
                    { label: "Avg Duration", value: "3:22", delta: "-0:14" },
                  ].map((stat) => (
                    <div key={stat.label} className="card-surface p-3">
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className="text-lg font-bold text-foreground mt-0.5">{stat.value}</div>
                      <div className="text-xs text-accent">{stat.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="card-surface p-3 h-24 md:h-32 flex items-end gap-1 overflow-hidden">
                  {[40, 65, 50, 75, 90, 60, 85, 70, 95, 80, 72, 88].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-primary/20"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom glow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-24 w-2/3 bg-primary/10 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
