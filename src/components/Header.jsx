import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookOpen02Icon,
  Cancel01Icon,
  Menu01Icon,
  WindowsOldIcon,
  FolderCheckIcon,
} from "@hugeicons/core-free-icons";
import logo from "../assets/logo_no_bg.png";
import hero from "../assets/hero2.jpeg";
import { ACCESS } from "@/lib/constants";
import MiniDashboard from "./MiniDashboard";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const hasAccess = Boolean(localStorage.getItem(ACCESS));

  const nav_links = [
    { text: "Features", href: "#features" },
    { text: "How It Works", href: "#how-it-works" },
    { text: "Docs", to: "/docs" },
  ];

  const header_btn = [
    {
      text: "Download for Windows",
      icon: <HugeiconsIcon icon={WindowsOldIcon} />,
      url: "https://github.com/Elite-Dev-Repo/NoodliApp/releases/download/v1.0.0/Noodli.exe",
    },
    {
      text: "Read the Docs",
      icon: <HugeiconsIcon icon={BookOpen02Icon} />,
      url: "/docs",
    },
  ];

  const milestones = [
    { value: "200+", label: "Apps Tracked" },
    { value: "95%", label: "Accuracy" },
    { value: "24/7", label: "Monitoring" },
  ];

  return (
    <section className="w-full d-grid z-1">
      <div className="cont">
        <nav className="relative z-50 flex h-15 w-full items-center justify-between border border-foreground/80 px-3 sm:px-4">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img
              src={logo}
              alt="Noodli logo"
              className="h-8 w-auto object-contain sm:h-10"
            />
            <span className="font-pixel text-xl tracking-tight sm:text-2xl">
              Noodli<span className="text-primary">.</span>
            </span>
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {nav_links.map((link) => (
              <li key={link.text}>
                {link.to ? (
                  <Link
                    to={link.to}
                    className="relative text-sm font-medium tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:text-primary hover:after:w-full"
                  >
                    {link.text}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="relative text-sm font-medium tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:text-primary hover:after:w-full"
                  >
                    {link.text}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(hasAccess ? "/dashboard" : "/auth")}
              className="h-9 bg-foreground px-4 text-xs font-medium text-background transition-colors hover:bg-primary hover:text-background sm:h-10 sm:px-5 sm:text-sm"
            >
              {hasAccess ? "Dashboard" : "Sign in"}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              className="flex size-9 items-center justify-center border border-foreground md:hidden"
            >
              <HugeiconsIcon
                icon={menuOpen ? Cancel01Icon : Menu01Icon}
                size={18}
              />
            </button>
          </div>

          {menuOpen && (
            <div className="absolute inset-x-0 top-full mt-2 border border-foreground bg-background p-3 shadow-xl md:hidden">
              <ul className="flex flex-col">
                {nav_links.map((link) => (
                  <li key={link.text}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                      >
                        {link.text}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                      >
                        {link.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 px-4 py-16 text-center sm:gap-6 sm:px-6 sm:py-20 lg:py-24">
        <div className="flex gap-2 w-fit items-center bg-foreground justify-between text-background text-[13px] border-2 border-foreground p-.5 rounded-sm">
          {" "}
          <div className="px-4 py-1.5 bg-primary rounded-sm text-background flex gap-3 items-center justify-between">
            <p className="font-light">Elite</p>{" "}
            <HugeiconsIcon icon={FolderCheckIcon} size={19} strokeWidth={1.5} />
          </div>
          <p className="px-2">Definitely not backed by Y combinator</p>
        </div>
        <h1 className="w-full max-w-5xl font-pixel text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          One platform, every application under{" "}
          <span className="">surveillance.</span>
        </h1>
        <p className="w-full max-w-2xl text-sm font-light leading-relaxed tracking-wide text-muted-foreground sm:text-base">
          Discover exactly where your hours go every day and take control of
          your screen time by effortlessly tracking your Windows apps with
          Noodli.
        </p>

        <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
          {header_btn.map((btn, i) => (
            <Link to={btn.url} key={i}>
              <button
                key={i}
                className={`flex w-full items-center justify-center gap-3 px-4 py-3 text-sm transition-colors sm:w-auto sm:py-2 ${
                  i === 0
                    ? "bg-primary text-primary-foreground hover:bg-foreground"
                    : "bg-foreground text-background hover:bg-primary"
                }`}
              >
                <span>{btn.icon}</span> {btn.text}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-320 min-w-0 px-4 sm:px-6">
        <div
          className="relative overflow-hidden border border-foreground/10 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
          <div className="relative p-3 sm:p-5 lg:p-8">
            <MiniDashboard />
          </div>
        </div>
      </div>

      <div className="cont my-8 sm:my-10">
        <div className="grid grid-cols-1 gap-6 border-2 border-foreground px-5 py-8 text-center sm:grid-cols-3 sm:gap-4 sm:px-8">
          {milestones.map((milestone) => (
            <div
              key={milestone.label}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-pixel text-4xl font-semibold sm:text-5xl">
                {milestone.value}
              </span>
              <span className="text-sm font-light  text-primary tracking-wider text-muted-foreground">
                {milestone.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;
