import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { CheckCircle, TrendingUp, Clock, Phone, ArrowRight } from "lucide-react";

interface IndustryPageProps {
  title: string;
  subtitle: string;
  painPoint: string;
  stats: {
    label: string;
    value: string;
  }[];
  keyFeatures: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    business: string;
  };
  cta: string;
}

export default function IndustryPage({
  title,
  subtitle,
  painPoint,
  stats,
  keyFeatures,
  testimonial,
  cta,
}: IndustryPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 -z-10" />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{subtitle}</p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/book-demo">
                Schedule a Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl mx-auto">
          <div className="bg-secondary p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The Challenge
            </h2>
            <p className="text-lg text-muted-foreground">{painPoint}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              By The Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 border border-border text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Features Section */}
      {keyFeatures.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              How Quantum Connects Helps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((feature, index) => (
                <Card key={index} className="p-8 border border-border">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {testimonial && (
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center">
              <div className="mb-6 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl"></span>
                ))}
              </div>
              <blockquote className="text-2xl font-semibold text-foreground mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <p className="text-lg font-semibold text-foreground">
                {testimonial.author}
              </p>
              <p className="text-muted-foreground">{testimonial.business}</p>
            </div>
          </div>
        </section>
      )}

      {/* Features Comparison */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            What You Get
          </h2>
          <div className="space-y-3">
            {[
              "24/7 call answering - never miss a customer call again",
              "Automatic appointment booking and calendar management",
              "SMS confirmations and reminders to reduce no-shows",
              "Deposit collection at time of booking",
              "Waitlist management for cancellations",
              "Escalation handling for urgent calls",
              "Daily reports and analytics",
              "Google Reviews automation",
              "Integration with your existing systems",
            ].map((feature, index) => (
              <div key={index} className="flex gap-3 items-start p-4 bg-secondary rounded-lg">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Affordable Plans for Every Business
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border border-border">
              <p className="text-lg font-bold text-foreground mb-2">Starter</p>
              <p className="text-3xl font-bold text-primary mb-4">£99</p>
              <p className="text-sm text-muted-foreground">/month</p>
            </Card>
            <Card className="p-6 border border-border bg-primary text-white">
              <p className="text-lg font-bold mb-2">Core</p>
              <p className="text-3xl font-bold mb-4">£249</p>
              <p className="text-sm opacity-90">/month</p>
              <p className="text-xs mt-4 opacity-75">Most Popular</p>
            </Card>
            <Card className="p-6 border border-border">
              <p className="text-lg font-bold text-foreground mb-2">Pro</p>
              <p className="text-3xl font-bold text-primary mb-4">£499</p>
              <p className="text-sm text-muted-foreground">/month</p>
            </Card>
          </div>
          <p className="text-muted-foreground mb-8">
            Start with a free 7-day trial. No credit card required.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/book-demo">
              Schedule a Demo
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Join hundreds of businesses already using Quantum Connects to capture every customer call.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-blue-50">
              <Link to="/book-demo">
                Schedule a Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent text-white border-2 border-white hover:bg-white/10">
              <Link to="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
