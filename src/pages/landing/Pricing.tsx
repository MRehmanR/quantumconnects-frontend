import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, ChevronDown, Mail, Star, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Plan = {
  name: string;
  monthlyPrice: number;
  description: string;
  minutes: string;
  support: string;
  crmIntegration: string;
  features: string[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Rise",
    monthlyPrice: 99,
    description: "Best for solo operators and small teams",
    minutes: "150 min/month",
    support: "Email support",
    crmIntegration: "Add-on (GBP 297 one-time)",
    features: [
      "24/7 AI call answering",
      "Appointment booking",
      "Deposit processing",
      "SMS confirmations",
      "Call recording and transcripts",
      "Daily reports and analytics",
      "Cancellation handling",
    ],
  },
  {
    name: "Elevate",
    monthlyPrice: 249,
    description: "Most popular for growing service businesses",
    minutes: "500 min/month",
    support: "Priority support",
    crmIntegration: "Add-on (GBP 297 one-time)",
    highlighted: true,
    features: [
      "Everything in Rise",
      "Advanced appointment booking",
      "SMS and email confirmations",
      "Outbound messaging",
      "Escalation and urgent handling",
      "Waitlist management",
      "Calendar integrations",
      "Advanced analytics",
    ],
  },
  {
    name: "Apex",
    monthlyPrice: 499,
    description: "For established teams with high call volume",
    minutes: "1,100 min/month",
    support: "Dedicated support",
    crmIntegration: "Included",
    features: [
      "Everything in Elevate",
      "Advanced escalation rules",
      "Custom voice options",
      "Advanced integrations",
      "API access",
      "Priority onboarding",
      "CRM integration included",
    ],
  },
];

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. You can upgrade or downgrade anytime, and plan changes apply at the next billing cycle.",
  },
  {
    question: "What happens if I exceed monthly minutes?",
    answer:
      "You can upgrade your plan at any time. We also notify you before reaching your limit.",
  },
  {
    question: "Is there any long-term contract?",
    answer:
      "No long-term contracts. You can cancel at any time without penalties.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No setup fee. You only pay your selected monthly subscription.",
  },
];

export default function Pricing() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="container py-8 sm:py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Zap className="h-3.5 w-3.5" />
              7-day trial, no card required
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 md:mb-5">
              Simple, Transparent Pricing
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Choose a plan built for service businesses. Start fast, scale with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10">
        <div className="container">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex h-full flex-col border p-6 md:p-7 ${
                  plan.highlighted
                    ? "border-primary shadow-xl ring-1 ring-primary/30 md:scale-[1.02]"
                    : "border-border hover:shadow-md"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}

                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

                <div className="mt-5 border-y border-border py-5">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none">
                      GBP {plan.monthlyPrice}
                    </span>
                    <span className="pb-1 text-muted-foreground">/month</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">{plan.minutes}</span>
                  </p>
                  <p>
                    Support: <span className="font-medium text-foreground">{plan.support}</span>
                  </p>
                  <p>
                    CRM:{" "}
                    <span className="font-medium text-foreground">{plan.crmIntegration}</span>
                  </p>
                </div>

                <Link to="/book-demo" className="mt-5 block">
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    Schedule a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="mt-6 space-y-3">
                  <p className="text-sm font-semibold">Included features</p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-accent" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-primary/5 via-white to-primary/10 py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Trusted by Service Businesses</h3>
            <p className="text-muted-foreground mb-8">
              Teams use Quantum Connects to answer every call, increase bookings, and reduce missed opportunities.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                quote:
                  "We stopped missing calls and increased bookings in the first week.",
                name: "Sarah M.",
              },
              {
                quote:
                  "The AI handles deposits and scheduling better than our old manual process.",
                name: "James R.",
              },
              {
                quote:
                  "Setup was smooth and the impact on daily operations was immediate.",
                name: "Emma T.",
              },
            ].map((item) => (
              <Card key={item.name} className="border border-border p-5">
                <div className="mb-3 flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-foreground">"{item.quote}"</p>
                <p className="mt-4 text-xs font-semibold text-muted-foreground">{item.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-white to-primary/5 p-6 text-center sm:p-8 md:p-10 shadow-sm">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Premium Enterprise
            </div>
            <h3 className="text-3xl font-bold text-foreground">Bespoke</h3>
            <p className="mt-3 text-muted-foreground">
              Need custom workflows, integrations, or volume pricing? We will design a tailored package for your team.
            </p>
            <a href="mailto:hello@quantumconnects.com" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Mail className="mr-2 h-4 w-4" />
                Contact Sales
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Everything you need to know before starting.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={faq.question} className="overflow-hidden border border-border">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="border-t border-border px-5 py-4">
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 md:py-20 text-white">
        <div className="container text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Ready to Transform Your Business?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-blue-100">
            Start your free trial and see how Quantum Connects improves every customer call.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/book-demo" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-primary hover:bg-blue-50">
                Schedule a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full border-2 border-white bg-transparent text-white hover:bg-white/10"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


