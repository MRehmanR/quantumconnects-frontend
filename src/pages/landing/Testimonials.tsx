import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Owner",
      company: "Bloom Hair Salon",
      image: "",
      rating: 5,
      text: "Quantum Connects has been a game-changer for our salon. We've reduced missed calls by 95% and our booking rate has increased by 40%. The AI is so natural, customers don't even realize they're talking to a system.",
    },
    {
      id: 2,
      name: "James Chen",
      role: "Manager",
      company: "Premier Dental Practice",
      image: "",
      rating: 5,
      text: "The deposit collection feature alone has saved us thousands. Patients appreciate the automated reminders, and our no-show rate dropped from 15% to just 3%. Highly recommend!",
    },
    {
      id: 3,
      name: "Lisa Thompson",
      role: "Owner",
      company: "Thompson Plumbing",
      image: "",
      rating: 5,
      text: "As a plumbing business, we get emergency calls at all hours. Quantum Connects handles them perfectly, qualifying leads and scheduling urgent jobs. It's like having a receptionist 24/7 for a fraction of the cost.",
    },
    {
      id: 4,
      name: "Marcus Rodriguez",
      role: "Owner",
      company: "Elite Fitness Studio",
      image: "",
      rating: 5,
      text: "Setup was incredibly easy. Within 10 minutes, our calls were being answered. The system books classes, collects deposits, and manages cancellations automatically. Our team can focus on what matters—training clients.",
    },
    {
      id: 5,
      name: "Emma Watson",
      role: "Owner",
      company: "Glow Aesthetic Clinic",
      image: "",
      rating: 5,
      text: "The Google Reviews automation is fantastic. We're getting more 5-star reviews posted automatically, which has improved our online reputation significantly. Conversion rates are up 35%.",
    },
    {
      id: 6,
      name: "David Park",
      role: "Managing Partner",
      company: "Park & Associates Legal",
      image: "",
      rating: 5,
      text: "We were skeptical about AI handling client calls, but Quantum Connects has exceeded expectations. It qualifies leads perfectly and schedules consultations with 99% accuracy. Our intake process is now 10x more efficient.",
    },
    {
      id: 7,
      name: "Rachel Green",
      role: "Owner",
      company: "Green's Beauty Bar",
      image: "",
      rating: 5,
      text: "The waitlist management feature is brilliant. When someone cancels, the system automatically offers their slot to people on the waitlist. We've eliminated dead time and increased revenue by 25%.",
    },
    {
      id: 8,
      name: "Tom Anderson",
      role: "Owner",
      company: "Anderson's Electric",
      image: "",
      rating: 5,
      text: "Missed calls were costing us £500+ per month in lost jobs. Quantum Connects has recovered almost all of those. The ROI was immediate. Best investment we've made for the business.",
    },
    {
      id: 9,
      name: "Nicole Foster",
      role: "Owner",
      company: "Foster Physio Clinic",
      image: "",
      rating: 5,
      text: "The appointment reminders reduce no-shows dramatically. Patients appreciate the professional touch, and our therapists aren't sitting idle waiting for clients. Productivity is up 30%.",
    },
    {
      id: 10,
      name: "Michael Chang",
      role: "Owner",
      company: "Chang's Restaurant Group",
      image: "",
      rating: 5,
      text: "Reservations are handled instantly, 24/7. During peak times, our staff can focus on customers instead of answering phones. Table turnover has increased, and customer satisfaction is higher.",
    },
    {
      id: 11,
      name: "Sophie Laurent",
      role: "Owner",
      company: "Laurent Accounting Services",
      image: "",
      rating: 5,
      text: "Tax season is chaos, but Quantum Connects keeps it organized. The system schedules consultations, collects initial information, and prioritizes urgent calls. We've never been more efficient.",
    },
    {
      id: 12,
      name: "Robert Hayes",
      role: "Owner",
      company: "Hayes Taxi Services",
      image: "",
      rating: 5,
      text: "Booking calls instantly through the AI has reduced our dispatch time significantly. Customers love the speed and professionalism. Our average ride-per-day has increased by 20%.",
    },
    {
      id: 13,
      name: "Amanda Price",
      role: "Manager",
      company: "Price's Fast Food",
      image: "",
      rating: 5,
      text: "Order taking is now 100% automated during peak hours. The system handles volume perfectly, orders are accurate, and customers appreciate the speed. Kitchen efficiency is up 40%.",
    },
    {
      id: 14,
      name: "Kevin O'Brien",
      role: "Owner",
      company: "O'Brien's Electrical Contractors",
      image: "",
      rating: 5,
      text: "The outbound messaging feature keeps clients updated on job status automatically. Fewer support calls, happier customers, and our team can focus on the actual work. Highly satisfied.",
    },
    {
      id: 15,
      name: "Victoria Stone",
      role: "Owner",
      company: "Stone Beauty Salon",
      image: "",
      rating: 5,
      text: "From day one, Quantum Connects felt like part of our team. The AI learned our business quickly and handles calls exactly how we'd want them handled. Revenue is up 30% in just 3 months.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Loved by Service Businesses
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              See how Quantum Connects is transforming businesses across industries
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join Them?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Start your free 7-day trial and see the difference Quantum Connects can make
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
