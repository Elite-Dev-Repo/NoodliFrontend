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
    text: "Grab Noodli for Windows and install it in under a minute. No account required to get started.",
  },
  {
    number: "02",
    icon: ComputerActivityIcon,
    title: "Let It Run",
    text: "Noodli quietly runs in the background, logging every app and window you use throughout the day.",
  },
  {
    number: "03",
    icon: ChartLineData02Icon,
    title: "Review Your Insights",
    text: "Open your dashboard to see a clear breakdown of where your time went and what to change next.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full">
      <div className="cont py-20">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="bg-primary text-foreground text-xs font-medium tracking-widest uppercase px-3 py-1 border-2 border-foreground">
            How It Works
          </span>
          <h2 className="font-pixel text-5xl font-semibold tracking-tight leading-tight">
            Three steps. Zero effort.
          </h2>
          <p className="max-w-2xl text-base font-light tracking-wide text-muted-foreground">
            Set Noodli up once and it takes care of the rest — silently,
            locally, and always in your control.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative border-2 border-foreground bg-background p-8 flex flex-col gap-4"
            >
              <span className="absolute -top-5 -left-3 size-11 flex items-center justify-center bg-foreground text-background font-pixel text-lg font-semibold">
                {step.number}
              </span>
              <div className="size-12 flex items-center justify-center border-2 border-foreground bg-primary">
                <HugeiconsIcon
                  icon={step.icon}
                  size={24}
                  className="text-foreground"
                />
              </div>
              <h3 className="font-pixel text-2xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm font-light tracking-wide text-muted-foreground leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
