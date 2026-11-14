import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  MinusIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

const faqsData = [
  {
    question: "What is Noodli?",
    answer:
      "Noodli is a screen time and productivity tracking platform built specifically for Windows. It consists of a lightweight executable CLI tool that monitors active app usage in real time, and a web dashboard where you can analyze your habits.",
  },
  {
    question: "How do I install and start using Noodli on Windows?",
    answer:
      "Simply download the single `noodli.exe` file from your web dashboard, add it to your PATH (or run it directly from your terminal), run `noodli login` to authenticate, and type `noodli start` to begin tracking your active apps immediately.",
  },
  {
    question: "How does Noodli track my screen time and app usage?",
    answer:
      "The local Noodli agent runs seamlessly in the background. It safely checks the foreground active window on your Windows machine every second, logs process names locally, and batches the data when you run `noodli sync` to update your online dashboard.",
  },
  {
    question: "Is my screen time data safe and private?",
    answer:
      "Yes. Noodli only collects executable names, timestamp dates, and active usage duration (seconds). We do not record keystrokes, capture screenshots, or track browser content.",
  },
  {
    question: "Does the Noodli CLI need to stay open all day?",
    answer:
      "No. You can run `noodli start` as a lightweight background thread. Your terminal stays open for other commands, or you can detach it completely so it runs quietly while you focus on work.",
  },
  {
    question: "Is Noodli free to use?",
    answer:
      "Yes! Noodli offers a free core tier that allows full tracking, local database storage, and cloud syncing to your personal analytics dashboard.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[1fr_1.8fr]">
        <div className="flex flex-col justify-between rounded-3xl bg-foreground p-6 text-background sm:p-10 lg:sticky lg:top-10 lg:min-h-[420px]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-background">
              FAQS
            </span>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Questions? <br />
              Answered.
            </h2>
            <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-background sm:mt-6">
              Everything users usually ask before installing the Noodli CLI
              tracker on Windows. Still curious? Talk to us.
            </p>
          </div>

          <a
            href="mailto:oyenekantomiwa2@gmail.com"
            className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-background px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-foreground"
          >
            Contact support
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
          </a>
        </div>

        {/* Right Side - Accordion List */}
        <div className="flex flex-col gap-3">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-foreground bg-background shadow-sm transition-all hover:shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left font-medium text-foreground transition-colors hover:text-black sm:p-6"
                >
                  <span className="text-base font-normal">{faq.question}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground">
                    <HugeiconsIcon
                      icon={isOpen ? MinusIcon : PlusSignIcon}
                      size={16}
                      className="text-background"
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-foreground px-4 pb-4 pt-4 text-sm font-light leading-relaxed text-foreground sm:px-6 sm:pb-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
