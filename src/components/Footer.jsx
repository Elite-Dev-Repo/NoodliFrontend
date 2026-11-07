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
      { text: "Features", href: "#features" },
      { text: "How It Works", href: "#how-it-works" },
      { text: "Docs", href: "#docs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Blog", href: "#blog" },
      { text: "Support", href: "#support" },
      { text: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Privacy", href: "#privacy" },
      { text: "Terms", href: "#terms" },
    ],
  },
];

const socials = [
  { icon: Github01Icon, href: "https://github.com", label: "GitHub" },
  { icon: NewTwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin01Icon, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-foreground mt-10">
      <div className="cont py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Noodli logo"
                className="h-10 w-auto object-contain"
              />
              <span className="font-pixel text-2xl tracking-tight">
                Noodli
              </span>
            </a>
            <p className="max-w-xs text-sm font-light tracking-wide text-muted-foreground leading-relaxed">
              One platform for every application. Understand your screen time
              and take back your day.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="size-10 flex items-center justify-center border-2 border-foreground transition-colors hover:bg-primary"
                >
                  <HugeiconsIcon
                    icon={social.icon}
                    size={20}
                    className="text-foreground"
                  />
                </a>
              ))}
            </div>
          </div>

          {footer_columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h4 className="font-pixel text-lg font-semibold tracking-tight">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="text-sm font-light tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t-2 border-foreground flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs font-light tracking-wider text-muted-foreground">
            © {new Date().getFullYear()} Noodli. All rights reserved.
          </p>
          <p className="text-xs font-light tracking-wider text-muted-foreground">
            Built for Windows.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
