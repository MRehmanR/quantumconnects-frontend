import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FAQ() {
  const faqs = [
    {
      id: "setup",
      question: "How long does it take to set up Quantum Connects?",
      answer:
        "Getting started is straightforward. You'll schedule a 30-minute onboarding call with our team, fill out a quick onboarding form, and we'll handle the personalized setup and customization for your business. Once everything is configured to your needs, your AI receptionist goes live and starts answering calls immediately. No technical skills required.",
    },
    {
      id: "number",
      question: "Do I need to change my phone number?",
      answer:
        "No! You keep your existing phone number. You just forward calls to Quantum Connects, and we handle them intelligently. When you want to take calls yourself, you can turn the system off anytime.",
    },
    {
      id: "cost",
      question: "How much does Quantum Connects cost?",
      answer:
        "We offer three main plans: Rise (£99/month for 150 minutes), Elevate (£249/month for 500 minutes), and Apex (£499/month for 1,100 minutes). CRM integration is included free in Apex, or available as a one-time £297 add-on for Rise and Elevate. There's also a custom Bespoke plan for enterprise needs.",
    },
    {
      id: "trial",
      question: "Is there a free trial?",
      answer:
        "Yes! You get 7 days completely free with no credit card required. You can cancel anytime. During the trial, you get full access to all features in your chosen plan so you can experience the full value.",
    },
    {
      id: "minutes",
      question: "What happens if I exceed my monthly minutes?",
      answer:
        "Your plan includes a set number of minutes per month. You'll receive alerts as you approach your limit, and again when you reach 100% usage. At both points, you'll have options to either upgrade to a higher plan or purchase add-on minute packs. Once you hit 100% usage, incoming calls automatically route directly to your business owners so you never miss a customer.",
    },
    {
      id: "customize",
      question: "Can I customize how Quantum Connects answers calls?",
      answer:
        "Absolutely! You can customize the greeting, business information, and how the AI should handle different types of calls. The system learns your business and adapts to your specific needs and preferences.",
    },
    {
      id: "integration",
      question: "Does Quantum Connects integrate with my existing systems?",
      answer:
        "Yes! Quantum Connects integrates with popular CRM systems, calendar applications, and booking platforms. CRM integration is included in the Apex plan or available as an add-on for Rise and Elevate plans.",
    },
    {
      id: "support",
      question: "What's the best way to reach your support team?",
      answer:
        "You can reach us via email at hello@quantumconnects.com or through live chat support. For urgent issues, we also offer live chat support to all customers.",
    },
    {
      id: "onboarding",
      question: "Do you offer onboarding support?",
      answer:
        "Yes! All new customers receive personalized onboarding support to ensure they get the most out of Quantum Connects. We'll help you set up your AI receptionist and customize it for your business. Your dedicated onboarding specialist will guide you through configuration, answer your questions, and ensure your system is perfectly tailored to your operations.",
    },
    {
      id: "cancel",
      question: "Can I cancel anytime?",
      answer:
        "Yes, absolutely. There are no long-term contracts. You can cancel your subscription anytime with no penalties. Your data is always yours, and you can export it whenever you need.",
    },
    {
      id: "industries",
      question: "What industries does Quantum Connects work best for?",
      answer:
        "Quantum Connects works for any business that communicates with customers over the phone. From salons, dental practices, and aesthetic clinics to legal firms, accountants, trades, restaurants, and beyond, if your phone rings, we handle it. Booking appointments, answering enquiries, taking orders, collecting payments, routing urgent calls, and more. If your business relies on phone communication, Quantum Connects works for you.",
    },
    {
      id: "accuracy",
      question: "How accurate is the AI at taking information?",
      answer:
        "Our AI has a 99%+ accuracy rate for capturing customer information, booking details, and payment information. It's trained to ask clarifying questions when needed and confirms all details before completing a booking.",
    },
    {
      id: "languages",
      question: "Does Quantum Connects support multiple languages?",
      answer:
        "Currently, Quantum Connects operates in English. We're working on multi-language support for future releases. If this is important for your business, let us know and we can discuss custom solutions.",
    },
    {
      id: "security",
      question: "Is my customer data secure?",
      answer:
        "Yes. Quantum Connects is HIPAA compliant, ICO registered, and uses enterprise-grade encryption. We follow strict data protection protocols and never share your customer information with third parties. Your data is yours alone.",
    },
    {
      id: "deposits",
      question: "Can Quantum Connects collect payments?",
      answer:
        "Yes. Quantum Connects can collect deposits and payments directly over the phone at the time of booking. You configure the amount — whether that is a fixed deposit or a percentage of the service — and your AI receptionist handles it seamlessly during the call. Funds go directly to your business via your connected payment account. No chasing, no no-shows, no manual follow-up required.",
    },
    {
      id: "escalation",
      question: "What happens if a call needs to be escalated to a human?",
      answer:
        "Quantum Connects intelligently identifies when a call needs human attention and can transfer to your team immediately. You can set rules for urgent calls, complex inquiries, or specific customer requests that require a personal touch.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Everything you need to know about Quantum Connects
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Our team is here to help. Get in touch via email or chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
