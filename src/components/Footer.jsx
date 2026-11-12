import { HugeiconsIcon } from "@hugeicons/react";
import {
  Github01Icon,
  NewTwitterIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";
import logo from "../assets/logo_no_bg.png";

const footer_columns = [
  {
    title: "Product",
    links: [
      { text: "Platform", href: "#platform" },
      { text: "Capabilities", href: "#capabilities" },
      { text: "Use Cases", href: "#use-cases" },
      { text: "FAQs", href: "#faqs" },
    ],
  },
  {
    title: "Resources",
    links: [{ text: "Documentation", href: "#docs" }],
  },
];

const socials = [
  { icon: Github01Icon, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin01Icon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: NewTwitterIcon, href: "https://twitter.com", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="cont mt-10 w-full rounded-t-2xl border-t border-neutral-800 bg-[#1c1c1c] text-neutral-300">
      <div className="mx-auto px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Left Column: Logo, Description & Socials */}
          <div className="flex flex-col gap-4 ">
            <a
              href="/"
              className="flex items-center gap-2.5 bg-background px-4 py-2 rounded-lg w-fit"
            >
              <img
                src={logo}
                alt="Noodli logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-semibold tracking-tight text-foreground">
                Noodli<span className="text-primary">.</span>
              </span>
            </a>
            <p className="max-w-sm text-sm font-light tracking-wide text-neutral-400 leading-relaxed">
              Personalized AI agent for your website. Give every visitor
              instant, accurate answers about your work.
            </p>
            <div className="flex items-center gap-3 mt-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 transition-colors hover:bg-primary"
                >
                  <HugeiconsIcon
                    icon={social.icon}
                    size={18}
                    className="text-neutral-300"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footer_columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="text-sm font-light tracking-wide text-neutral-300 transition-colors hover:text-primary"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-neutral-800 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs font-light text-neutral-500">
            © {new Date().getFullYear()} Noodli. All rights reserved. Built by
            EliteDEV
          </p>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-xs font-light text-neutral-400">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
