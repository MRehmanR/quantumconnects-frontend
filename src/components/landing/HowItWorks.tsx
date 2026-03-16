import { motion } from "framer-motion";
import { UserPlus, Calendar, Bot, Phone, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up",
    description: "Create your account in minutes. No technical setup required.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Connect Your Calendar",
    description: "Sync Google Calendar, Outlook, or any CalDAV calendar instantly.",
  },
  {
    icon: Bot,
    step: "03",
    title: "Configure AI Receptionist",
    description: "Train your AI with your business info, services, and FAQs.",
  },
  {
    icon: Phone,
    step: "04",
    title: "Start Receiving Calls",
    description: "Forward your number and let the AI handle every call automatically.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
            Simple setup
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Live in <span className="gradient-text">under 10 minutes</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Getting started with QuantumConnects is incredibly simple. No engineers required.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative z-10 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="text-[9px] font-bold text-primary">{step.step}</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Arrow for mobile */}
                {i < steps.length - 1 && (
                  <div className="md:hidden mt-4 text-muted-foreground/40">
                    <ArrowRight className="h-5 w-5 mx-auto rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
