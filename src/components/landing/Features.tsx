import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Phone, Calendar, BookOpen, Users, ArrowUpRight,
  BarChart3, Globe, Zap, Shield, Clock
} from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "24/7 AI Call Handling",
    description: "Never miss a customer call again. Our AI handles every call professionally, day or night, with natural conversation.",
    span: "col-span-1 md:col-span-2",
    accent: true,
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Automatically sync with your calendar and book appointments in real time during calls.",
    span: "col-span-1",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base Q&A",
    description: "Train your AI with your business info. It answers FAQs accurately, every time.",
    span: "col-span-1",
  },
  {
    icon: Users,
    title: "Waitlist Automation",
    description: "Automatically add callers to waitlists and send follow-up notifications when slots open up.",
    span: "col-span-1",
  },
  {
    icon: ArrowUpRight,
    title: "Call Escalation",
    description: "Smart detection for complex issues — seamlessly escalate to your team when needed.",
    span: "col-span-1",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Deep insights into call volume, sentiment trends, peak hours, and booking conversion rates.",
    span: "col-span-1 md:col-span-2",
    highlight: true,
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Speak your customers' language. AI supports 40+ languages out of the box.",
    span: "col-span-1",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
      className={`${feature.span} relative overflow-hidden rounded-xl border border-border p-6 ${
        feature.accent
          ? "bg-gradient-to-br from-primary/5 to-primary-glow/5"
          : feature.highlight
          ? "bg-gradient-to-br from-accent/5 to-accent/10"
          : "bg-card"
      } shadow-card cursor-default`}
    >
      {feature.accent && (
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl -mr-8 -mt-8" />
      )}
      <div
        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${
          feature.accent ? "bg-primary/10" : feature.highlight ? "bg-accent/10" : "bg-muted"
        }`}
      >
        <feature.icon
          className={`h-5 w-5 ${
            feature.accent ? "text-primary" : feature.highlight ? "text-accent" : "text-muted-foreground"
          }`}
        />
      </div>
      <h3 className="mb-2 text-base font-semibold text-foreground tracking-tight">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <Zap className="h-3 w-3" />
            Everything you need
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Your AI team, working{" "}
            <span className="gradient-text">around the clock</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            QuantumConnects replaces a full receptionist team with a single AI platform
            that handles every customer touchpoint automatically.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-xl border border-border bg-card p-6 shadow-card"
        >
          {[
            { value: "98.7%", label: "Resolution Rate" },
            { value: "< 1s", label: "Response Time" },
            { value: "40+", label: "Languages" },
            { value: "24/7", label: "Availability" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
