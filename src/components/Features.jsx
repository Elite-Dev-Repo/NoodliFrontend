import { HugeiconsIcon } from "@hugeicons/react";
import {
  ComputerActivityIcon,
  ChartLineData02Icon,
  Target01Icon,
  ShieldCheckIcon,
} from "@hugeicons/core-free-icons";

const features = [
  {
    icon: ComputerActivityIcon,
    title: "Every App Tracked",
    text: "Noodli automatically logs every application you open on Windows — no manual timers, no missed sessions.",
  },
  {
    icon: ChartLineData02Icon,
    title: "Real-Time Insights",
    text: "See exactly where your hours go with live dashboards that break down your screen time by app and by day.",
  },
  {
    icon: Target01Icon,
    title: "Focus That Sticks",
    text: "Spot the apps that drain your day and set goals that keep your attention on the work that actually matters.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Private By Design",
    text: "Your activity stays secure. Noodli tracks your workflow locally and never sells or shares your personal data.",
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
            Features
          </span>
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Everything you need to own your day.
          </h2>
          <p className="max-w-xl text-sm font-light tracking-wide text-foreground sm:text-base">
            Built for Windows. Designed to be invisible until you need the
            numbers that matter.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group flex flex-col gap-5 rounded-3xl border border-foreground p-6 shadow-sm transition-all hover:shadow-md sm:p-8 ${
                i === 0
                  ? "bg-foreground text-background sm:col-span-2"
                  : "bg-background text-foreground"
              } ${i === 3 ? "sm:col-span-2" : ""}`}
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <HugeiconsIcon
                  icon={feature.icon}
                  size={24}
                  className={`transition-colors`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm font-light tracking-wide leading-relaxed">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
