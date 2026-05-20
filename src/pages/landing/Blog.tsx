import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "How AI Voice Receptionists Are Transforming Service Businesses",
      excerpt:
        "Discover how AI technology is revolutionizing customer communication for plumbers, electricians, and other service businesses.",
      date: "March 28, 2026",
      author: "Sarah Chen",
      category: "AI & Technology",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "5 Ways to Reduce No-Shows and Increase Revenue",
      excerpt:
        "Learn proven strategies to minimize appointment cancellations and boost your bottom line with automated reminders.",
      date: "March 25, 2026",
      author: "Michael Torres",
      category: "Business Tips",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "The ROI of Automating Your Call Handling",
      excerpt:
        "A detailed analysis of how service businesses save time and money by automating customer communication.",
      date: "March 20, 2026",
      author: "Alex Johnson",
      category: "Case Studies",
      readTime: "8 min read",
    },
    {
      id: 4,
      title: "Customer Success Story: How a Plumbing Company Increased Bookings by 40%",
      excerpt:
        "Real-world example of how Quantum Connects helped a London-based plumbing company transform their business.",
      date: "March 15, 2026",
      author: "Sarah Chen",
      category: "Case Studies",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "Best Practices for Setting Up Your AI Receptionist",
      excerpt:
        "A comprehensive guide to configuring your Quantum Connects AI receptionist for maximum effectiveness.",
      date: "March 10, 2026",
      author: "Michael Torres",
      category: "Guides",
      readTime: "9 min read",
    },
    {
      id: 6,
      title: "The Future of Customer Service: What's Next for AI?",
      excerpt:
        "Exploring emerging trends and innovations in AI-powered customer communication and what they mean for your business.",
      date: "March 5, 2026",
      author: "Alex Johnson",
      category: "Industry Insights",
      readTime: "7 min read",
    },
  ];

  const categories = [
    "All Posts",
    "AI & Technology",
    "Business Tips",
    "Case Studies",
    "Guides",
    "Industry Insights",
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
              Blog & Resources
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights, tips, and best practices for service businesses using AI
              to transform their customer communication.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  index === 0
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground hover:bg-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-teal-100" />

                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-t border-border pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-accent">
                        {post.readTime}
                      </span>
                      <button className="text-primary hover:text-primary/80 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground">
              Get the latest insights and tips delivered to your inbox.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Start your free trial today and see how Quantum Connects can
            revolutionize your customer communication.
          </p>
          <Link href="/">
            <a>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-blue-50"
              >
                Start Your Free Trial
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
