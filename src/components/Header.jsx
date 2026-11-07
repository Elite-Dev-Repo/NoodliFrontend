import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { WindowsOldIcon, BookOpen02Icon } from "@hugeicons/core-free-icons";
import logo from "../assets/logo_no_bg.png";
import hero from "../assets/hero2.jpeg";

const Header = () => {
  const nav_links = [
    { text: "Features", href: "#features" },
    { text: "How It Works", href: "#how-it-works" },
    { text: "Docs", href: "#docs" },
  ];

  const header_btn = [
    {
      text: "Download for Windows",
      icon: <HugeiconsIcon icon={WindowsOldIcon} />,
    },
    {
      text: "Read the Docs",
      icon: <HugeiconsIcon icon={BookOpen02Icon} />,
    },
  ];

  const milestones = [
    { value: "200+", label: "Apps Tracked" },
    { value: "95%", label: "Accuracy" },
    { value: "24/7", label: "Monitoring" },
  ];

  return (
    <section className="w-full min-h-screen">
      <div className="cont">
        <nav className="relative h-15 px-4 border border-foreground w-full flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Noodli logo"
              className="h-10 w-auto object-contain"
            />
            <span className="font-pixel text-2xl tracking-tight">Noodli</span>
          </a>

          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {nav_links.map((link) => (
              <li key={link.text}>
                <a
                  href={link.href}
                  className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          <button className="h-10 px-5 bg-foreground text-background text-sm font-medium transition-colors hover:bg-primary hover:text-foreground">
            Sign in
          </button>
        </nav>
      </div>
      <div className=" w-full h-[calc(100vh-12em)] flex flex-col items-center justify-center gap-3">
        <h1 className="font-pixel text-6xl tracking-tight font-semibold leading-normal text-center">
          {" "}
          One Platform, Every application <br /> under surveillance.{" "}
        </h1>
        <p className="text-md font-light tracking-wider text-center">
          Discover exactly where your hours go every day and take control <br />
          of your screen time by effortlessly tracking your Windows apps with
          Noodli.
        </p>

        <div className="flex items-center gap-5">
          {header_btn.map((btn, i) => {
            return (
              <button
                key={i}
                className="px-4 py-2 flex items-center justify-center bg-foreground text-background gap-3"
              >
                <span>{btn.icon}</span> {btn.text}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="max-w-320 h-[90vh] mx-auto bg-cover bg-norepeat bg-center flex items-end justify-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="bg-background/60 w-[90%] h-[95%] flex items-end justify-center">
          <div className="bg-background w-[95%] h-[95%]"></div>
        </div>
      </div>

      <div className="cont border-2 border-foreground my-10 min-h-30 flex items-center justify-around">
        {milestones.map((milestone) => (
          <div
            key={milestone.label}
            className="flex flex-col items-center gap-1"
          >
            <span className="font-pixel text-5xl font-semibold">
              {milestone.value}
            </span>
            <span className="text-sm font-light tracking-wider text-muted-foreground">
              {milestone.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Header;
