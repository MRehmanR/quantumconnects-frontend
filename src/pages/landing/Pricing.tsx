import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Zap, Mail, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Pricing() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "Rise",
      monthlyPrice: 99,
      description: "Perfect for solo operators and small teams",
      minutes: "150 min/month",
      support: "Email support",
      crmIntegration: "Add-on (£297 one-time)",
      features: [
        "150 minutes per month",
        "24/7 AI call answering",
        "Appointment booking",
        "Deposit processing",
        "SMS confirmations",
        "Google Reviews automation",
        "Outbound messaging",
        "Daily reports & analytics",
        "Call recording & transcripts",
        "Escalation & urgent handling",
        "Waitlist management",
        "Cancellation handling",
      ],
      cta: "Schedule a Demo",
      highlighted: false,
    },
    {
      name: "Elevate",
      monthlyPrice: 249,
      description: "Most popular for growing service businesses",
      minutes: "500 min/month",
      support: "Priority support",
      crmIntegration: "Add-on (£297 one-time)",
      features: [
        "500 minutes per month",
        "24/7 AI call answering",
        "Advanced appointment booking",
        "Deposit collection",
        "SMS & email confirmations",
        "Google Reviews automation",
        "Outbound messaging",
        "Daily reports & analytics",
        "Call recording & transcripts",
        "Escalation & urgent handling",
        "Waitlist management",
        "Cancellation handling",
        "Calendar integrations",
        "Advanced analytics",
      ],
      cta: "Schedule a Demo",
      highlighted: true,
    },
    {
      name: "Apex",
      monthlyPrice: 499,
      description: "For established businesses with high call volume",
      minutes: "1,100 min/month",
      support: "Dedicated support",
      crmIntegration: "Included (Free)",
      features: [
        "1,100 minutes per month",
        "24/7 AI call answering",
        "Advanced appointment booking",
        "Deposit collection",
        "SMS & email confirmations",
        "Google Reviews automation",
        "Outbound messaging",
        "Daily reports & analytics",
        "Call recording & transcripts",
        "Advanced escalation rules",
        "Waitlist management",
        "Cancellation handling",
        "Custom voice cloning",
        "Advanced integrations",
        "API access",
        "CRM Integration (Included)",
      ],
      cta: "Schedule a Demo",
      highlighted: false,
    },
  ];

  const testimonials = [
    {
      quote: "Quantum Connects has transformed how we handle calls. We've increased bookings by 40% and our team is no longer tied to the phone.",
      author: "Sarah Mitchell",
      role: "Plumbing Business Owner",
      business: "Mitchell Plumbing Services",
    },
    {
      quote: "The AI sounds so natural that customers don't even realize they're talking to a machine. The deposit collection feature alone has saved us thousands.",
      author: "James Rodriguez",
      role: "Electrician",
      business: "Rodriguez Electrical",
    },
    {
      quote: "Setup was painless, and the support team is fantastic. We went from missing 30% of calls to capturing every single one. Game-changer for our business.",
      author: "Emma Thompson",
      role: "Home Services Manager",
      business: "Thompson Home Services",
    },
    {
      quote: "The ROI was immediate. Within the first month, we'd recovered the cost through increased bookings. Best investment we've made this year.",
      author: "Michael Chen",
      role: "Dental Practice Manager",
      business: "Bright Smile Dental",
    },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
    },
    {
      question: "What happens if I exceed my monthly minutes?",
      answer: "We'll notify you when you're approaching your limit. You can upgrade to a higher plan at any time, or purchase an add-on minute pack.",
    },
    {
      question: "Is there a long-term contract?",
      answer: "No contracts at all. You can cancel anytime with no penalties. Most customers stay because they love the results, not because they're locked in.",
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "We focus on monthly billing for flexibility. However, if you're interested in annual pricing or volume discounts for enterprise needs, please contact our sales team at hello@quantumconnects.com.",
    },
    {
      question: "What's included in the free trial?",
      answer: "Your 7-day free trial includes full access to all features of your chosen plan. No credit card required, and you can cancel anytime. It's a full, unrestricted trial.",
    },
    {
      question: "Are there any setup fees?",
      answer: "No. There are no setup fees or hidden costs. You only pay the monthly subscription.",
    },
    {
      question: "Can I add custom features or integrations?",
      answer: "Absolutely. Our Bespoke plan is designed for custom needs. Contact us at hello@quantumconnects.com to discuss your specific requirements and get a personalized quote.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 -z-10" />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Choose the perfect plan for your business. All plans include a
              7-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-8 border transition-all flex flex-col ${
                  plan.highlighted
                    ? "border-primary shadow-xl md:scale-105"
                    : "border-border hover:shadow-lg"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {plan.description}
                </p>

                <div className="mb-6 pb-6 border-b border-border">
                  <span className="text-5xl font-bold text-foreground">
                    £{plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>{plan.minutes}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Support: <span className="text-foreground font-medium">{plan.support}</span>
                  </p>
                  <p className="text-muted-foreground">CRM Integration: <span className="text-foreground font-medium">{plan.crmIntegration}</span></p>
                </div>

                <Button
                  asChild
                  className="w-full mb-8"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  <Link to="/book-demo">
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>

                <div className="space-y-4 flex-grow">
                  <p className="font-semibold text-foreground text-sm">All features included:</p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Service Businesses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how Quantum Connects has transformed call handling and booking for hundreds of businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-accent font-medium">{testimonial.business}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Plan */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary rounded-2xl border border-border p-12 text-center shadow-sm">
              <div className="inline-block mb-6 px-4 py-2 bg-accent/20 rounded-full">
                <span className="text-accent font-semibold text-sm">Premium Enterprise</span>
              </div>
              
              <h3 className="text-3xl font-bold text-foreground mb-4">Bespoke</h3>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Custom plans designed for your business needs with advanced features and dedicated support.
              </p>

              <div className="bg-white rounded-lg border border-border p-8 mb-8 text-left shadow-sm">
                <ul className="space-y-4 text-foreground">
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Everything in Apex</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Full API access with webhooks</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Volume discounts available</span>
                  </li>
                </ul>
              </div>

              <a href="mailto:hello@quantumconnects.com">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                  <Mail className="mr-2 w-4 h-4" />
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We've got answers. If you can't find what you're looking for, reach out to our team.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border border-border overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-secondary transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground text-left">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ml-4 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 border-t border-border">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <a href="mailto:hello@quantumconnects.com" className="text-primary font-semibold hover:underline">
              Contact our support team →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Join hundreds of service businesses already using Quantum Connects
            to never miss a call again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50">
              <Link to="/book-demo">
                Schedule a Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-transparent text-white border-2 border-white hover:bg-white/10"
            >
              <Link to="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
          <p className="text-sm text-blue-100 mt-4">
            7 days free • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
