import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Owner",
    company: "Bloom Hair Salon",
    text: "Quantum Connects has transformed how we handle bookings. We've reduced missed calls by 95% and our customers love the instant confirmations.",
    rating: 5,
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "Manager",
    company: "Elite Plumbing",
    text: "The AI receptionist handles our emergency calls perfectly. We've increased bookings by 40% in just three months.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Practice Manager",
    company: "Smile Dental Clinic",
    text: "Outstanding service. The system manages our appointment reminders and reduces no-shows significantly.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Chen",
    role: "Owner",
    company: "Zen Physio",
    text: "Best investment we've made for our business. The deposit collection feature alone has improved our cash flow.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Owner",
    company: "Beauty & Glow Spa",
    text: "Quantum Connects is like having a dedicated receptionist 24/7. Our team can focus on clients instead of phones.",
    rating: 5,
  },
  {
    id: 6,
    name: "Michael Johnson",
    role: "Owner",
    company: "Quick Electricians",
    text: "The Google Reviews automation has been a game-changer. We're getting more positive reviews and referrals.",
    rating: 5,
  },
  {
    id: 7,
    name: "Rachel Green",
    role: "Owner",
    company: "Glow Up Beauty",
    text: "Customer support is amazing. Any questions I have are answered within minutes. Highly recommend.",
    rating: 5,
  },
  {
    id: 8,
    name: "Tom Wilson",
    role: "Owner",
    company: "Pro Cleaning Services",
    text: "The outbound messaging feature keeps our customers engaged. Booking confirmations have never been easier.",
    rating: 5,
  },
  {
    id: 9,
    name: "Jessica Lee",
    role: "Manager",
    company: "Aesthetic Clinic Pro",
    text: "Deposit collection through the AI is seamless. Our revenue tracking has improved dramatically.",
    rating: 5,
  },
  {
    id: 10,
    name: "Robert Martinez",
    role: "Owner",
    company: "Family Law Firm",
    text: "Professional and reliable. The system handles our complex scheduling perfectly.",
    rating: 5,
  },
  {
    id: 11,
    name: "Amanda Foster",
    role: "Owner",
    company: "Nails & Lashes Studio",
    text: "The daily reports give us insights we never had before. Data-driven decisions are now possible.",
    rating: 5,
  },
  {
    id: 12,
    name: "Christopher Brown",
    role: "Owner",
    company: "Accounting Solutions",
    text: "Quantum Connects integrates perfectly with our existing systems. Setup was incredibly smooth.",
    rating: 5,
  },
  {
    id: 13,
    name: "Victoria Hayes",
    role: "Owner",
    company: "Luxury Salon Group",
    text: "The waitlist management feature has optimized our scheduling. No more double-bookings.",
    rating: 5,
  },
  {
    id: 14,
    name: "Kevin Park",
    role: "Owner",
    company: "Restaurant Group",
    text: "Handling 100+ reservation calls daily is now effortless. Our team loves the extra bandwidth.",
    rating: 5,
  },
  {
    id: 15,
    name: "Sophie Turner",
    role: "Owner",
    company: "Wellness Center",
    text: "The ROI has been incredible. We're saving thousands monthly on receptionist costs while improving service.",
    rating: 5,
  },
];

export default function SourceReviewsCarousel() {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Loved by Service Businesses</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of businesses that trust Quantum Connects to handle their customer interactions
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <style>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .reviews-scroll {
            animation: scroll-left 30s linear infinite;
          }

          .reviews-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="reviews-scroll flex gap-6 pb-4">
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-96 bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-foreground font-medium mb-6">"{review.text}"</p>

              <div>
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">
                  {review.role} at {review.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
