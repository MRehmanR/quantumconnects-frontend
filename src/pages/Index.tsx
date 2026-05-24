import { ArrowRight, Calendar, CheckCircle, CreditCard, MessageSquare, Phone, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SourceHeader from "@/components/landing/SourceHeader";
import SourceFooter from "@/components/landing/SourceFooter";
import SourceLiveCounterV2 from "@/components/landing/SourceLiveCounterV2";
import SourceTrustBadges from "@/components/landing/SourceTrustBadges";
import SourceReviewsCarousel from "@/components/landing/SourceReviewsCarousel";
import LandingChatbot from "@/components/landing/LandingChatbot";

const features = [
  {
    icon: Phone,
    title: "24/7 AI Voice Answering",
    description: "Never miss a call. Your AI receptionist answers instantly.",
  },
  {
    icon: Calendar,
    title: "Smart Appointment Booking",
    description: "Automated scheduling with calendar integration.",
  },
  {
    icon: CreditCard,
    title: "Deposit Processing",
    description: "Collect deposits securely during calls.",
  },
  {
    icon: MessageSquare,
    title: "Escalation & Urgent Handling",
    description: "Critical calls routed to you immediately.",
  },
  {
    icon: TrendingUp,
    title: "Google Reviews Automation",
    description: "Automatically request and collect reviews.",
  },
  {
    icon: MessageSquare,
    title: "Outbound Messaging",
    description: "Send automated reminders and updates to clients.",
  },
  {
    icon: CheckCircle,
    title: "Cancellation Management",
    description: "Handle cancellations and rescheduling automatically.",
  },
  {
    icon: TrendingUp,
    title: "Waitlist Management",
    description: "Automatically fill cancellations from your waitlist.",
  },
  {
    icon: MessageSquare,
    title: "Daily Reports & Analytics",
    description: "Get detailed insights into your business performance.",
  },
];

export default function Index() {
  const location = useLocation();

  useEffect(() => {
    const pathToSection: Record<string, string> = {
      "/features": "features",
      "/pricing": "pricing",
      "/book-demo": "pricing",
      "/testimonials": "reviews",
      "/faq": "pricing",
      "/about": "how-it-works",
      "/industries": "features",
      "/affiliates": "pricing",
      "/white-label": "pricing",
    };

    const sectionId = pathToSection[location.pathname];
    if (sectionId) {
      requestAnimationFrame(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.getBoundingClientRect().height : 0;
          const top = section.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SourceHeader />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 -z-10" />
        <div className="container px-4 md:px-0">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your AI Voice Receptionist for <span className="text-primary">Service Businesses</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Never miss a call again. Quantum Connects answers your business calls 24/7, books appointments,
              collects deposits, and keeps your customers happy-all automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button size="lg" variant="outline">Schedule a Demo</Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">✓ 7 days free • No credit card required • Cancel anytime</p>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24">
        <div className="container px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features Built for Your Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage calls, bookings, and customer relationships-all in one intelligent
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="p-6 hover:shadow-lg transition-shadow border border-border"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get set up with personalized support. Our onboarding team ensures your AI receptionist is perfectly
              configured for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Schedule Onboarding",
                description: "Book a 30-minute call with our onboarding specialist",
              },
              {
                step: "2",
                title: "Complete Setup Form",
                description: "Fill out your business details and preferences",
              },
              {
                step: "3",
                title: "Personalized Configuration",
                description: "We customize your AI receptionist for your specific needs",
              },
              {
                step: "4",
                title: "Go Live",
                description: "Your AI receptionist is live and ready to answer calls",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SourceLiveCounterV2 />
      <SourceTrustBadges />
      <section id="reviews">
        <SourceReviewsCarousel />
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4 md:px-0">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Why Businesses Choose Quantum Connects
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-12">
              Powerful features that transform how you handle calls and grow your business
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Never Miss Another Call",
                  description:
                    "Most callers hang up if no one answers. Quantum Connects answers instantly, captures details, and ensures you never lose an opportunity again.",
                },
                {
                  title: "10x Cheaper Than a Receptionist",
                  description:
                    "No payroll, no employee management, no benefits. Get professional call handling and appointment booking at a fraction of traditional staffing costs.",
                },
                {
                  title: "AI Built for Your Business",
                  description:
                    "Unlike generic answering services, Quantum Connects learns your business specifics and handles calls exactly the way you need-no scripted, robotic responses.",
                },
                {
                  title: "Complete Control, Complete Flexibility",
                  description:
                    "Turn Quantum Connects on or off anytime. You decide when it answers calls, when it escalates to you, and how it represents your business.",
                },
                {
                  title: "Live in Minutes, No Setup Hassle",
                  description:
                    "No new phone number needed. No complex integrations. Forward your existing calls and Quantum Connects is ready to work-start taking calls today.",
                },
                {
                  title: "Built for Growth",
                  description:
                    "Advanced analytics, Google Reviews automation, deposit collection, and waitlist management-everything you need to scale your service business efficiently.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Join hundreds of service businesses already using Quantum Connects to never miss a call again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-demo">
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50">
                Schedule a Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button
                size="lg"
                className="bg-transparent text-white border-2 border-white hover:bg-white/10"
              >
                Start Your Free Trial
              </Button>
            </Link>
          </div>

          <p className="text-sm text-blue-100 mt-4">7 days free • No credit card required • Cancel anytime</p>
        </div>
      </section>

      <SourceFooter />
      <LandingChatbot />
    </div>
  );
}
