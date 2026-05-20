import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { industries, getAllCategories, getIndustriesByCategory } from "@/lib/industries";
import TrustBadges from "@/components/TrustBadges";
import { ArrowRight, Zap } from "lucide-react";

export default function IndustriesListing() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 -z-10" />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Quantum Connects for Your Industry
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover how Quantum Connects transforms call handling for service
              businesses across all sectors. With support for over 70 industries,
              find your trade below to see specific benefits and real results.
            </p>
            <p className="text-md text-accent font-semibold">
              {industries.length}+ Industries Supported
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid by Category */}
      <section className="py-16 md:py-24">
        <div className="container">
          {categories.map((category) => {
            const categoryIndustries = getIndustriesByCategory(category);
            return (
              <div key={category} className="mb-20">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryIndustries.map((industry) => (
                    <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                      <a>
                        <Card className="p-6 border border-border hover:border-primary hover:shadow-lg transition-all h-full cursor-pointer group">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="text-3xl mb-2">
                                {industry.icon || "🏢"}
                              </div>
                              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {industry.title.replace("AI Receptionist for ", "")}
                              </h3>
                            </div>
                            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                          </div>

                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {industry.subtitle}
                          </p>

                          {/* Key Stats */}
                          <div className="space-y-2 mb-6 py-4 border-t border-b border-border">
                            {industry.stats.slice(0, 2).map((stat, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {stat.label}
                                </span>
                                <span className="font-semibold text-foreground">
                                  {stat.value}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                          >
                            Learn More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Card>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Common Challenges Across All Industries
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                challenge: "Missed Calls",
                impact: "Lost revenue from calls you never answered",
                solution: "24/7 AI answering captures every opportunity",
              },
              {
                challenge: "No-Shows",
                impact: "Empty appointments cost you money",
                solution: "Automatic SMS reminders reduce no-shows by 40%",
              },
              {
                challenge: "Manual Booking",
                impact: "Staff time spent on admin instead of service",
                solution: "Automated booking frees up your team",
              },
              {
                challenge: "After-Hours Calls",
                impact: "Customers call when you're closed",
                solution: "AI answers 24/7, even when you sleep",
              },
              {
                challenge: "Deposit Collection",
                impact: "No-shows without commitment",
                solution: "Collect deposits automatically during booking",
              },
              {
                challenge: "Poor Customer Experience",
                impact: "Customers frustrated by slow response",
                solution: "Instant answers and professional service",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6 border border-border">
                <div className="flex items-start gap-3 mb-4">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-foreground">
                    {item.challenge}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Impact:</strong> {item.impact}
                </p>
                <p className="text-sm text-accent font-semibold">
                  ✓ {item.solution}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features by Industry Type */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Industry-Specific Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
              <h3 className="text-xl font-bold text-foreground mb-4">
                For Service Trades & Emergency Services
              </h3>
              <ul className="space-y-3">
                {[
                  "Emergency call routing & escalation",
                  "Job quote capture & dispatch",
                  "Deposit collection for security",
                  "Waitlist & cancellation management",
                  "Daily job reports & analytics",
                  "24/7 availability for after-hours calls",
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-200">
              <h3 className="text-xl font-bold text-foreground mb-4">
                For Professional Services
              </h3>
              <ul className="space-y-3">
                {[
                  "New client enquiry capture",
                  "Consultation booking & scheduling",
                  "Call recording & compliance",
                  "Escalation handling for urgent matters",
                  "After-hours availability",
                  "Lead qualification & prioritization",
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-purple-600 font-bold mt-1">✓</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg border border-green-200">
              <h3 className="text-xl font-bold text-foreground mb-4">
                For Salons, Spas & Personal Services
              </h3>
              <ul className="space-y-3">
                {[
                  "Appointment booking & confirmation",
                  "Deposit protection for premium services",
                  "Cancellation & rescheduling handling",
                  "Waitlist automation & SMS notifications",
                  "No-show reduction with reminders",
                  "Recurring appointment management",
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-lg border border-orange-200">
              <h3 className="text-xl font-bold text-foreground mb-4">
                For Restaurants, Hospitality & Dining
              </h3>
              <ul className="space-y-3">
                {[
                  "Reservation booking & table management",
                  "Waitlist handling during peak hours",
                  "Special requests & dietary capture",
                  "No-show reduction with confirmations",
                  "Party size & seating preferences",
                  "Peak hour call overflow handling",
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-orange-600 font-bold mt-1">✓</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-lg border border-cyan-200">
              <h3 className="text-xl font-bold text-foreground mb-4">
                For Installation & Construction
              </h3>
              <ul className="space-y-3">
                {[
                  "Project enquiry capture & qualification",
                  "Site survey scheduling & management",
                  "Quote request handling",
                  "Project timeline & scope capture",
                  "Budget & specification details",
                  "Appointment confirmation & reminders",
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-lg border border-rose-200">
              <h3 className="text-xl font-bold text-foreground mb-4">
                For Healthcare & Wellness
              </h3>
              <ul className="space-y-3">
                {[
                  "New patient enquiry capture",
                  "Appointment booking & management",
                  "Emergency call handling & escalation",
                  "Consultation scheduling",
                  "Patient information collection",
                  "Compliance & HIPAA-ready recording",
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-rose-600 font-bold mt-1">✓</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            No matter your industry, Quantum Connects has a solution tailored to
            your needs. Join over 500+ service businesses already using Quantum Connects.
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
                variant="outline"
                className="text-white border-white hover:bg-blue-600"
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
