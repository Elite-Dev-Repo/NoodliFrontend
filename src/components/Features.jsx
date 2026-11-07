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
    text: "Your activity stays on your machine. Noodli tracks locally and never sells or shares your data.",
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full">
      <div className="cont py-20">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="bg-primary text-foreground text-xs font-medium tracking-widest uppercase px-3 py-1 border-2 border-foreground">
            Features
          </span>
          <h2 className="font-pixel text-5xl font-semibold tracking-tight leading-tight">
            Everything you need to own your day.
          </h2>
          <p className="max-w-2xl text-base font-light tracking-wide text-muted-foreground">
            Built for Windows. Designed to be invisible until you need the
            numbers that matter.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group border-2 border-foreground bg-background p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-foreground)]"
            >
              <div className="size-12 flex items-center justify-center border-2 border-foreground bg-primary transition-colors group-hover:bg-background">
                <HugeiconsIcon
                  icon={feature.icon}
                  size={24}
                  className="text-foreground"
                />
              </div>
              <h3 className="font-pixel text-2xl font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm font-light tracking-wide text-muted-foreground leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
