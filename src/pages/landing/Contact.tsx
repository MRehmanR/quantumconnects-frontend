import { useState } from "react";
import { Clock3, Mail, MessageSquare, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent. We will get back to you shortly.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="container py-8 sm:py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 md:mb-5">
              Get in Touch
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Questions about setup, pricing, or integrations? Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10">
        <div className="container">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
            <div className="space-y-4">
              <Card className="border border-border p-5">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a
                  href="mailto:hello@quantumconnects.com"
                  className="break-words text-muted-foreground hover:text-primary"
                >
                  hello@quantumconnects.com
                </a>
              </Card>

              <Card className="border border-border p-5">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock3 className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  We usually respond within one business day.
                </p>
              </Card>

              <Card className="border border-border p-5">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Best for Support</h3>
                <p className="text-sm text-muted-foreground">
                  Include your business name and any relevant details so we can help faster.
                </p>
              </Card>
            </div>

            <Card className="border border-border p-5 sm:p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Send us a Message</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us what you need and we will follow up with the best next steps.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full resize-none rounded-lg border border-border bg-white px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Phone className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-12 md:py-20">
        <div className="container max-w-3xl">
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold">Common Questions</h2>

          <div className="space-y-4">
            {[
              {
                question: "What is the best way to reach support?",
                answer:
                  "Email us at hello@quantumconnects.com with your account and business details.",
              },
              {
                question: "Do you offer onboarding support?",
                answer:
                  "Yes. We guide every customer through setup to make sure your call flow works correctly.",
              },
              {
                question: "Can you help with custom integrations?",
                answer:
                  "Yes. For advanced workflows or custom integrations, contact us and we will review options.",
              },
            ].map((faq) => (
              <Card key={faq.question} className="border border-border bg-white p-5">
                <h3 className="mb-2 font-semibold">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

