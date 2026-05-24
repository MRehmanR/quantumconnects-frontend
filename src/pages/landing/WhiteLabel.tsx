import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";

export default function WhiteLabel() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center py-24">
          {/* Coming Soon Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-8">
            <Clock className="w-10 h-10 text-white" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            White Label Solutions
          </h1>

          {/* Subheading */}
          <p className="text-xl text-muted-foreground mb-8">
            Coming Soon
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            We're building comprehensive white label solutions that will allow agencies, consultants, and resellers to offer Quantum Connects services under their own brand. This is coming soon.
          </p>

          {/* Features Preview */}
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h3 className="text-xl font-bold text-foreground mb-6">What's Coming</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "Custom branding & domain",
                "White label dashboard",
                "Revenue share models",
                "Dedicated API access",
                "Advanced analytics",
                "Priority support",
              ].map((feature, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                Notify Me When Ready
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
