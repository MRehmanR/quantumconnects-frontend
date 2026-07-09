import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ArrowRight, Calendar, CheckCircle, Clock, Loader2, Mail, Phone } from "lucide-react";
import { demoApi, type DemoBookingData } from "@/lib/api";

const formSchema = z.object({
  customerName: z.string().min(2, "Please enter your name"),
  customerEmail: z.string().email("Please enter a valid email address"),
  customerPhone: z.string().min(7, "Please enter your phone number"),
  businessName: z.string().min(2, "Please enter your business name"),
  industry: z.string().min(1, "Please select your industry"),
  callVolume: z.string().min(1, "Please enter your monthly call volume"),
  challenge: z.string().min(1, "Please select your biggest challenge"),
  jobValue: z.string().min(1, "Please enter your average job/service value"),
  currentSystem: z.string().min(1, "Please select if you use a booking system"),
  timeline: z.string().min(1, "Please select your preferred timeline"),
  purchasePurpose: z.string().min(1, "Please tell us what you want to achieve"),
});

type FormData = z.infer<typeof formSchema>;

const demoTimeSlots = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00"];

const getClientTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

export default function BookDemo() {
  const [step, setStep] = useState<"form" | "calendar" | "success">("form");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [isBooking, setIsBooking] = useState(false);
  const [booking, setBooking] = useState<DemoBookingData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      businessName: "",
      industry: "",
      callVolume: "",
      challenge: "",
      jobValue: "",
      currentSystem: "",
      timeline: "",
      purchasePurpose: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setStep("calendar");
    toast.success("Great! Now let's book your demo.");
  };

  const handleCalendarConfirm = async () => {
    if (!formData) return;

    setIsBooking(true);
    try {
      const timezone = getClientTimezone();
      const result = await demoApi.bookDemo({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        businessName: formData.businessName,
        businessDetails: [
          `Industry: ${formData.industry}`,
          `Monthly calls: ${formData.callVolume}`,
          `Average job value: ${formData.jobValue}`,
          `Current booking/CRM system: ${formData.currentSystem}`,
        ].join("\n"),
        purchasePurpose: formData.purchasePurpose,
        industry: formData.industry,
        callVolume: formData.callVolume,
        challenge: formData.challenge,
        jobValue: formData.jobValue,
        currentSystem: formData.currentSystem,
        timeline: formData.timeline,
        timezone,
        geoLocation: { timezone },
        time: selectedTime,
      });

      setBooking(result);
      setStep("success");
      if (result.emailDelivery?.confirmationSent) {
        toast.success(`Demo scheduled. Confirmation sent to ${result.customerEmail}.`);
      } else {
        toast.success("Demo scheduled. Email confirmation is pending server email setup.");
      }
    } catch (error: any) {
      const details = error?.details ? ` ${error.details}` : "";
      toast.error(`${error?.message || "Could not book demo."}${details}`);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 -z-10" />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Book Your Demo
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              See how Quantum Connects can transform your business. We'll prepare
              a personalized solution based on your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {step === "form" && (
              <Card className="p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Tell Us About Your Business
                </h2>
                <p className="text-muted-foreground mb-8">
                  These details help us prepare a solution tailored to your needs.
                  When you join the call, we'll already have the answers ready.
                </p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Sarah Ahmed" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Bright Dental Studio" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email for confirmation</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@business.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+44 7000 000000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Question 1: Industry */}
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What industry is your business in?</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Hair Salon, Plumbing, Dental Practice"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Question 2: Call Volume */}
                    <FormField
                      control={form.control}
                      name="callVolume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            How many calls do you receive per month?
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 150"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Question 3: Challenge */}
                    <FormField
                      control={form.control}
                      name="challenge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            What's your biggest challenge with calls?
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a challenge" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="missed-calls">
                                Missing calls during busy times
                              </SelectItem>
                              <SelectItem value="long-wait">
                                Long wait times for customers
                              </SelectItem>
                              <SelectItem value="booking-errors">
                                Manual booking errors
                              </SelectItem>
                              <SelectItem value="after-hours">
                                Handling after-hours calls
                              </SelectItem>
                              <SelectItem value="no-shows">
                                No-shows and cancellations
                              </SelectItem>
                              <SelectItem value="staff-time">
                                Staff spending too much time on calls
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Question 4: Job Value */}
                    <FormField
                      control={form.control}
                      name="jobValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            What's your average job/service value? (£)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 150"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Question 5: Current System */}
                    <FormField
                      control={form.control}
                      name="currentSystem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Are you currently using any booking or CRM system?
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">
                                No, we use manual methods
                              </SelectItem>
                              <SelectItem value="spreadsheet">
                                Spreadsheets/manual tracking
                              </SelectItem>
                              <SelectItem value="basic-booking">
                                Basic booking system
                              </SelectItem>
                              <SelectItem value="crm">CRM system</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Question 6: Timeline */}
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>When would you like to go live?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-day">1 day</SelectItem>
                              <SelectItem value="2-days">2 days</SelectItem>
                              <SelectItem value="3-days">3 days</SelectItem>
                              <SelectItem value="4-days">4 days</SelectItem>
                              <SelectItem value="5-days">5 days</SelectItem>
                              <SelectItem value="6-days">6 days</SelectItem>
                              <SelectItem value="1-week">1 week</SelectItem>
                              <SelectItem value="2-weeks">2 weeks</SelectItem>
                              <SelectItem value="3-weeks">3 weeks</SelectItem>
                              <SelectItem value="4-weeks">4 weeks</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="purchasePurpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What should this service help you improve?</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="e.g., Reduce missed calls, book more appointments, qualify leads after hours"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-white hover:bg-primary/90"
                    >
                      Continue to Calendar
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </Form>
              </Card>
            )}

            {step === "calendar" && formData && (
              <Card className="p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">
                    Select Your Demo Time
                  </h2>
                </div>

                <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Your Business Profile:</strong>
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <strong>Contact:</strong> {formData.customerName} ({formData.customerEmail})
                    </li>
                    <li>
                      <strong>Business:</strong> {formData.businessName}
                    </li>
                    <li>
                      <strong>Industry:</strong> {formData.industry}
                    </li>
                    <li>
                      <strong>Monthly Calls:</strong> {formData.callVolume}
                    </li>
                    <li>
                      <strong>Average Job Value:</strong> £{formData.jobValue}
                    </li>
                    <li>
                      <strong>Timeline:</strong> {formData.timeline}
                    </li>
                  </ul>
                </div>

                <div className="mb-8 p-6 bg-white rounded-lg border border-border shadow-sm">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Choose a time for tomorrow</p>
                      <p className="text-sm text-muted-foreground">
                        Times are shown in your local timezone: {getClientTimezone()}.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {demoTimeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`h-12 rounded-md border text-sm font-semibold transition-colors ${
                          selectedTime === slot
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-muted text-foreground hover:border-primary/60 hover:bg-primary/5"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-foreground">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="truncate">{formData.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="truncate">{formData.customerPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep("form")}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-primary text-white hover:bg-primary/90"
                    onClick={handleCalendarConfirm}
                    disabled={isBooking}
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Scheduling
                      </>
                    ) : (
                      <>
                        Confirm & Schedule
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )}

            {step === "success" && (
              <Card className="p-8 border border-border text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Demo Scheduled!
                </h2>

                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                  Thank you for booking. Your demo is scheduled for{" "}
                  <strong className="text-foreground">
                    {booking?.date} at {booking?.time} ({booking?.timezone})
                  </strong>
                  .
                </p>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8 text-left">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Confirmation details:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>
                        Client confirmation {booking?.emailDelivery?.confirmationSent ? "sent" : "not sent yet"} to{" "}
                        {booking?.emailDelivery?.customerTo || booking?.customerEmail}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>
                        Internal notification {booking?.emailDelivery?.notificationSent ? "sent" : "not sent yet"} to{" "}
                        {booking?.emailDelivery?.notificationTo || "the configured demo notification email"}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>
                        Sent from {booking?.emailDelivery?.from || "SMTP_FROM in backend .env"}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>
                        {booking?.emailDelivery?.error
                          ? booking.emailDelivery.error
                          : "Your business profile is saved for the demo."}
                      </span>
                    </li>
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={() => (window.location.href = "/")}
                >
                  Back to Home
                </Button>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Why This Works Section */}
      {step === "form" && (
        <section className="py-12 md:py-20 bg-secondary">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why We Ask These Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Personalized Solution
                </h3>
                <p className="text-muted-foreground">
                  We prepare a solution specific to your industry and call volume
                  before the demo starts.
                </p>
              </Card>

              <Card className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  ROI Calculation
                </h3>
                <p className="text-muted-foreground">
                  We calculate your exact ROI based on your job value and missed
                  call rate.
                </p>
              </Card>

              <Card className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  No Wasted Time
                </h3>
                <p className="text-muted-foreground">
                  Your demo is focused on YOUR challenges, not generic features.
                </p>
              </Card>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
