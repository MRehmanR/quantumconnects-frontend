import { useEffect, useState } from "react";
import {
  generateRandomActivity,
  getStatusColor,
  LandingActivity,
} from "@/lib/landing-activities";
import SourceFlipCounter from "@/components/landing/SourceFlipCounter";

interface Metrics {
  bookingsProcessed: number;
  minutesProcessed: number;
}

export default function SourceLiveCounterV2() {
  const [metrics, setMetrics] = useState<Metrics>({
    bookingsProcessed: 12450,
    minutesProcessed: 89340,
  });

  const [activities, setActivities] = useState<LandingActivity[]>([
    generateRandomActivity(),
    generateRandomActivity(),
    generateRandomActivity(),
    generateRandomActivity(),
    generateRandomActivity(),
  ]);

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setMetrics((prev) => {
        const bookingIncrement = Math.floor(Math.random() * 3) + 1;
        const minuteIncrement = Math.floor(Math.random() * 20) + 10;

        return {
          bookingsProcessed: prev.bookingsProcessed + bookingIncrement,
          minutesProcessed: prev.minutesProcessed + minuteIncrement,
        };
      });
    }, 5000);

    return () => clearInterval(metricsInterval);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isMounted = true;

    const scheduleNextActivity = () => {
      if (!isMounted) return;
      const randomDelay = Math.floor(Math.random() * 8000) + 2000;
      timeoutId = setTimeout(() => {
        if (isMounted) {
          setActivities((prev) => [generateRandomActivity(), ...prev].slice(0, 8));
          scheduleNextActivity();
        }
      }, randomDelay);
    };

    scheduleNextActivity();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-primary/5 via-white to-primary/10">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Real-Time Activity
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            Live metrics from businesses using Quantum Connects right now
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-1 rounded-lg md:rounded-xl">
            <div className="bg-white border border-primary/20 rounded-lg p-3 md:p-6 shadow-sm">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2 md:mb-3">
                Bookings Processed
              </p>
              <p className="text-2xl md:text-4xl font-bold text-foreground tabular-nums">
                <SourceFlipCounter value={metrics.bookingsProcessed.toLocaleString()} />
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-1 rounded-lg md:rounded-xl">
            <div className="bg-white border border-primary/20 rounded-lg p-3 md:p-6 shadow-sm">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2 md:mb-3">
                Minutes Processed
              </p>
              <p className="text-2xl md:text-4xl font-bold text-foreground tabular-nums">
                <SourceFlipCounter value={metrics.minutesProcessed.toLocaleString()} />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg md:rounded-xl border border-primary/20 p-3 md:p-6 mb-6 md:mb-8 shadow-sm">
          <h3 className="text-primary font-semibold mb-3 md:mb-4 text-base md:text-lg">
            Live Activity Feed
          </h3>
          <style>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .activity-item {
              animation: slideDown 0.5s ease-out;
            }
          `}</style>
          <div className="space-y-2 md:space-y-3 max-h-64 md:max-h-96 overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-2 md:gap-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="activity-item bg-primary/5 border border-primary/20 rounded-lg p-2 md:p-4 hover:border-primary/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm md:text-lg font-mono font-bold text-foreground">
                        {activity.duration}
                      </p>
                    </div>

                    <div className="flex-grow min-w-0">
                      <p className="text-xs text-muted-foreground">Service</p>
                      <p className="text-sm md:text-base text-foreground font-medium truncate">
                        {activity.service}
                      </p>
                    </div>

                    <div
                      className={`flex-shrink-0 px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap ${getStatusColor(
                        activity.status,
                      )}`}
                    >
                      {activity.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <p className="text-muted-foreground text-xs md:text-sm">
            Metrics update every 5 seconds | All visitors see live data
          </p>
        </div>
      </div>
    </section>
  );
}
