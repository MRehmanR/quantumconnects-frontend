import LandingNav from "@/components/landing/LandingNav";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(at 40% 50%, hsl(239 84% 67% / 0.6) 0px, transparent 60%)"
      }} />
      <div className="relative container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-primary-foreground mb-4"
        >
          Ready to never miss a call?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-primary-foreground/70 mb-8 max-w-lg mx-auto"
        >
          Join 1,800+ businesses already using QuantumConnects to automate their customer communications.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-base font-semibold group">
              Start for Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
