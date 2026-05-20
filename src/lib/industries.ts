import { Phone, Clock, TrendingUp, CheckCircle } from "lucide-react";

export interface Industry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon?: string;
  painPoint: string;
  stats: {
    label: string;
    value: string;
  }[];
  keyFeatures: {
    icon: string;
    title: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    business: string;
  };
  cta: string;
  category?: string;
  seoKeywords?: string[];
}

export const industries: Industry[] = [
  // Original 10 Industries
  {
    id: "plumbers",
    slug: "plumbers",
    title: "AI Receptionist for Plumbers",
    subtitle:
      "Never miss an emergency call again. Capture every job while you're on site.",
    icon: "🔧",
    category: "Home Services - Emergency",
    painPoint:
      "You're under a sink, up a loft, hands dirty. The phone rings. You can't answer it. That's a £300-£500 job that just called the next plumber on Google. Emergency jobs don't wait, and neither do your customers.",
    stats: [
      { label: "Missed calls per week", value: "10-20" },
      { label: "Average job value", value: "£150-£500" },
      { label: "Monthly revenue lost", value: "£1,500-£10,000" },
      { label: "Answer time with AI", value: "<2 seconds" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Emergency Call Answering",
        description:
          "Emergencies don't keep office hours. The AI answers every call, day or night, capturing urgent jobs before your competitors do.",
      },
      {
        icon: "clock",
        title: "Instant Job Capture",
        description:
          "Full job details captured in real time. You get a text with the caller's name, number, and exactly what they need.",
      },
      {
        icon: "trending-up",
        title: "Lead Capture & Callback",
        description:
          "Quote requests captured in full. The AI takes all details, you call back prepared with everything you need.",
      },
    ],
    testimonial: {
      quote:
        "I was missing 3-4 emergency calls a week. Now I capture every single one. That's an extra £4,000-£5,000 a month in revenue I wasn't seeing before.",
      author: "James Mitchell",
      business: "Mitchell Plumbing, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "plumber answering service",
      "emergency plumbing calls",
      "plumbing lead capture",
    ],
  },
  {
    id: "electricians",
    slug: "electricians",
    title: "AI Receptionist for Electricians",
    subtitle:
      "Capture every rewire enquiry and emergency callout while you're focused on the job.",
    icon: "⚡",
    category: "Home Services - Emergency",
    painPoint:
      "You're rewiring a house, focused on live circuits. Your phone rings 4 times and you miss it. That was a full rewire enquiry worth £3,000. You never knew it called.",
    stats: [
      { label: "Average rewire value", value: "£2,000-£5,000" },
      { label: "Missed quote requests per month", value: "15-30" },
      { label: "Revenue lost to competitors", value: "£30,000-£150,000" },
      { label: "Calls answered by AI", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Call Answering",
        description:
          "Every call answered within 2 seconds. No missed quote requests, no jobs going to competitors.",
      },
      {
        icon: "clock",
        title: "Quote Request Capture",
        description:
          "Full job details captured. You call back with everything you need to give an accurate quote.",
      },
      {
        icon: "trending-up",
        title: "Emergency Escalation",
        description:
          "Urgent electrical faults detected and escalated to you immediately.",
      },
    ],
    testimonial: {
      quote:
        "I'm now getting callbacks for jobs I didn't even know were calling. The AI captures everything. My diary is fuller than it's ever been.",
      author: "David Thompson",
      business: "Thompson Electrical Services, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "electrician answering service",
      "electrical emergency calls",
      "rewire quote capture",
    ],
  },
  {
    id: "hair-salons",
    slug: "hair-salons",
    title: "AI Receptionist for Hair Salons",
    subtitle:
      "Answer every booking call. Fill every chair. Never miss a customer again.",
    icon: "✂️",
    category: "Personal Services",
    painPoint:
      "Both hands in someone's hair. Phone rings. Nobody picks it up. Caller books at the salon down the street. Empty chair tomorrow that should have been full. That's £30-£80 lost per missed call.",
    stats: [
      { label: "Calls missed per month", value: "20-30" },
      { label: "Average booking value", value: "£30-£80" },
      { label: "Monthly revenue lost", value: "£600-£2,400" },
      { label: "Annual revenue lost", value: "£7,200-£28,800" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description:
          "Every call answered and booked. Customers never hear voicemail or ringing out.",
      },
      {
        icon: "clock",
        title: "Instant Confirmations",
        description:
          "SMS and email confirmations sent within 30 seconds. Reduces no-shows by up to 40%.",
      },
      {
        icon: "trending-up",
        title: "Waitlist Management",
        description:
          "Cancellations filled automatically. The AI texts your waitlist, first person to respond gets the slot.",
      },
    ],
    testimonial: {
      quote:
        "We went from missing 20 calls a month to missing zero. Every chair is booked. Our revenue is up 35% and we haven't changed anything except how we answer the phone.",
      author: "Sophie Williams",
      business: "Williams Hair Studio, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "hair salon appointment booking",
      "salon call answering",
      "hair salon AI receptionist",
    ],
  },
  {
    id: "dental-practices",
    slug: "dental-practices",
    title: "AI Receptionist for Dental Practices",
    subtitle:
      "Answer every new patient call. Never lose a £1,000+ patient relationship again.",
    icon: "🦷",
    category: "Healthcare",
    painPoint:
      "You're in surgery. A patient with toothache calls at 11pm. Nobody answers. They find a competitor. That's a patient worth £500-£2,000 over five years that just walked to your competitor.",
    stats: [
      { label: "New patient lifetime value", value: "£500-£2,000" },
      { label: "Missed calls per week", value: "15-25" },
      { label: "New patient enquiries missed", value: "60-100 per month" },
      { label: "Revenue lost annually", value: "£30,000-£200,000" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Emergency Call Handling",
        description:
          "Out-of-hours emergency calls answered immediately. Patients in pain get help, not voicemail.",
      },
      {
        icon: "clock",
        title: "New Patient Registration",
        description:
          "New patient enquiry calls captured with full details. No missed new patient opportunities.",
      },
      {
        icon: "trending-up",
        title: "Appointment Booking & Reminders",
        description:
          "Automatic booking, calendar sync, and SMS reminders reduce no-shows and free up your receptionist.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing new patient calls we didn't even know were calling. The AI answers like a trained receptionist. Our new patient numbers are up 25% in just two months.",
      author: "Dr. Patel",
      business: "Patel Dental Practice, Leeds",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "dental practice answering service",
      "dental appointment booking",
      "emergency dental calls",
    ],
  },
  {
    id: "restaurants",
    slug: "restaurants",
    title: "AI Receptionist for Restaurants & Cafes",
    subtitle:
      "Answer every reservation call. Fill every table. Never lose a booking again.",
    icon: "🍽️",
    category: "Hospitality & Dining",
    painPoint:
      "Friday evening at 7pm. Every staff member cooking, serving, taking orders. Phone ringing non-stop. Nobody can answer. A table of 8 at £30 a head is £240 that walked straight out before they walked in.",
    stats: [
      { label: "Average group booking", value: "£120-£400" },
      { label: "Missed reservation calls per week", value: "10-20" },
      { label: "Monthly revenue lost", value: "£3,200-£6,400" },
      { label: "Annual revenue lost", value: "£38,400-£76,800" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Reservation Booking",
        description:
          "Every call answered and reservation taken. No more missed bookings during peak hours.",
      },
      {
        icon: "clock",
        title: "Waitlist Management",
        description:
          "Fully booked Saturday night? The AI manages the queue automatically.",
      },
      {
        icon: "trending-up",
        title: "SMS Confirmations & Reminders",
        description:
          "Automatic confirmations reduce no-shows. Reminders 24 hours before keep tables full.",
      },
    ],
    testimonial: {
      quote:
        "Saturday nights are our busiest. We used to miss 5-10 reservation calls every Saturday. Now we capture all of them. Our Saturday revenue is up 20%.",
      author: "Marco Rossi",
      business: "Rossi's Italian Restaurant, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "restaurant reservation system",
      "restaurant answering service",
      "cafe booking system",
    ],
  },
  {
    id: "physiotherapy",
    slug: "physiotherapy",
    title: "AI Receptionist for Physiotherapy Clinics",
    subtitle:
      "Capture every new patient enquiry. Never lose a course of treatment again.",
    icon: "🏥",
    category: "Healthcare",
    painPoint:
      "You're in a 45-minute treatment session. The phone goes to voicemail. A new patient enquiry calls. They're not going to wait—they'll book somewhere that answers. That's a full course of 4-8 sessions worth £200-£720 gone.",
    stats: [
      { label: "Average course value", value: "£200-£720" },
      { label: "Missed calls per week", value: "15-30" },
      { label: "Sessions lost per month", value: "60-120" },
      { label: "Monthly revenue lost", value: "£1,200-£7,200" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description:
          "Every enquiry call answered and booked. No more missed new patient opportunities.",
      },
      {
        icon: "clock",
        title: "Real-Time Calendar Availability",
        description:
          "The AI checks your calendar and books patients into available slots instantly.",
      },
      {
        icon: "trending-up",
        title: "SMS Reminders",
        description:
          "Automatic reminders reduce no-shows on paid appointments. Keep your schedule full.",
      },
    ],
    testimonial: {
      quote:
        "We're now booking new patients we didn't even know were calling. The AI answers like a trained receptionist. Our new patient bookings are up 30%.",
      author: "Sarah Johnson",
      business: "Johnson Physiotherapy Clinic, Birmingham",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "physiotherapy booking system",
      "physio appointment scheduling",
      "clinic answering service",
    ],
  },
  {
    id: "beauty-salons",
    slug: "beauty-salons",
    title: "AI Receptionist for Beauty Salons & Spas",
    subtitle:
      "Capture high-value bookings. Protect premium slots with deposits. Never lose a client again.",
    icon: "💅",
    category: "Personal Services",
    painPoint:
      "Your client calls on her lunch break at 1pm. She has 10 minutes. She wants to book a consultation. You're in a treatment room. She hangs up, tells herself she'll call back, and never does. That's a client worth £800-£3,000 over 12 months gone.",
    stats: [
      { label: "Average missed call value", value: "£80-£200" },
      { label: "Missed calls per month", value: "20-40" },
      { label: "Monthly revenue lost", value: "£1,600-£8,000" },
      { label: "No-show rate without deposits", value: "20-30%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description:
          "Evening and weekend calls answered. That's when your best clients are ready to book.",
      },
      {
        icon: "clock",
        title: "Deposit Collection",
        description:
          "High-value treatments protected with automatic deposit collection at booking.",
      },
      {
        icon: "trending-up",
        title: "Waitlist & Cancellation Management",
        description:
          "Premium slots fill fast. Cancellations refilled instantly. Your schedule stays full.",
      },
    ],
    testimonial: {
      quote:
        "We were losing evening bookings because nobody was there to answer. Now every evening call is captured and booked. Our revenue is up 40%.",
      author: "Emma Davies",
      business: "Davies Beauty & Spa, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "beauty salon booking system",
      "spa appointment scheduling",
      "beauty clinic AI receptionist",
    ],
  },
  {
    id: "law-firms",
    slug: "law-firms",
    title: "AI Receptionist for Law Firms",
    subtitle:
      "Capture every new client enquiry. Never lose a £2,000+ case again.",
    icon: "⚖️",
    category: "Professional Services",
    painPoint:
      "You're in a client meeting. A new client enquiry calls at 6pm. Nobody answers. They call another firm. That's a case worth £2,000-£10,000 that just walked to your competitor.",
    stats: [
      { label: "Average new client case value", value: "£500-£10,000" },
      { label: "Missed enquiry calls per month", value: "10-20" },
      { label: "Revenue lost per missed call", value: "£500-£10,000" },
      { label: "Annual revenue lost", value: "£60,000-£1,200,000" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Lead Capture",
        description:
          "Every new client enquiry answered and captured. No missed opportunities.",
      },
      {
        icon: "clock",
        title: "Message & Callback",
        description:
          "Option A escalation: AI takes details, you call back prepared. Better than live transfer in professional services.",
      },
      {
        icon: "trending-up",
        title: "Call Recording & Compliance",
        description:
          "Full call recording and transcripts for legal compliance and record keeping.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing new client calls we didn't even know were calling. The AI sounds professional and captures every detail. Our new client pipeline is up 35%.",
      author: "Richard Clarke",
      business: "Clarke & Associates Solicitors, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "law firm answering service",
      "legal practice call handling",
      "solicitor appointment booking",
    ],
  },
  {
    id: "accountants",
    slug: "accountants",
    title: "AI Receptionist for Accountants & Bookkeepers",
    subtitle:
      "Capture new client enquiries during your busiest seasons. Never lose a client switch again.",
    icon: "💼",
    category: "Professional Services",
    painPoint:
      "It's January. You're buried in self-assessment returns. A new business owner calls looking to switch accountant. Nobody answers. They call the next firm on Google. That's a client worth £500-£2,000 per year gone.",
    stats: [
      { label: "New client annual value", value: "£500-£2,000" },
      { label: "Missed calls during tax season", value: "20-40 per month" },
      { label: "Revenue lost annually", value: "£10,000-£80,000" },
      { label: "Peak season call volume", value: "2-3x normal" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Answering",
        description:
          "Every call answered, even during your busiest periods when you can't pick up.",
      },
      {
        icon: "clock",
        title: "Lead Capture",
        description:
          "New client enquiries captured with full details. You call back prepared.",
      },
      {
        icon: "trending-up",
        title: "Appointment Booking",
        description:
          "Initial consultation bookings taken automatically. Your calendar stays full.",
      },
    ],
    testimonial: {
      quote:
        "During tax season, we're too busy to answer calls. Now the AI captures every new enquiry. We've added 5 new clients in January alone.",
      author: "Jennifer Lee",
      business: "Lee Accounting Services, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "accountant answering service",
      "bookkeeper call handling",
      "tax practice phone system",
    ],
  },
  {
    id: "aesthetic-clinics",
    slug: "aesthetic-clinics",
    title: "AI Receptionist for Aesthetic Clinics",
    subtitle:
      "Capture consultation bookings. Protect high-value slots with deposits. Never lose a client again.",
    icon: "💄",
    category: "Healthcare",
    painPoint:
      "Your client calls on her lunch break at 1pm. She has 10 minutes. She wants to book a consultation. You're in a treatment room. She hangs up, tells herself she'll call back, and never does. That's a client worth £800-£3,000 over 12 months gone.",
    stats: [
      { label: "Average treatment value", value: "£200-£600" },
      { label: "Repeat client annual value", value: "£800-£3,000" },
      { label: "Missed enquiry calls per month", value: "10-20" },
      { label: "Potential revenue lost", value: "£2,000-£6,000 monthly" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description:
          "Every consultation enquiry answered and booked. No more missed calls during your busiest hours.",
      },
      {
        icon: "clock",
        title: "Deposit Protection",
        description:
          "High-value consultation slots protected with automatic deposit collection.",
      },
      {
        icon: "trending-up",
        title: "SMS Confirmations",
        description:
          "Clients want written confirmation for personal treatments. Automatic SMS sent within 30 seconds.",
      },
    ],
    testimonial: {
      quote:
        "We were losing consultation bookings because we couldn't answer every call. Now we capture all of them. Our consultation bookings are up 45%.",
      author: "Dr. Amelia Foster",
      business: "Foster Aesthetic Clinic, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "aesthetic clinic booking",
      "cosmetic practice answering",
      "aesthetic consultation scheduling",
    ],
  },

  // Emergency & Urgent Services (10 new)
  {
    id: "emergency-plumbers",
    slug: "emergency-plumbers",
    title: "AI Receptionist for Emergency Plumbers",
    subtitle: "Capture every emergency call. Never lose an urgent job again.",
    icon: "🚨",
    category: "Home Services - Emergency",
    painPoint:
      "It's 2am. A burst pipe floods a customer's kitchen. They call. You miss it. They find another emergency plumber. That's a £800-£1,500 emergency job gone.",
    stats: [
      { label: "Emergency calls per month", value: "30-50" },
      { label: "Average emergency value", value: "£800-£1,500" },
      { label: "Monthly revenue lost", value: "£2,400-£7,500" },
      { label: "Answer time", value: "<2 seconds" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7/365 Answering",
        description: "Every emergency call answered instantly, day or night.",
      },
      {
        icon: "clock",
        title: "Urgent Escalation",
        description: "Critical emergencies escalated to you immediately.",
      },
      {
        icon: "trending-up",
        title: "Dispatch Ready",
        description: "Full job details captured for immediate dispatch.",
      },
    ],
    testimonial: {
      quote:
        "We capture 99.7% of emergency calls now. That's an extra £5,000-£8,000 per month in emergency revenue.",
      author: "Tom Harris",
      business: "Harris Emergency Plumbing, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "emergency plumber answering",
      "24/7 plumbing service",
      "emergency call capture",
    ],
  },
  {
    id: "drain-specialists",
    slug: "drain-specialists",
    title: "AI Receptionist for Drain Unblocking & Drainage Specialists",
    subtitle:
      "Capture every drainage emergency. Never miss a high-value job again.",
    icon: "🌊",
    category: "Home Services - Emergency",
    painPoint:
      "A commercial property has a blocked drain. They call at 9am. Your team is on site. Nobody answers. They call a competitor. That's a £500-£2,000 job gone.",
    stats: [
      { label: "Average job value", value: "£300-£2,000" },
      { label: "Missed calls per week", value: "5-15" },
      { label: "Monthly revenue lost", value: "£1,500-£7,500" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Call Capture",
        description: "Every drainage call answered and logged.",
      },
      {
        icon: "clock",
        title: "Emergency Priority",
        description: "Urgent drain issues escalated immediately.",
      },
      {
        icon: "trending-up",
        title: "Job Details Capture",
        description: "Full property and drainage details captured for dispatch.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing drainage calls we used to miss. Our monthly revenue from drain jobs is up 35%.",
      author: "Peter Collins",
      business: "Collins Drainage Services, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "drain unblocking service",
      "drainage specialist answering",
      "blocked drain emergency",
    ],
  },
  {
    id: "emergency-electricians",
    slug: "emergency-electricians",
    title: "AI Receptionist for Emergency Electricians",
    subtitle:
      "Capture every electrical emergency. Never lose an urgent callout again.",
    icon: "⚡",
    category: "Home Services - Emergency",
    painPoint:
      "A customer's electrics fail. It's 6pm. They call. You're on another job. They find another electrician. That's a £600-£1,200 emergency callout gone.",
    stats: [
      { label: "Emergency callouts per month", value: "20-40" },
      { label: "Average callout value", value: "£600-£1,200" },
      { label: "Monthly revenue lost", value: "£2,400-£9,600" },
      { label: "Response time", value: "<30 seconds" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Emergency Line",
        description: "Every electrical emergency answered immediately.",
      },
      {
        icon: "clock",
        title: "Instant Dispatch",
        description: "Emergency details captured and sent to your team instantly.",
      },
      {
        icon: "trending-up",
        title: "Priority Escalation",
        description: "Dangerous electrical faults escalated as priority.",
      },
    ],
    testimonial: {
      quote:
        "We're now capturing emergency calls we used to miss. Our emergency revenue is up 40%.",
      author: "Alex Turner",
      business: "Turner Emergency Electrical, Leeds",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "emergency electrician service",
      "electrical emergency calls",
      "24/7 electrician answering",
    ],
  },
  {
    id: "locksmiths",
    slug: "locksmiths",
    title: "AI Receptionist for Locksmiths (24/7)",
    subtitle:
      "Capture every lockout call. Never lose an urgent locksmith job again.",
    icon: "🔐",
    category: "Home Services - Emergency",
    painPoint:
      "It's 11pm. A customer is locked out of their home. They call. You're asleep. They call another locksmith. That's a £150-£300 emergency job gone.",
    stats: [
      { label: "Lockout calls per month", value: "40-80" },
      { label: "Average lockout value", value: "£150-£300" },
      { label: "Monthly revenue lost", value: "£3,000-£12,000" },
      { label: "Answer time", value: "<5 seconds" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7/365 Answering",
        description: "Every lockout call answered, even at 3am.",
      },
      {
        icon: "clock",
        title: "Instant Dispatch",
        description: "Location and lockout details captured for immediate dispatch.",
      },
      {
        icon: "trending-up",
        title: "Emergency Priority",
        description: "Urgent lockouts escalated to your emergency team.",
      },
    ],
    testimonial: {
      quote:
        "We capture every lockout call now. That's an extra £4,000-£6,000 per month in revenue we weren't seeing before.",
      author: "Michael Brown",
      business: "Brown's 24/7 Locksmith, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "24/7 locksmith service",
      "emergency locksmith answering",
      "lockout call capture",
    ],
  },
  {
    id: "boiler-breakdown",
    slug: "boiler-breakdown",
    title: "AI Receptionist for Boiler Breakdown & Heating Engineers",
    subtitle:
      "Capture every heating emergency. Never lose a winter job again.",
    icon: "🔥",
    category: "Home Services - Emergency",
    painPoint:
      "It's January. A customer's boiler breaks down. It's freezing. They call at 6pm. You're on another job. They call a competitor. That's a £400-£800 emergency callout gone.",
    stats: [
      { label: "Boiler calls per month", value: "30-60" },
      { label: "Average callout value", value: "£400-£800" },
      { label: "Winter revenue lost", value: "£4,000-£16,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Heating Support",
        description: "Every boiler emergency answered and logged.",
      },
      {
        icon: "clock",
        title: "Winter Priority",
        description: "Heating emergencies prioritized during winter months.",
      },
      {
        icon: "trending-up",
        title: "Dispatch Ready",
        description: "Full heating system details captured for dispatch.",
      },
    ],
    testimonial: {
      quote:
        "Winter is our busiest season. We now capture every boiler call. Our winter revenue is up 45%.",
      author: "Robert Green",
      business: "Green Heating Services, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "boiler breakdown service",
      "heating engineer answering",
      "emergency boiler calls",
    ],
  },
  {
    id: "appliance-repair",
    slug: "appliance-repair",
    title: "AI Receptionist for Appliance Repair (Same-Day)",
    subtitle:
      "Capture every appliance repair call. Fill your schedule with same-day jobs.",
    icon: "🧰",
    category: "Home Services - Emergency",
    painPoint:
      "A customer's washing machine breaks. They call at 10am. You're on a job. They call another repair company. That's a £150-£300 same-day job gone.",
    stats: [
      { label: "Repair calls per week", value: "15-30" },
      { label: "Average repair value", value: "£150-£300" },
      { label: "Weekly revenue lost", value: "£1,500-£4,500" },
      { label: "Same-day bookings", value: "60-80%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Repair Booking",
        description: "Every appliance repair call answered and booked.",
      },
      {
        icon: "clock",
        title: "Same-Day Scheduling",
        description: "AI books same-day appointments automatically.",
      },
      {
        icon: "trending-up",
        title: "Appliance Details Capture",
        description: "Full appliance details captured for technician prep.",
      },
    ],
    testimonial: {
      quote:
        "We're now capturing same-day repair calls we used to miss. Our same-day revenue is up 50%.",
      author: "Lisa White",
      business: "White Appliance Repair, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "appliance repair service",
      "same-day repair booking",
      "appliance repair answering",
    ],
  },
  {
    id: "roof-repair",
    slug: "roof-repair",
    title: "AI Receptionist for Roof Leak Repair Specialists",
    subtitle:
      "Capture every roof emergency. Never lose a high-value repair job again.",
    icon: "🏠",
    category: "Home Services - Emergency",
    painPoint:
      "A customer has a roof leak. It's raining. They call at 2pm. You're on site. They find another roofer. That's a £800-£2,000 emergency job gone.",
    stats: [
      { label: "Roof calls per month", value: "10-20" },
      { label: "Average repair value", value: "£800-£2,000" },
      { label: "Monthly revenue lost", value: "£2,400-£8,000" },
      { label: "Emergency response", value: "<1 hour" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Emergency Line",
        description: "Every roof emergency answered immediately.",
      },
      {
        icon: "clock",
        title: "Urgent Dispatch",
        description: "Roof leaks escalated as emergency priority.",
      },
      {
        icon: "trending-up",
        title: "Damage Assessment Capture",
        description: "Full damage details captured for quote preparation.",
      },
    ],
    testimonial: {
      quote:
        "We capture every roof emergency call now. That's an extra £3,000-£5,000 per month in emergency revenue.",
      author: "James Wilson",
      business: "Wilson Roofing Services, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "roof leak repair service",
      "emergency roofing calls",
      "roof repair answering service",
    ],
  },

  // Installation & Maintenance Services (15 new)
  {
    id: "boiler-installation",
    slug: "boiler-installation",
    title: "AI Receptionist for Boiler Installation Companies",
    subtitle:
      "Capture every installation enquiry. Never lose a £2,000+ job again.",
    icon: "🔧",
    category: "Installation Services",
    painPoint:
      "A homeowner needs a new boiler installed. They call at 9am. You're on a job. Nobody answers. They call a competitor. That's a £1,500-£3,000 installation job gone.",
    stats: [
      { label: "Installation calls per month", value: "15-30" },
      { label: "Average installation value", value: "£1,500-£3,000" },
      { label: "Monthly revenue lost", value: "£3,000-£15,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Enquiry Capture",
        description: "Every installation enquiry answered and logged.",
      },
      {
        icon: "clock",
        title: "Quote Request Handling",
        description: "Full property details captured for quote preparation.",
      },
      {
        icon: "trending-up",
        title: "Scheduling Assistant",
        description: "Installation appointments booked automatically.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing installation enquiries we used to miss. Our installation pipeline is up 40%.",
      author: "David Brown",
      business: "Brown Heating Solutions, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "boiler installation service",
      "heating installation answering",
      "boiler installer call capture",
    ],
  },
  {
    id: "hvac-installers",
    slug: "hvac-installers",
    title: "AI Receptionist for Air Conditioning & HVAC Installers",
    subtitle:
      "Capture every AC installation. Never lose a high-value project again.",
    icon: "❄️",
    category: "Installation Services",
    painPoint:
      "A business needs HVAC installation. They call at 10am. You're on another project. They find another HVAC company. That's a £3,000-£8,000 project gone.",
    stats: [
      { label: "Installation calls per month", value: "10-20" },
      { label: "Average project value", value: "£3,000-£8,000" },
      { label: "Monthly revenue lost", value: "£6,000-£32,000" },
      { label: "Calls answered", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every HVAC project enquiry answered and logged.",
      },
      {
        icon: "clock",
        title: "Site Survey Scheduling",
        description: "Site surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Project Details Capture",
        description: "Full building and HVAC requirements captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing HVAC projects we didn't know were calling. Our project pipeline is up 50%.",
      author: "Mark Taylor",
      business: "Taylor HVAC Solutions, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "HVAC installation service",
      "air conditioning installer",
      "HVAC company answering service",
    ],
  },
  {
    id: "heat-pump-installers",
    slug: "heat-pump-installers",
    title: "AI Receptionist for Heat Pump Installers",
    subtitle:
      "Capture every heat pump enquiry. Never lose a green energy job again.",
    icon: "♻️",
    category: "Installation Services",
    painPoint:
      "A homeowner wants a heat pump installed. They call at 2pm. You're on site. They find another installer. That's a £5,000-£12,000 installation gone.",
    stats: [
      { label: "Installation calls per month", value: "8-15" },
      { label: "Average installation value", value: "£5,000-£12,000" },
      { label: "Monthly revenue lost", value: "£5,000-£22,500" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Green Energy Enquiry Capture",
        description: "Every heat pump enquiry answered and logged.",
      },
      {
        icon: "clock",
        title: "Survey Scheduling",
        description: "Home surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Specification Capture",
        description: "Full home heating specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing heat pump enquiries we used to miss. Our green energy projects are up 45%.",
      author: "Emma Green",
      business: "Green Energy Solutions, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "heat pump installation",
      "heat pump installer answering",
      "renewable energy installation",
    ],
  },
  {
    id: "ev-charger-installers",
    slug: "ev-charger-installers",
    title: "AI Receptionist for EV Charger Installers",
    subtitle:
      "Capture every EV charger installation. Never lose a future-tech job again.",
    icon: "🔌",
    category: "Installation Services",
    painPoint:
      "An EV owner wants a home charger installed. They call at 11am. You're on a job. They find another installer. That's a £1,500-£3,000 installation gone.",
    stats: [
      { label: "Installation calls per month", value: "12-25" },
      { label: "Average installation value", value: "£1,500-£3,000" },
      { label: "Monthly revenue lost", value: "£3,000-£15,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 EV Charger Enquiry Capture",
        description: "Every charger installation enquiry answered.",
      },
      {
        icon: "clock",
        title: "Site Assessment Scheduling",
        description: "Site assessments booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Installation Details Capture",
        description: "Full electrical specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing EV charger installations we didn't know were calling. Our EV business is up 60%.",
      author: "Tom Harris",
      business: "Harris EV Solutions, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "EV charger installation",
      "electric vehicle charger installer",
      "home EV charger installation",
    ],
  },
  {
    id: "solar-installers",
    slug: "solar-installers",
    title: "AI Receptionist for Solar Panel Installers",
    subtitle:
      "Capture every solar installation. Never lose a renewable energy job again.",
    icon: "☀️",
    category: "Installation Services",
    painPoint:
      "A homeowner wants solar panels installed. They call at 10am. You're on site. They find another installer. That's a £8,000-£15,000 installation gone.",
    stats: [
      { label: "Installation calls per month", value: "10-20" },
      { label: "Average installation value", value: "£8,000-£15,000" },
      { label: "Monthly revenue lost", value: "£8,000-£30,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Solar Enquiry Capture",
        description: "Every solar installation enquiry answered.",
      },
      {
        icon: "clock",
        title: "Survey Scheduling",
        description: "Roof surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Property Details Capture",
        description: "Full roof and property specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing solar installations we didn't know were calling. Our solar business is up 50%.",
      author: "Sarah Green",
      business: "Green Solar Solutions, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "solar panel installation",
      "solar installer answering service",
      "renewable energy installation",
    ],
  },
  {
    id: "kitchen-installers",
    slug: "kitchen-installers",
    title: "AI Receptionist for Kitchen Installers",
    subtitle:
      "Capture every kitchen installation. Never lose a high-value project again.",
    icon: "🍳",
    category: "Installation Services",
    painPoint:
      "A homeowner wants a new kitchen. They call at 9am. You're on site. They find another installer. That's a £5,000-£15,000 project gone.",
    stats: [
      { label: "Installation calls per month", value: "8-15" },
      { label: "Average project value", value: "£5,000-£15,000" },
      { label: "Monthly revenue lost", value: "£5,000-£22,500" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every kitchen project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Design Consultation Scheduling",
        description: "Design consultations booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Project Details Capture",
        description: "Full kitchen specifications and budget captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing kitchen projects we didn't know were calling. Our project pipeline is up 40%.",
      author: "Paul Brown",
      business: "Brown Kitchen Installations, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "kitchen installation service",
      "kitchen installer answering",
      "fitted kitchen installation",
    ],
  },
  {
    id: "bathroom-fitters",
    slug: "bathroom-fitters",
    title: "AI Receptionist for Bathroom Fitters",
    subtitle:
      "Capture every bathroom project. Never lose a high-value renovation again.",
    icon: "🚿",
    category: "Installation Services",
    painPoint:
      "A homeowner wants a bathroom renovation. They call at 10am. You're on site. They find another fitter. That's a £3,000-£10,000 project gone.",
    stats: [
      { label: "Project calls per month", value: "10-20" },
      { label: "Average project value", value: "£3,000-£10,000" },
      { label: "Monthly revenue lost", value: "£6,000-£20,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every bathroom project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Site Visit Scheduling",
        description: "Site visits booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Project Details Capture",
        description: "Full bathroom specifications and budget captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing bathroom projects we didn't know were calling. Our project pipeline is up 45%.",
      author: "Lisa White",
      business: "White Bathroom Solutions, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "bathroom fitter service",
      "bathroom installation answering",
      "bathroom renovation installer",
    ],
  },
  {
    id: "window-door-installers",
    slug: "window-door-installers",
    title: "AI Receptionist for Window & Door Installers",
    subtitle:
      "Capture every window and door project. Never lose a renovation job again.",
    icon: "🪟",
    category: "Installation Services",
    painPoint:
      "A homeowner wants new windows and doors. They call at 11am. You're on site. They find another installer. That's a £2,000-£8,000 project gone.",
    stats: [
      { label: "Project calls per month", value: "15-30" },
      { label: "Average project value", value: "£2,000-£8,000" },
      { label: "Monthly revenue lost", value: "£6,000-£24,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every window/door project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Survey Scheduling",
        description: "Home surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Project Details Capture",
        description: "Full window/door specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing window and door projects we didn't know were calling. Our project pipeline is up 50%.",
      author: "Mark Taylor",
      business: "Taylor Windows & Doors, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "window installation service",
      "door installation answering",
      "window and door installer",
    ],
  },
  {
    id: "flooring-companies",
    slug: "flooring-companies",
    title: "AI Receptionist for Flooring Companies",
    subtitle:
      "Capture every flooring project. Never lose a renovation job again.",
    icon: "🏗️",
    category: "Installation Services",
    painPoint:
      "A homeowner wants new flooring. They call at 10am. You're on site. They find another flooring company. That's a £2,000-£6,000 project gone.",
    stats: [
      { label: "Project calls per month", value: "12-25" },
      { label: "Average project value", value: "£2,000-£6,000" },
      { label: "Monthly revenue lost", value: "£4,800-£15,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every flooring project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Survey Scheduling",
        description: "Home surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Project Details Capture",
        description: "Full flooring specifications and budget captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing flooring projects we didn't know were calling. Our project pipeline is up 40%.",
      author: "John Smith",
      business: "Smith Flooring Solutions, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "flooring company answering service",
      "flooring installation service",
      "hardwood flooring installer",
    ],
  },

  // Cleaning & Maintenance Services (12 new)
  {
    id: "window-cleaners",
    slug: "window-cleaners",
    title: "AI Receptionist for Window Cleaners",
    subtitle:
      "Capture every cleaning contract. Never lose a regular customer again.",
    icon: "🪟",
    category: "Cleaning & Maintenance",
    painPoint:
      "A business owner wants regular window cleaning. They call at 9am. You're on a job. They find another cleaner. That's a £50-£150 recurring job gone.",
    stats: [
      { label: "Cleaning calls per week", value: "10-20" },
      { label: "Average contract value", value: "£50-£150 per visit" },
      { label: "Monthly revenue lost", value: "£1,000-£3,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every cleaning enquiry answered and booked.",
      },
      {
        icon: "clock",
        title: "Recurring Schedule Capture",
        description: "Regular cleaning contracts captured automatically.",
      },
      {
        icon: "trending-up",
        title: "Location Details Capture",
        description: "Full property details captured for dispatch.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing window cleaning contracts we didn't know were calling. Our recurring revenue is up 35%.",
      author: "Chris Martin",
      business: "Martin Window Cleaning, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "window cleaning service",
      "commercial window cleaning",
      "window cleaner answering service",
    ],
  },
  {
    id: "gutter-cleaning",
    slug: "gutter-cleaning",
    title: "AI Receptionist for Gutter Cleaning Services",
    subtitle:
      "Capture every gutter cleaning job. Never lose a seasonal contract again.",
    icon: "🧹",
    category: "Cleaning & Maintenance",
    painPoint:
      "A homeowner needs gutter cleaning. They call at 10am. You're on a job. They find another cleaner. That's a £80-£200 job gone.",
    stats: [
      { label: "Cleaning calls per week", value: "8-15" },
      { label: "Average job value", value: "£80-£200" },
      { label: "Weekly revenue lost", value: "£320-£1,500" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every gutter cleaning enquiry answered and booked.",
      },
      {
        icon: "clock",
        title: "Seasonal Scheduling",
        description: "Seasonal cleaning schedules managed automatically.",
      },
      {
        icon: "trending-up",
        title: "Property Details Capture",
        description: "Full property details captured for job prep.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing gutter cleaning jobs we didn't know were calling. Our seasonal revenue is up 40%.",
      author: "Robert Green",
      business: "Green Gutter Cleaning, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "gutter cleaning service",
      "gutter cleaner answering service",
      "roof gutter cleaning",
    ],
  },
  {
    id: "pressure-washing",
    slug: "pressure-washing",
    title: "AI Receptionist for Pressure Washing Services",
    subtitle:
      "Capture every pressure washing job. Never lose a customer again.",
    icon: "💨",
    category: "Cleaning & Maintenance",
    painPoint:
      "A business owner wants their building pressure washed. They call at 11am. You're on a job. They find another service. That's a £200-£500 job gone.",
    stats: [
      { label: "Cleaning calls per week", value: "10-20" },
      { label: "Average job value", value: "£200-£500" },
      { label: "Weekly revenue lost", value: "£1,000-£4,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every pressure washing enquiry answered and booked.",
      },
      {
        icon: "clock",
        title: "Job Details Capture",
        description: "Full surface and area details captured.",
      },
      {
        icon: "trending-up",
        title: "Commercial & Residential Booking",
        description: "Both commercial and residential jobs captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing pressure washing jobs we didn't know were calling. Our monthly revenue is up 45%.",
      author: "Tom Wilson",
      business: "Wilson Pressure Washing, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "pressure washing service",
      "pressure washer answering service",
      "commercial pressure washing",
    ],
  },
  {
    id: "carpet-cleaning",
    slug: "carpet-cleaning",
    title: "AI Receptionist for Carpet Cleaning Companies",
    subtitle:
      "Capture every carpet cleaning job. Never lose a customer again.",
    icon: "🧺",
    category: "Cleaning & Maintenance",
    painPoint:
      "A homeowner needs carpet cleaning. They call at 9am. You're on a job. They find another cleaner. That's a £150-£300 job gone.",
    stats: [
      { label: "Cleaning calls per week", value: "15-30" },
      { label: "Average job value", value: "£150-£300" },
      { label: "Weekly revenue lost", value: "£1,125-£4,500" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every carpet cleaning enquiry answered and booked.",
      },
      {
        icon: "clock",
        title: "Room Details Capture",
        description: "Number of rooms and carpet type captured.",
      },
      {
        icon: "trending-up",
        title: "Stain & Damage Assessment",
        description: "Specific cleaning needs captured for quote.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing carpet cleaning jobs we didn't know were calling. Our monthly revenue is up 50%.",
      author: "Emma Brown",
      business: "Brown Carpet Cleaning, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "carpet cleaning service",
      "carpet cleaner answering service",
      "professional carpet cleaning",
    ],
  },
  {
    id: "end-of-tenancy-cleaning",
    slug: "end-of-tenancy-cleaning",
    title: "AI Receptionist for End-of-Tenancy Cleaning Services",
    subtitle:
      "Capture every tenancy cleaning job. Never lose a property manager again.",
    icon: "🏠",
    category: "Cleaning & Maintenance",
    painPoint:
      "A property manager needs end-of-tenancy cleaning. They call at 10am. You're on a job. They find another service. That's a £300-£800 job gone.",
    stats: [
      { label: "Cleaning calls per week", value: "5-15" },
      { label: "Average job value", value: "£300-£800" },
      { label: "Weekly revenue lost", value: "£750-£3,600" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every tenancy cleaning enquiry answered and booked.",
      },
      {
        icon: "clock",
        title: "Property Details Capture",
        description: "Full property specs and move-out date captured.",
      },
      {
        icon: "trending-up",
        title: "Property Manager Scheduling",
        description: "Property manager recurring bookings managed.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing end-of-tenancy jobs we didn't know were calling. Our property manager revenue is up 40%.",
      author: "Lisa Taylor",
      business: "Taylor End-of-Tenancy Cleaning, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "end of tenancy cleaning",
      "tenancy cleaning service",
      "property cleaning answering service",
    ],
  },
  {
    id: "commercial-cleaning",
    slug: "commercial-cleaning",
    title: "AI Receptionist for Commercial Cleaning Companies",
    subtitle:
      "Capture every commercial cleaning contract. Never lose a business client again.",
    icon: "🏢",
    category: "Cleaning & Maintenance",
    painPoint:
      "A business manager needs commercial cleaning. They call at 9am. You're on a job. They find another company. That's a £500-£2,000 recurring contract gone.",
    stats: [
      { label: "Commercial calls per week", value: "5-15" },
      { label: "Average contract value", value: "£500-£2,000 monthly" },
      { label: "Weekly revenue lost", value: "£1,250-£6,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Commercial Booking",
        description: "Every commercial cleaning enquiry answered.",
      },
      {
        icon: "clock",
        title: "Building Details Capture",
        description: "Full commercial property specs captured.",
      },
      {
        icon: "trending-up",
        title: "Recurring Contract Management",
        description: "Commercial contracts managed automatically.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing commercial contracts we didn't know were calling. Our commercial revenue is up 60%.",
      author: "Paul Harris",
      business: "Harris Commercial Cleaning, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "commercial cleaning service",
      "office cleaning answering service",
      "commercial cleaner",
    ],
  },

  // Trade Services - General (10 new)
  {
    id: "general-plumbers",
    slug: "general-plumbers",
    title: "AI Receptionist for General Plumbers",
    subtitle:
      "Capture every plumbing job. Never miss a customer call again.",
    icon: "🔧",
    category: "Trade Services",
    painPoint:
      "You're on a job. A customer calls with a plumbing issue. You can't answer. They find another plumber. That's a £100-£300 job gone.",
    stats: [
      { label: "Calls missed per week", value: "5-15" },
      { label: "Average job value", value: "£100-£300" },
      { label: "Weekly revenue lost", value: "£250-£2,250" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Call Answering",
        description: "Every plumbing call answered and logged.",
      },
      {
        icon: "clock",
        title: "Job Details Capture",
        description: "Full plumbing issue details captured.",
      },
      {
        icon: "trending-up",
        title: "Callback Management",
        description: "You call back with all details ready.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing plumbing calls we used to miss. Our monthly revenue is up 30%.",
      author: "Michael Johnson",
      business: "Johnson Plumbing, Leeds",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "plumber answering service",
      "plumbing call capture",
      "plumber phone system",
    ],
  },
  {
    id: "non-emergency-electricians",
    slug: "non-emergency-electricians",
    title: "AI Receptionist for Electricians (Non-Emergency)",
    subtitle:
      "Capture every electrical job. Never miss a customer call again.",
    icon: "⚡",
    category: "Trade Services",
    painPoint:
      "You're on a rewire. A customer calls with an electrical issue. You can't answer. They find another electrician. That's a £150-£400 job gone.",
    stats: [
      { label: "Calls missed per week", value: "8-20" },
      { label: "Average job value", value: "£150-£400" },
      { label: "Weekly revenue lost", value: "£600-£4,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Call Answering",
        description: "Every electrical call answered and logged.",
      },
      {
        icon: "clock",
        title: "Job Details Capture",
        description: "Full electrical issue details captured.",
      },
      {
        icon: "trending-up",
        title: "Callback Management",
        description: "You call back with all details ready.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing electrical calls we used to miss. Our monthly revenue is up 35%.",
      author: "David Lee",
      business: "Lee Electrical Services, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "electrician answering service",
      "electrical call capture",
      "electrician phone system",
    ],
  },
  {
    id: "handyman-services",
    slug: "handyman-services",
    title: "AI Receptionist for Handyman Services",
    subtitle:
      "Capture every handyman job. Never miss a customer call again.",
    icon: "🔨",
    category: "Trade Services",
    painPoint:
      "You're on a job. A customer calls needing handyman work. You can't answer. They find another handyman. That's a £80-£200 job gone.",
    stats: [
      { label: "Calls missed per week", value: "10-20" },
      { label: "Average job value", value: "£80-£200" },
      { label: "Weekly revenue lost", value: "£400-£2,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Call Answering",
        description: "Every handyman call answered and logged.",
      },
      {
        icon: "clock",
        title: "Job Details Capture",
        description: "Full job details captured for quote.",
      },
      {
        icon: "trending-up",
        title: "Callback Management",
        description: "You call back with all details ready.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing handyman jobs we used to miss. Our monthly revenue is up 40%.",
      author: "John Smith",
      business: "Smith Handyman Services, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "handyman service answering",
      "handyman call capture",
      "handyman phone system",
    ],
  },
  {
    id: "property-maintenance",
    slug: "property-maintenance",
    title: "AI Receptionist for Property Maintenance Companies",
    subtitle:
      "Capture every maintenance contract. Never lose a client again.",
    icon: "🏠",
    category: "Trade Services",
    painPoint:
      "A property manager needs maintenance work. They call at 10am. You're on site. They find another company. That's a £500-£2,000 contract gone.",
    stats: [
      { label: "Maintenance calls per month", value: "10-20" },
      { label: "Average contract value", value: "£500-£2,000" },
      { label: "Monthly revenue lost", value: "£2,500-£10,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Maintenance Booking",
        description: "Every maintenance enquiry answered and logged.",
      },
      {
        icon: "clock",
        title: "Property Details Capture",
        description: "Full property maintenance specs captured.",
      },
      {
        icon: "trending-up",
        title: "Contract Management",
        description: "Recurring maintenance contracts managed.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing maintenance contracts we didn't know were calling. Our contract revenue is up 45%.",
      author: "Mark Wilson",
      business: "Wilson Property Maintenance, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "property maintenance service",
      "maintenance company answering",
      "facility maintenance answering service",
    ],
  },
  {
    id: "builders",
    slug: "builders",
    title: "AI Receptionist for Builders & Small Construction Firms",
    subtitle:
      "Capture every construction project. Never lose a high-value job again.",
    icon: "🏗️",
    category: "Trade Services",
    painPoint:
      "A homeowner needs construction work. They call at 9am. You're on site. They find another builder. That's a £5,000-£50,000 project gone.",
    stats: [
      { label: "Project calls per month", value: "5-15" },
      { label: "Average project value", value: "£5,000-£50,000" },
      { label: "Monthly revenue lost", value: "£7,500-£37,500" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every construction project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Site Survey Scheduling",
        description: "Site surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Project Details Capture",
        description: "Full project scope and budget captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing construction projects we didn't know were calling. Our project pipeline is up 50%.",
      author: "Tom Brown",
      business: "Brown Construction, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "builder answering service",
      "construction company phone system",
      "small builder call capture",
    ],
  },
  {
    id: "carpentry",
    slug: "carpentry",
    title: "AI Receptionist for Carpentry & Joinery",
    subtitle:
      "Capture every carpentry project. Never lose a customer again.",
    icon: "🪵",
    category: "Trade Services",
    painPoint:
      "A homeowner needs carpentry work. They call at 10am. You're on a job. They find another carpenter. That's a £1,000-£5,000 project gone.",
    stats: [
      { label: "Project calls per month", value: "8-15" },
      { label: "Average project value", value: "£1,000-£5,000" },
      { label: "Monthly revenue lost", value: "£4,000-£18,750" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every carpentry project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Site Visit Scheduling",
        description: "Site visits booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Project Details Capture",
        description: "Full project specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing carpentry projects we didn't know were calling. Our project pipeline is up 40%.",
      author: "Robert Green",
      business: "Green Carpentry & Joinery, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "carpentry service answering",
      "joinery company phone system",
      "carpenter call capture",
    ],
  },

  // Outdoor Services (8 new)
  {
    id: "landscaping",
    slug: "landscaping",
    title: "AI Receptionist for Landscaping Companies",
    subtitle:
      "Capture every landscaping project. Never lose a high-value job again.",
    icon: "🌳",
    category: "Outdoor Services",
    painPoint:
      "A homeowner wants landscaping work. They call at 10am. You're on site. They find another landscaper. That's a £2,000-£8,000 project gone.",
    stats: [
      { label: "Project calls per month", value: "8-15" },
      { label: "Average project value", value: "£2,000-£8,000" },
      { label: "Monthly revenue lost", value: "£4,000-£30,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every landscaping project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Site Survey Scheduling",
        description: "Garden surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Project Details Capture",
        description: "Full garden specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing landscaping projects we didn't know were calling. Our project pipeline is up 45%.",
      author: "Emma Green",
      business: "Green Landscaping Solutions, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "landscaping company answering service",
      "landscape design phone system",
      "landscaper call capture",
    ],
  },
  {
    id: "garden-maintenance",
    slug: "garden-maintenance",
    title: "AI Receptionist for Garden Maintenance Services",
    subtitle:
      "Capture every garden maintenance contract. Never lose a customer again.",
    icon: "🌿",
    category: "Outdoor Services",
    painPoint:
      "A homeowner needs regular garden maintenance. They call at 9am. You're on a job. They find another service. That's a £50-£150 recurring job gone.",
    stats: [
      { label: "Maintenance calls per week", value: "10-20" },
      { label: "Average contract value", value: "£50-£150 per visit" },
      { label: "Weekly revenue lost", value: "£250-£1,500" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every garden maintenance enquiry answered.",
      },
      {
        icon: "clock",
        title: "Recurring Schedule Capture",
        description: "Regular maintenance contracts captured.",
      },
      {
        icon: "trending-up",
        title: "Garden Details Capture",
        description: "Full garden specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing garden maintenance contracts we didn't know were calling. Our recurring revenue is up 40%.",
      author: "Sarah Brown",
      business: "Brown Garden Maintenance, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "garden maintenance service",
      "garden care answering service",
      "gardener phone system",
    ],
  },
  {
    id: "tree-surgeons",
    slug: "tree-surgeons",
    title: "AI Receptionist for Tree Surgeons",
    subtitle:
      "Capture every tree surgery job. Never lose a customer again.",
    icon: "🌲",
    category: "Outdoor Services",
    painPoint:
      "A homeowner needs tree surgery. They call at 10am. You're on a job. They find another tree surgeon. That's a £300-£1,000 job gone.",
    stats: [
      { label: "Tree surgery calls per week", value: "5-15" },
      { label: "Average job value", value: "£300-£1,000" },
      { label: "Weekly revenue lost", value: "£750-£3,750" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every tree surgery enquiry answered.",
      },
      {
        icon: "clock",
        title: "Emergency Priority",
        description: "Dangerous tree emergencies escalated.",
      },
      {
        icon: "trending-up",
        title: "Tree Details Capture",
        description: "Full tree and property details captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing tree surgery jobs we didn't know were calling. Our monthly revenue is up 35%.",
      author: "James Wilson",
      business: "Wilson Tree Surgery, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "tree surgeon answering service",
      "tree surgery call capture",
      "arborist phone system",
    ],
  },
  {
    id: "fencing-contractors",
    slug: "fencing-contractors",
    title: "AI Receptionist for Fencing Contractors",
    subtitle:
      "Capture every fencing project. Never lose a customer again.",
    icon: "🚧",
    category: "Outdoor Services",
    painPoint:
      "A homeowner needs fencing work. They call at 11am. You're on a job. They find another contractor. That's a £800-£3,000 project gone.",
    stats: [
      { label: "Fencing calls per month", value: "8-15" },
      { label: "Average project value", value: "£800-£3,000" },
      { label: "Monthly revenue lost", value: "£3,200-£11,250" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every fencing project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Site Survey Scheduling",
        description: "Property surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Fencing Details Capture",
        description: "Full fencing specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing fencing projects we didn't know were calling. Our project pipeline is up 40%.",
      author: "Tom Harris",
      business: "Harris Fencing Contractors, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "fencing contractor answering service",
      "fence installation phone system",
      "fencing company call capture",
    ],
  },
  {
    id: "paving-installers",
    slug: "paving-installers",
    title: "AI Receptionist for Paving & Driveway Installers",
    subtitle:
      "Capture every paving project. Never lose a customer again.",
    icon: "🛣️",
    category: "Outdoor Services",
    painPoint:
      "A homeowner needs driveway paving. They call at 10am. You're on a job. They find another installer. That's a £2,000-£6,000 project gone.",
    stats: [
      { label: "Paving calls per month", value: "8-15" },
      { label: "Average project value", value: "£2,000-£6,000" },
      { label: "Monthly revenue lost", value: "£4,000-£22,500" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every paving project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Site Survey Scheduling",
        description: "Property surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Paving Details Capture",
        description: "Full driveway specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing paving projects we didn't know were calling. Our project pipeline is up 45%.",
      author: "Mark Taylor",
      business: "Taylor Paving Solutions, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "paving contractor answering service",
      "driveway installer phone system",
      "paving company call capture",
    ],
  },
  {
    id: "decking-specialists",
    slug: "decking-specialists",
    title: "AI Receptionist for Decking Specialists",
    subtitle:
      "Capture every decking project. Never lose a customer again.",
    icon: "🪵",
    category: "Outdoor Services",
    painPoint:
      "A homeowner wants a new deck. They call at 10am. You're on a job. They find another specialist. That's a £1,500-£5,000 project gone.",
    stats: [
      { label: "Decking calls per month", value: "6-12" },
      { label: "Average project value", value: "£1,500-£5,000" },
      { label: "Monthly revenue lost", value: "£3,000-£15,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Project Enquiry Capture",
        description: "Every decking project enquiry answered.",
      },
      {
        icon: "clock",
        title: "Site Survey Scheduling",
        description: "Garden surveys booked automatically.",
      },
      {
        icon: "trending-up",
        title: "Decking Details Capture",
        description: "Full deck specifications captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing decking projects we didn't know were calling. Our project pipeline is up 40%.",
      author: "Emma Green",
      business: "Green Decking Specialists, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "decking specialist answering service",
      "deck builder phone system",
      "decking company call capture",
    ],
  },

  // Security & Safety Services (8 new)
  {
    id: "pest-control",
    slug: "pest-control",
    title: "AI Receptionist for Pest Control Services",
    subtitle:
      "Capture every pest control job. Never lose a customer again.",
    icon: "🐀",
    category: "Security & Safety",
    painPoint:
      "A business owner has a pest problem. They call at 9am. You're on a job. They find another pest control company. That's a £200-£500 job gone.",
    stats: [
      { label: "Pest control calls per week", value: "10-20" },
      { label: "Average job value", value: "£200-£500" },
      { label: "Weekly revenue lost", value: "£1,000-£4,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every pest control enquiry answered.",
      },
      {
        icon: "clock",
        title: "Emergency Priority",
        description: "Urgent pest issues escalated immediately.",
      },
      {
        icon: "trending-up",
        title: "Property Details Capture",
        description: "Full property and pest details captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing pest control jobs we didn't know were calling. Our monthly revenue is up 40%.",
      author: "Chris Martin",
      business: "Martin Pest Control, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "pest control service answering",
      "pest control company phone system",
      "pest control call capture",
    ],
  },
  {
    id: "fire-safety",
    slug: "fire-safety",
    title: "AI Receptionist for Fire Safety System Installers",
    subtitle:
      "Capture every fire safety installation. Never lose a customer again.",
    icon: "🔥",
    category: "Security & Safety",
    painPoint:
      "A business manager needs fire safety systems. They call at 10am. You're on a job. They find another installer. That's a £1,000-£5,000 job gone.",
    stats: [
      { label: "Installation calls per month", value: "5-12" },
      { label: "Average installation value", value: "£1,000-£5,000" },
      { label: "Monthly revenue lost", value: "£2,500-£15,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Enquiry Capture",
        description: "Every fire safety enquiry answered.",
      },
      {
        icon: "clock",
        title: "Compliance Priority",
        description: "Urgent compliance needs escalated.",
      },
      {
        icon: "trending-up",
        title: "Building Details Capture",
        description: "Full building specs captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing fire safety installations we didn't know were calling. Our installation pipeline is up 45%.",
      author: "Robert Green",
      business: "Green Fire Safety Solutions, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "fire safety installer answering service",
      "fire alarm system phone system",
      "fire safety company call capture",
    ],
  },
  {
    id: "cctv-security",
    slug: "cctv-security",
    title: "AI Receptionist for CCTV & Security Installers",
    subtitle:
      "Capture every security installation. Never lose a customer again.",
    icon: "📹",
    category: "Security & Safety",
    painPoint:
      "A business manager needs CCTV installed. They call at 11am. You're on a job. They find another installer. That's a £1,500-£4,000 job gone.",
    stats: [
      { label: "Installation calls per month", value: "8-15" },
      { label: "Average installation value", value: "£1,500-£4,000" },
      { label: "Monthly revenue lost", value: "£3,000-£15,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Enquiry Capture",
        description: "Every CCTV enquiry answered.",
      },
      {
        icon: "clock",
        title: "Security Priority",
        description: "Urgent security needs escalated.",
      },
      {
        icon: "trending-up",
        title: "Property Details Capture",
        description: "Full property security specs captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing CCTV installations we didn't know were calling. Our installation pipeline is up 50%.",
      author: "Mark Wilson",
      business: "Wilson Security Solutions, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "CCTV installer answering service",
      "security system phone system",
      "CCTV company call capture",
    ],
  },
  {
    id: "alarm-systems",
    slug: "alarm-systems",
    title: "AI Receptionist for Alarm System Installers",
    subtitle:
      "Capture every alarm installation. Never lose a customer again.",
    icon: "🚨",
    category: "Security & Safety",
    painPoint:
      "A business manager needs an alarm system. They call at 9am. You're on a job. They find another installer. That's a £800-£2,500 job gone.",
    stats: [
      { label: "Installation calls per month", value: "10-20" },
      { label: "Average installation value", value: "£800-£2,500" },
      { label: "Monthly revenue lost", value: "£4,000-£12,500" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Enquiry Capture",
        description: "Every alarm system enquiry answered.",
      },
      {
        icon: "clock",
        title: "Security Priority",
        description: "Urgent security needs escalated.",
      },
      {
        icon: "trending-up",
        title: "Property Details Capture",
        description: "Full property alarm specs captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing alarm installations we didn't know were calling. Our installation pipeline is up 45%.",
      author: "Lisa Taylor",
      business: "Taylor Alarm Systems, Bristol",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "alarm system installer answering service",
      "security alarm phone system",
      "alarm company call capture",
    ],
  },

  // Automotive Services (5 new)
  {
    id: "mobile-mechanics",
    slug: "mobile-mechanics",
    title: "AI Receptionist for Mobile Mechanics",
    subtitle:
      "Capture every mobile repair job. Never lose a customer again.",
    icon: "🚗",
    category: "Automotive Services",
    painPoint:
      "A driver has car trouble. They call at 10am. You're on a job. They find another mobile mechanic. That's a £150-£400 job gone.",
    stats: [
      { label: "Repair calls per week", value: "10-20" },
      { label: "Average job value", value: "£150-£400" },
      { label: "Weekly revenue lost", value: "£750-£4,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every mobile repair enquiry answered.",
      },
      {
        icon: "clock",
        title: "Location Capture",
        description: "Full location and vehicle details captured.",
      },
      {
        icon: "trending-up",
        title: "Dispatch Ready",
        description: "All details ready for immediate dispatch.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing mobile repair jobs we didn't know were calling. Our monthly revenue is up 35%.",
      author: "Tom Brown",
      business: "Brown Mobile Mechanics, Manchester",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "mobile mechanic answering service",
      "mobile repair phone system",
      "mechanic call capture",
    ],
  },
  {
    id: "mobile-tyre-fitting",
    slug: "mobile-tyre-fitting",
    title: "AI Receptionist for Mobile Tyre Fitting Services",
    subtitle:
      "Capture every tyre fitting job. Never lose a customer again.",
    icon: "🛞",
    category: "Automotive Services",
    painPoint:
      "A driver has a flat tyre. They call at 2pm. You're on a job. They find another tyre fitter. That's a £80-£200 job gone.",
    stats: [
      { label: "Tyre calls per week", value: "15-30" },
      { label: "Average job value", value: "£80-£200" },
      { label: "Weekly revenue lost", value: "£600-£3,000" },
      { label: "Calls captured", value: "99.7%" },
    ],
    keyFeatures: [
      {
        icon: "phone",
        title: "24/7 Booking",
        description: "Every tyre fitting enquiry answered.",
      },
      {
        icon: "clock",
        title: "Emergency Priority",
        description: "Roadside emergencies escalated immediately.",
      },
      {
        icon: "trending-up",
        title: "Location & Vehicle Capture",
        description: "Full location and vehicle details captured.",
      },
    ],
    testimonial: {
      quote:
        "We're capturing tyre fitting jobs we didn't know were calling. Our monthly revenue is up 40%.",
      author: "John Smith",
      business: "Smith Mobile Tyres, London",
    },
    cta: "Start Your Free Trial",
    seoKeywords: [
      "mobile tyre fitting answering service",
      "tyre fitter phone system",
      "mobile tyre call capture",
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map((industry) => industry.slug);
}

export function getIndustriesByCategory(category: string): Industry[] {
  return industries.filter((industry) => industry.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(
    industries
      .map((i) => i.category)
      .filter((cat): cat is string => Boolean(cat))
  );
  return Array.from(categories).sort();
}
