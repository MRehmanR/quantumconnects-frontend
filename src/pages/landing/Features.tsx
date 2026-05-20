import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import {
  Phone,
  Calendar,
  CreditCard,
  MessageSquare,
  TrendingUp,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Phone,
      title: "24/7 AI Voice Answering",
      description:
        "Your AI receptionist answers calls instantly, even after hours. Natural-sounding conversations that customers trust.",
      benefits: [
        "Never miss a business call",
        "Professional call handling",
        "Multi-language support",
        "Customizable greeting messages",
      ],
    },
    {
      icon: Calendar,
      title: "Smart Appointment Booking",
      description:
        "Automated scheduling with real-time calendar integration. Reduce no-shows with automatic reminders.",
      benefits: [
        "Calendar sync (Google, Outlook)",
        "Automatic confirmation emails",
        "Waitlist management",
        "Cancellation handling",
      ],
    },
    {
      icon: CreditCard,
      title: "Deposit Processing",
      description:
        "Collect deposits and payments directly during calls. Secure, PCI-compliant payment processing.",
      benefits: [
        "Secure payment collection",
        "Multiple payment methods",
        "Automatic receipt generation",
        "Payment tracking & reporting",
      ],
    },
    {
      icon: MessageSquare,
      title: "Escalation & Urgent Handling",
      description:
        "Critical calls are routed to you immediately. Intelligent call routing based on keywords and urgency.",
      benefits: [
        "Real-time call escalation",
        "Priority routing rules",
        "Emergency contact alerts",
        "Custom escalation workflows",
      ],
    },
    {
      icon: TrendingUp,
      title: "Google Reviews Automation",
      description:
        "Automatically request reviews from satisfied customers. Boost your online reputation effortlessly.",
      benefits: [
        "Automatic review requests",
        "Review tracking dashboard",
        "Sentiment analysis",
        "Response templates",
      ],
    },
    {
      icon: MessageSquare,
      title: "Outbound Messaging",
      description:
        "Send appointment reminders, follow-ups, and updates via SMS and email automatically.",
      benefits: [
        "Automated reminders",
        "Custom message templates",
        "Scheduled messaging",
        "Delivery tracking",
      ],
    },
    {
      icon: BarChart3,
      title: "Daily Reports & Analytics",
      description:
        "Comprehensive insights into your call volume, booking rates, and business metrics.",
      benefits: [
        "Daily performance reports",
        "Call analytics dashboard",
        "Revenue tracking",
        "Custom report generation",
      ],
    },
    {
      icon: Phone,
      title: "Call Recording & Transcripts",
      description:
        "All calls are recorded and transcribed for quality assurance and compliance.",
      benefits: [
        "Full call recordings",
        "AI-powered transcripts",
        "Search & archive",
        "Compliance ready",
      ],
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
              Powerful Features for Modern Service Businesses
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage calls, bookings, and customer
              relationships—all powered by advanced AI.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Integrations That Work for You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seamlessly connect with your existing tools and workflows.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Google Calendar",
              "Outlook",
              "Zapier",
              "Stripe",
              "Twilio",
              "Slack",
              "HubSpot",
              "Mailchimp",
              "and more...",
            ].map((integration, index) => (
              <Card
                key={index}
                className="p-6 text-center border border-border hover:border-primary transition-colors"
              >
                <p className="font-semibold text-foreground">{integration}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Quantum Connects Stands Out
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">
                    Quantum Connects
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                    Traditional Receptionist
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                    Basic Voicemail
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  "24/7 Availability",
                  "Appointment Booking",
                  "Deposit Collection",
                  "Call Transcripts",
                  "Analytics & Reporting",
                  "Cost Effective",
                  "Scalable",
                ].map((feature, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-4 px-4 text-foreground font-medium">
                      {feature}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CheckCircle className="w-5 h-5 text-accent mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      {index === 0 || index === 5 ? "✗" : "✓"}
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      ✗
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience All Features Risk-Free
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Try Quantum Connects for 7 days with full access to all features.
          </p>
          <Link href="/book-demo">
            <a>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-blue-50 mr-4"
              >
                Schedule a Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </Link>
          <Link href="/">
            <a>
              <Button
                size="lg"
                className="bg-transparent text-white border-2 border-white hover:bg-white/10"
              >
                Start Your Free Trial
              </Button>
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
