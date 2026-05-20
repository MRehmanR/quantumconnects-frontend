const services = [
  "Hair Cut",
  "Dental Checkup",
  "Plumbing Repair",
  "Electrical Work",
  "Restaurant Reservation",
  "Physio Session",
  "Facial Treatment",
  "Legal Consultation",
  "Tax Return",
  "Aesthetic Procedure",
  "Emergency Plumbing",
  "Drain Unblocking",
  "Emergency Electrical",
  "Locksmith Service",
  "Boiler Breakdown",
  "Appliance Repair",
  "Roof Leak Repair",
  "Boiler Installation",
  "HVAC Installation",
  "Heat Pump Installation",
  "EV Charger Installation",
  "Solar Panel Installation",
  "Kitchen Installation",
  "Bathroom Installation",
  "Window & Door Installation",
  "Flooring Installation",
  "Window Cleaning",
  "Gutter Cleaning",
  "Pressure Washing",
  "Carpet Cleaning",
  "End-of-Tenancy Cleaning",
  "Commercial Cleaning",
  "General Plumbing",
  "Non-Emergency Electrical",
  "Handyman Service",
  "Property Maintenance",
  "Building Construction",
  "Carpentry Work",
  "Landscaping",
  "Garden Maintenance",
  "Tree Surgery",
  "Fencing Installation",
  "Paving Installation",
  "Decking Installation",
  "Pest Control",
  "Fire Safety Installation",
  "CCTV Installation",
  "Alarm System Installation",
  "Mobile Mechanics",
  "Mobile Tyre Fitting",
  "Taxi Service",
  "Fast Food Order",
];

const statusesByService: Record<string, string[]> = {
  "Hair Cut": ["Booked", "Confirmed", "Completed", "Deposit Collected"],
  "Dental Checkup": ["Booked", "Deposit Received", "Completed", "Confirmed"],
  "Plumbing Repair": ["Quote Sent", "Deposit Received", "Confirmed", "Completed"],
  "Electrical Work": ["Quote Sent", "Deposit Received", "Confirmed", "Completed"],
  "Restaurant Reservation": [
    "Reservation Confirmed",
    "Deposit Received",
    "Waitlist: Party of 4 - Seated from cancellation",
    "Completed",
  ],
  "Physio Session": ["Appointment Scheduled", "Deposit Received", "Confirmed", "Completed"],
  "Facial Treatment": ["Booked", "Confirmed", "Deposit Collected", "Completed"],
  "Legal Consultation": ["Consultation Scheduled", "Confirmed", "Deposit Received", "Completed"],
  "Tax Return": ["Meeting Scheduled", "Confirmed", "Deposit Received", "Completed"],
  "Aesthetic Procedure": ["Consultation Booked", "Confirmed", "Deposit Received", "Completed"],
  "Taxi Service": ["Booked", "Confirmed", "Pre-booking", "Completed"],
  "Fast Food Order": ["Order Placed", "Payment Received", "Confirmed", "Completed"],
  "Emergency Plumbing": ["Emergency Call", "Dispatch Sent", "En Route", "Completed"],
  "Drain Unblocking": ["Emergency Call", "Dispatch Sent", "On Site", "Completed"],
  "Emergency Electrical": ["Emergency Call", "Dispatch Sent", "En Route", "Completed"],
  "Locksmith Service": ["Lockout Reported", "Dispatch Sent", "En Route", "Completed"],
  "Boiler Breakdown": ["Emergency Call", "Dispatch Sent", "En Route", "Completed"],
  "Appliance Repair": ["Repair Booked", "Confirmed", "Scheduled", "Completed"],
  "Roof Leak Repair": ["Emergency Call", "Dispatch Sent", "On Site", "Completed"],
  "Boiler Installation": ["Enquiry Captured", "Survey Scheduled", "Quote Sent", "Completed"],
  "HVAC Installation": ["Project Enquiry", "Survey Scheduled", "Quote Sent", "Completed"],
  "Heat Pump Installation": ["Enquiry Captured", "Survey Scheduled", "Quote Sent", "Completed"],
  "EV Charger Installation": ["Enquiry Captured", "Assessment Scheduled", "Quote Sent", "Completed"],
  "Solar Panel Installation": ["Enquiry Captured", "Survey Scheduled", "Quote Sent", "Completed"],
  "Kitchen Installation": ["Project Enquiry", "Consultation Scheduled", "Quote Sent", "Completed"],
  "Bathroom Installation": ["Project Enquiry", "Site Visit Scheduled", "Quote Sent", "Completed"],
  "Window & Door Installation": ["Enquiry Captured", "Survey Scheduled", "Quote Sent", "Completed"],
  "Flooring Installation": ["Project Enquiry", "Survey Scheduled", "Quote Sent", "Completed"],
  "Window Cleaning": ["Booking Confirmed", "Scheduled", "Completed", "Payment Received"],
  "Gutter Cleaning": ["Booking Confirmed", "Scheduled", "Completed", "Payment Received"],
  "Pressure Washing": ["Booking Confirmed", "Scheduled", "Completed", "Payment Received"],
  "Carpet Cleaning": ["Booking Confirmed", "Scheduled", "Completed", "Payment Received"],
  "End-of-Tenancy Cleaning": ["Booking Confirmed", "Scheduled", "Completed", "Payment Received"],
  "Commercial Cleaning": ["Contract Enquiry", "Confirmed", "Scheduled", "Completed"],
  "General Plumbing": ["Call Captured", "Callback Scheduled", "Confirmed", "Completed"],
  "Non-Emergency Electrical": ["Call Captured", "Callback Scheduled", "Confirmed", "Completed"],
  "Handyman Service": ["Call Captured", "Callback Scheduled", "Confirmed", "Completed"],
  "Property Maintenance": ["Enquiry Captured", "Confirmed", "Scheduled", "Completed"],
  "Building Construction": ["Project Enquiry", "Survey Scheduled", "Quote Sent", "Completed"],
  "Carpentry Work": ["Project Enquiry", "Site Visit Scheduled", "Quote Sent", "Completed"],
  Landscaping: ["Project Enquiry", "Survey Scheduled", "Quote Sent", "Completed"],
  "Garden Maintenance": ["Booking Confirmed", "Scheduled", "Completed", "Payment Received"],
  "Tree Surgery": ["Booking Confirmed", "Scheduled", "Completed", "Payment Received"],
  "Fencing Installation": ["Project Enquiry", "Survey Scheduled", "Quote Sent", "Completed"],
  "Paving Installation": ["Project Enquiry", "Survey Scheduled", "Quote Sent", "Completed"],
  "Decking Installation": ["Project Enquiry", "Survey Scheduled", "Quote Sent", "Completed"],
  "Pest Control": ["Booking Confirmed", "Scheduled", "Completed", "Payment Received"],
  "Fire Safety Installation": ["Enquiry Captured", "Confirmed", "Scheduled", "Completed"],
  "CCTV Installation": ["Enquiry Captured", "Confirmed", "Scheduled", "Completed"],
  "Alarm System Installation": ["Enquiry Captured", "Confirmed", "Scheduled", "Completed"],
  "Mobile Mechanics": ["Repair Booked", "Confirmed", "En Route", "Completed"],
  "Mobile Tyre Fitting": ["Booking Confirmed", "En Route", "Completed", "Payment Received"],
};

const durationRanges: Record<string, [number, number]> = {
  "Hair Cut": [2, 3],
  "Dental Checkup": [2, 3],
  "Plumbing Repair": [2, 4],
  "Electrical Work": [2, 4],
  "Restaurant Reservation": [1, 2],
  "Physio Session": [2, 4],
  "Facial Treatment": [3, 4],
  "Legal Consultation": [4, 6],
  "Tax Return": [3, 5],
  "Aesthetic Procedure": [2, 4],
  "Taxi Service": [2, 3],
  "Fast Food Order": [3, 4],
  "Emergency Plumbing": [3, 8],
  "Drain Unblocking": [3, 6],
  "Emergency Electrical": [3, 8],
  "Locksmith Service": [2, 5],
  "Boiler Breakdown": [3, 8],
  "Appliance Repair": [2, 5],
  "Roof Leak Repair": [3, 8],
  "Boiler Installation": [3, 6],
  "HVAC Installation": [4, 8],
  "Heat Pump Installation": [3, 7],
  "EV Charger Installation": [2, 5],
  "Solar Panel Installation": [3, 7],
  "Kitchen Installation": [3, 6],
  "Bathroom Installation": [3, 6],
  "Window & Door Installation": [2, 5],
  "Flooring Installation": [3, 6],
  "Window Cleaning": [2, 4],
  "Gutter Cleaning": [2, 4],
  "Pressure Washing": [2, 5],
  "Carpet Cleaning": [2, 4],
  "End-of-Tenancy Cleaning": [3, 6],
  "Commercial Cleaning": [3, 6],
  "General Plumbing": [2, 4],
  "Non-Emergency Electrical": [2, 4],
  "Handyman Service": [2, 4],
  "Property Maintenance": [2, 5],
  "Building Construction": [3, 7],
  "Carpentry Work": [3, 6],
  Landscaping: [3, 7],
  "Garden Maintenance": [2, 4],
  "Tree Surgery": [2, 5],
  "Fencing Installation": [3, 6],
  "Paving Installation": [3, 6],
  "Decking Installation": [3, 6],
  "Pest Control": [2, 4],
  "Fire Safety Installation": [3, 6],
  "CCTV Installation": [3, 6],
  "Alarm System Installation": [2, 5],
  "Mobile Mechanics": [2, 5],
  "Mobile Tyre Fitting": [2, 4],
};

export interface LandingActivity {
  id: string;
  service: string;
  status: string;
  duration: string;
}

export function generateRandomActivity(): LandingActivity {
  const service = services[Math.floor(Math.random() * services.length)];
  const statuses = statusesByService[service] || ["Booked", "Confirmed", "Completed"];
  let status = statuses[Math.floor(Math.random() * statuses.length)];

  if (service === "Restaurant Reservation" && status.includes("Waitlist")) {
    const partySize = Math.floor(Math.random() * 6) + 2;
    status = `Waitlist: Party of ${partySize} - Seated from cancellation`;
  }

  const [min, max] = durationRanges[service] || [2, 5];
  const durationMinutes = Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    id:
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    service,
    status,
    duration: `${durationMinutes}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`,
  };
}

export function getStatusColor(status: string): string {
  if (status.includes("Completed")) return "bg-green-100 text-green-800";
  if (
    status.includes("Deposit") ||
    status.includes("Collected") ||
    status.includes("Received") ||
    status.includes("Payment")
  )
    return "bg-blue-100 text-blue-800";
  if (status.includes("Confirmed") || status.includes("Booked") || status.includes("Scheduled"))
    return "bg-purple-100 text-purple-800";
  if (
    status.includes("Waitlist") ||
    status.includes("Pre-booking") ||
    status.includes("Emergency") ||
    status.includes("Dispatch") ||
    status.includes("Route") ||
    status.includes("Site") ||
    status.includes("Enquiry") ||
    status.includes("Survey") ||
    status.includes("Quote") ||
    status.includes("Assessment")
  )
    return "bg-orange-100 text-orange-800";

  return "bg-gray-100 text-gray-800";
}
