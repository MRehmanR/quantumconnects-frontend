import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Users, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 -z-10" />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Quantum Connects
            </h1>
            <p className="text-lg text-muted-foreground">
              We're on a mission to empower service businesses with intelligent
              AI technology that transforms how they handle customer calls.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                We believe that every service business deserves access to
                world-class customer communication technology. Our mission is to
                level the playing field by making AI-powered call handling
                affordable and accessible to SMBs.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                By automating routine call handling, appointment booking, and
                customer follow-ups, we free up business owners to focus on
                what they do best: delivering exceptional service to their
                customers.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/signup">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg h-96" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border border-border">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Innovation
              </h3>
              <p className="text-muted-foreground">
                We continuously push the boundaries of AI technology to deliver
                cutting-edge solutions that solve real business problems.
              </p>
            </Card>

            <Card className="p-8 border border-border">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Customer-Centric
              </h3>
              <p className="text-muted-foreground">
                Our customers' success is our success. We listen, iterate, and
                build features that truly matter to service businesses.
              </p>
            </Card>

            <Card className="p-8 border border-border">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Reliability
              </h3>
              <p className="text-muted-foreground">
                Your business depends on us. We maintain 99.9% uptime and
                provide 24/7 support to ensure you never miss a call.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Built by Experts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Umar Jahangir",
                role: "Founder & CEO",
                bio: "Former VP of Product at a leading telecom company with 15+ years in AI and voice technology.",
              },
              {
                name: "Sarah Chen",
                role: "CTO",
                bio: "AI researcher with expertise in natural language processing and voice synthesis. PhD from Stanford.",
              },
              {
                name: "Michael Torres",
                role: "VP of Customer Success",
                bio: "Service business veteran who ran a plumbing company for 10 years. Knows the pain points firsthand.",
              },
            ].map((member, index) => (
              <Card key={index} className="p-6 border border-border text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-semibold text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Active Customers" },
              { number: "2M+", label: "Calls Handled" },
              { number: "£10M+", label: "Revenue Generated" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become part of a community of service businesses transforming how
            they handle customer communication.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/signup">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
