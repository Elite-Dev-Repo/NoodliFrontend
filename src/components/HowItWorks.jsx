import { HugeiconsIcon } from "@hugeicons/react";
import {
  WindowsOldIcon,
  ComputerActivityIcon,
  ChartLineData02Icon,
} from "@hugeicons/core-free-icons";

const steps = [
  {
    number: "01",
    icon: WindowsOldIcon,
    title: "Download & Install",
    text: "Grab Noodli for Windows and install it in under a minute. No complicated setup required to get started.",
  },
  {
    number: "02",
    icon: ComputerActivityIcon,
    title: "Let It Run",
    text: "Noodli quietly runs in the background, logging every active app and window usage securely throughout your day.",
  },
  {
    number: "03",
    icon: ChartLineData02Icon,
    title: "Review Your Insights",
    text: "Open your web dashboard to see a clear breakdown of where your time went and what to optimize next.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
            How It Works
          </span>
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Three steps. Zero effort.
          </h2>
          <p className="max-w-xl text-sm font-light tracking-wide text-neutral-600 sm:text-base">
            Set Noodli up once and let it handle the rest — silently, securely,
            and always under your control.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col gap-5 rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm transition-all hover:shadow-md sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-foreground text-primary">
                  <HugeiconsIcon icon={step.icon} size={24} />
                </div>
                <span className="font-mono text-sm font-semibold tracking-widest text-primary-foreground">
                  {step.number}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight text-primary-foreground">
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed tracking-wide text-primary-foreground/80">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
