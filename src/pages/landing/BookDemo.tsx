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
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";

const formSchema = z.object({
  industry: z.string().min(1, "Please select your industry"),
  callVolume: z.string().min(1, "Please enter your monthly call volume"),
  challenge: z.string().min(1, "Please select your biggest challenge"),
  jobValue: z.string().min(1, "Please enter your average job/service value"),
  currentSystem: z.string().min(1, "Please select if you use a booking system"),
  timeline: z.string().min(1, "Please select your preferred timeline"),
});

type FormData = z.infer<typeof formSchema>;

export default function BookDemo() {
  const [step, setStep] = useState<"form" | "calendar" | "success">("form");
  const [formData, setFormData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      callVolume: "",
      challenge: "",
      jobValue: "",
      currentSystem: "",
      timeline: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setStep("calendar");
    toast.success("Great! Now let's book your demo.");
  };

  const handleCalendarConfirm = () => {
    setStep("success");
    toast.success("Demo scheduled! Check your email for confirmation.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 -z-10" />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
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
      <section className="py-16 md:py-24">
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

                {/* Calendar Placeholder */}
                <div className="mb-8 p-12 bg-secondary rounded-lg border border-border flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Calendar Integration
                    </p>
                    <p className="text-muted-foreground max-w-xs">
                      Your developer will integrate Google Calendar here. Users
                      can select their preferred demo time.
                    </p>
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
                  >
                    Confirm & Schedule
                    <ArrowRight className="ml-2 w-4 h-4" />
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
                  Thank you for booking. We've sent a confirmation email with
                  your demo details and a personalized solution overview based on
                  your business profile.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8 text-left">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    What happens next:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>
                        Confirmation email with demo link and dial-in details
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>
                        Personalized solution document prepared for your industry
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>
                        Live walkthrough of how Quantum Connects solves your
                        challenges
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>ROI calculation specific to your business</span>
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
        <section className="py-16 md:py-24 bg-secondary">
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
