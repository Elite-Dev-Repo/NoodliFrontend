import { useState } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Analytics01Icon,
  Cancel01Icon,
  ChartLineData02Icon,
  ComputerActivityIcon,
  DashboardSquare01Icon,
  Logout03Icon,
  Menu01Icon,
  Settings02Icon,
  Target01Icon,
} from "@hugeicons/core-free-icons";

import logo from "../assets/logo_no_bg.png";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Overview",
    to: "/dashboard",
    icon: DashboardSquare01Icon,
  },
  {
    key: "applications",
    label: "Applications",
    to: "/applications",
    icon: ComputerActivityIcon,
  },
  {
    key: "reports",
    label: "Reports",
    to: "/reports",
    icon: ChartLineData02Icon,
  },
  { key: "goals", label: "Goals", to: "/goals", icon: Target01Icon },
  {
    key: "analytics",
    label: "Analytics",
    to: "/analytics",
    icon: Analytics01Icon,
  },
];

const DashboardSidebar = ({ active = "dashboard", profile, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="relative z-40 border-b border-background/10 bg-foreground text-background lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2"
            aria-label="Noodli dashboard"
            onClick={closeMenu}
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-background p-1.5">
              <img
                src={logo}
                alt="Noodli logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-pixel text-xl tracking-tight">
              Noodli<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold uppercase text-primary-foreground">
              {(profile?.username || profile?.email || "N").slice(0, 1)}
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              className="flex size-9 items-center justify-center rounded-lg border border-background/20"
            >
              <HugeiconsIcon
                icon={menuOpen ? Cancel01Icon : Menu01Icon}
                size={18}
              />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute inset-x-0 top-full z-50 border-b border-background/10 bg-foreground p-3 shadow-xl">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.key === active;

                return (
                  <Link
                    key={item.key}
                    to={item.to}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-background/70 hover:bg-background/10 hover:text-background"
                    }`}
                  >
                    <HugeiconsIcon icon={item.icon} size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-3 flex flex-col gap-1 border-t border-background/10 pt-3">
              <Link
                to="/settings"
                onClick={closeMenu}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active === "settings"
                    ? "bg-primary text-primary-foreground"
                    : "text-background/70 hover:bg-background/10 hover:text-background"
                }`}
              >
                <HugeiconsIcon icon={Settings02Icon} size={18} />
                Settings
              </Link>
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onLogout();
                }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-background/70 transition-colors hover:bg-background/10 hover:text-background"
              >
                <HugeiconsIcon icon={Logout03Icon} size={18} />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>

      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-foreground/10 bg-foreground p-4 lg:flex">
        <div className="flex flex-col gap-7">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-2 py-1"
            aria-label="Noodli home"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-background p-1.5">
              <img
                src={logo}
                alt="Noodli logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-pixel text-2xl tracking-tight text-background">
              Noodli<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="flex flex-col gap-1">
            <span className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-background/40">
              Workspace
            </span>
            {NAV_ITEMS.map((item) => {
              const isActive = item.key === active;

              return (
                <Link
                  key={item.key}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-background/70 hover:bg-background/10 hover:text-background"
                  }`}
                >
                  <HugeiconsIcon icon={item.icon} size={18} />
                  {item.label}
                  {isActive && (
                    <span className="ml-auto size-1.5 rounded-full bg-background" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-1">
            <span className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-background/40">
              Account
            </span>
            <Link
              to="/settings"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active === "settings"
                  ? "bg-primary text-primary-foreground"
                  : "text-background/70 hover:bg-background/10 hover:text-background"
              }`}
            >
              <HugeiconsIcon icon={Settings02Icon} size={18} />
              Settings
              {active === "settings" && (
                <span className="ml-auto size-1.5 rounded-full bg-background" />
              )}
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-background/70 transition-colors hover:bg-background/10 hover:text-background"
            >
              <HugeiconsIcon icon={Logout03Icon} size={18} />
              Sign out
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-background/10 bg-background/5 p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-semibold uppercase text-primary-foreground">
            {(profile?.username || profile?.email || "N").slice(0, 1)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-background">
              {profile?.username || "Noodli User"}
            </p>
            <p className="truncate text-xs text-background/50">
              {profile?.email || "Synced account"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
