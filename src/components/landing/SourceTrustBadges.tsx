import { Shield } from "lucide-react";

export default function SourceTrustBadges() {
  const badges = [
    {
      icon: "🏥",
      label: "HIPAA Compliant",
      description: "Healthcare data protected",
    },
    {
      icon: "🔐",
      label: "ICO Registered",
      description: "UK data protection certified",
    },
    {
      icon: "💳",
      label: "Stripe Verified",
      description: "Secure payment processing",
    },
    {
      icon: "🛡️",
      label: "GDPR Compliant",
      description: "EU data regulations met",
    },
    {
      icon: "✓",
      label: "SOC 2 Type II",
      description: "Security & availability audited",
    },
    {
      icon: "🔒",
      label: "256-bit SSL",
      description: "Military-grade encryption",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200">
      <div className="container">
        <div className="text-center mb-10">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">
            Security & Compliance
          </h3>
          <p className="text-foreground font-medium">
            Your data is protected by industry-leading security standards
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-slate-200 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-xs font-semibold text-foreground text-center mb-1">{badge.label}</p>
              <p className="text-xs text-muted-foreground text-center">{badge.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex gap-3 items-start">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-1">Your data is safe with us</p>
              <p className="text-sm text-muted-foreground">
                We use enterprise-grade encryption, regular security audits, and comply with all major data
                protection regulations. Your customer data is backed up daily and protected by multiple layers of
                security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
