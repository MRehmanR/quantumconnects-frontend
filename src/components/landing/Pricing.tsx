import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Trial",
    price: 0,
    calls: 50,
    concurrent: 1,
    period: "free forever",
    features: ["50 calls/month", "1 concurrent call", "Basic AI responses", "Email support"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Starter",
    price: 29,
    calls: 75,
    concurrent: 2,
    period: "per month",
    features: ["75 calls/month", "2 concurrent calls", "Appointment booking", "Knowledge base", "Email + chat support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Core",
    price: 79,
    calls: 200,
    concurrent: 5,
    period: "per month",
    features: ["200 calls/month", "5 concurrent calls", "Full AI features", "Analytics dashboard", "Multi-language", "Priority support"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Pro",
    price: 149,
    calls: 500,
    concurrent: 10,
    period: "per month",
    features: ["500 calls/month", "10 concurrent calls", "Advanced analytics", "Custom AI training", "Webhooks & API", "Dedicated support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Scale",
    price: 299,
    calls: 1200,
    concurrent: 25,
    period: "per month",
    features: ["1,200 calls/month", "25 concurrent calls", "White-label option", "SLA guarantee", "Custom integrations", "Account manager"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
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
            Transparent pricing
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Plans that <span className="gradient-text">scale with you</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Start free, grow as you need. All plans include core AI features.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
              className={`relative flex flex-col rounded-xl border p-5 ${
                plan.popular
                  ? "border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-elevated"
                  : "border-border bg-card shadow-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Zap className="h-3 w-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-4">
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  {plan.name}
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-sm text-muted-foreground mb-0.5">/mo</span>
                  )}
                </div>
                {plan.price === 0 && (
                  <span className="text-sm text-muted-foreground">Free forever</span>
                )}
              </div>

              {/* Call limits */}
              <div className="mb-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Calls/month</span>
                  <span className="font-semibold text-foreground">{plan.calls.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Concurrent</span>
                  <span className="font-semibold text-foreground">{plan.concurrent}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-primary"
                    style={{ width: `${Math.min((plan.calls / 1200) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <Check className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${plan.popular ? "text-primary" : "text-accent"}`} />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup">
                <Button
                  className={`w-full text-sm h-9 ${
                    plan.popular
                      ? "bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-sm"
                      : "variant-outline border-border"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* All plans note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          All plans include SSL, 99.9% uptime SLA, GDPR compliance, and free onboarding.
        </motion.p>
      </div>
    </section>
  );
}
