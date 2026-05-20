import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { CheckCircle, TrendingUp, Users, Zap, ArrowRight } from "lucide-react";

export default function Affiliates() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 -z-10" />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Earn Recurring Commissions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join our affiliate program and earn 10% recurring commission on
              every paying customer you refer. Based on our Core package (£249/month).
            </p>
            <Link href="/">
              <a>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Become an Affiliate
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Join Our Affiliate Program?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border border-border">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                10% Recurring Commission
              </h3>
              <p className="text-muted-foreground">
                Earn 10% of the monthly subscription value for every customer
                you refer. Commissions continue as long as they remain a paying
                customer.
              </p>
            </Card>

            <Card className="p-8 border border-border">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Dedicated Support
              </h3>
              <p className="text-muted-foreground">
                Get access to our affiliate team who will help you succeed with
                marketing materials, tracking, and personalized support.
              </p>
            </Card>

            <Card className="p-8 border border-border">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Easy Tracking
              </h3>
              <p className="text-muted-foreground">
                Real-time dashboard to track your referrals, conversions, and
                earnings. Get paid monthly via bank transfer or PayPal.
              </p>
            </Card>

            <Card className="p-8 border border-border">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                No Limits
              </h3>
              <p className="text-muted-foreground">
                There's no cap on how much you can earn. The more customers you
                refer, the more you make.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create your affiliate account in minutes",
              },
              {
                step: "2",
                title: "Get Your Link",
                description: "Receive your unique referral link and materials",
              },
              {
                step: "3",
                title: "Share & Refer",
                description: "Share with your network and start earning",
              },
              {
                step: "4",
                title: "Get Paid",
                description: "Earn 10% recurring commission monthly",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Examples */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Earning Examples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                referrals: "5 Customers",
                avgValue: "£249/month",
                commission: "£124.50/month",
                annual: "£1,494/year",
              },
              {
                referrals: "10 Customers",
                avgValue: "£249/month",
                commission: "£249/month",
                annual: "£2,988/year",
              },
              {
                referrals: "20 Customers",
                avgValue: "£249/month",
                commission: "£498/month",
                annual: "£5,976/year",
              },
            ].map((example, index) => (
              <Card key={index} className="p-6 border border-border text-center">
                <p className="text-lg font-bold text-primary mb-2">
                  {example.referrals}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  @ {example.avgValue} average
                </p>
                <div className="bg-secondary p-4 rounded-lg mb-4">
                  <p className="text-2xl font-bold text-foreground">
                    {example.commission}
                  </p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
                <p className="text-sm text-accent font-semibold">
                  {example.annual} annually
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Who Should Join?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              "Service business consultants",
              "Business coaches & mentors",
              "Digital marketing agencies",
              "Accounting & bookkeeping firms",
              "Business software reviewers",
              "Industry bloggers & influencers",
              "B2B SaaS marketers",
              "Local business networks",
            ].map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Marketing Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Email Templates",
                description: "Pre-written email templates to share with your network",
              },
              {
                title: "Social Media Graphics",
                description: "Ready-to-use graphics for Twitter, LinkedIn, and Facebook",
              },
              {
                title: "Landing Page",
                description: "Custom landing page to share with your audience",
              },
              {
                title: "Case Studies",
                description: "Real customer success stories to build credibility",
              },
              {
                title: "Video Demos",
                description: "Product demo videos to showcase features",
              },
              {
                title: "Affiliate Dashboard",
                description: "Real-time tracking of your referrals and earnings",
              },
            ].map((resource, index) => (
              <Card key={index} className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {resource.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Earning Today
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Join our growing network of affiliates earning recurring commissions
            by referring Quantum Connects.
          </p>
          <Link href="/">
            <a>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-blue-50"
              >
                Become an Affiliate
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
