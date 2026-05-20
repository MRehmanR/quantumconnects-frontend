import { useParams } from "wouter";
import { Phone, Clock, TrendingUp } from "lucide-react";
import IndustryPage from "./IndustryPage";
import { getIndustryBySlug } from "@/lib/industries";
import NotFound from "./NotFound";

const iconMap: Record<string, React.ReactNode> = {
  phone: <Phone className="w-6 h-6 text-white" />,
  clock: <Clock className="w-6 h-6 text-white" />,
  "trending-up": <TrendingUp className="w-6 h-6 text-white" />,
};

export default function IndustriesPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <NotFound />;
  }

  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return <NotFound />;
  }

  const keyFeaturesWithIcons = industry.keyFeatures.map((feature) => ({
    ...feature,
    icon: iconMap[feature.icon] || <Phone className="w-6 h-6 text-white" />,
  }));

  return (
    <IndustryPage
      title={industry.title}
      subtitle={industry.subtitle}
      painPoint={industry.painPoint}
      stats={industry.stats}
      keyFeatures={keyFeaturesWithIcons}
      testimonial={industry.testimonial}
      cta={industry.cta}
    />
  );
}
