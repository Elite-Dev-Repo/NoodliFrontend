import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  BookOpen02Icon,
  CheckmarkCircle02Icon,
  Coffee02Icon,
  CommandLineIcon,
  ComputerActivityIcon,
  Download04Icon,
  Folder01Icon,
  Key01Icon,
  Login03Icon,
  Mail01Icon,
  PauseCircleIcon,
  RefreshIcon,
  Rocket01Icon,
  SecurityCheckIcon,
  TerminalIcon,
  WindowsOldIcon,
} from "@hugeicons/core-free-icons";

import logo from "./assets/logo_no_bg.png";
import { ACCESS } from "@/lib/constants";

const DOWNLOAD_URL =
  "https://github.com/Elite-Dev-Repo/NoodliApp/releases/download/v1.0.0/Noodli.exe";
const MALT_URL = "https://buymeamalt.com/@elite_dev";

const SECTIONS = [
  { id: "quick-start", label: "Quick start" },
  { id: "install", label: "Download & install" },
  { id: "login", label: "Signing in" },
  { id: "commands", label: "Terminal commands" },
  { id: "tracking", label: "Tracking & your data" },
  { id: "goals", label: "Goals & email alerts" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "support", label: "Support Noodli" },
];

const renderIcon = (Icon, size = 18) => (
  <HugeiconsIcon icon={Icon} size={size} />
);

const Docs = () => {
  const hasAccess = Boolean(localStorage.getItem(ACCESS));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
        <div className="cont flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="Noodli logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-pixel text-xl tracking-tight">
              Noodli<span className="text-primary">.</span>
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              Docs
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <a href="#quick-start" className="transition-colors hover:text-primary">
              Quick start
            </a>
            <Link to="/goals" className="transition-colors hover:text-primary">
              Goals
            </Link>
            <Link
              to={hasAccess ? "/dashboard" : "/auth"}
              className="transition-colors hover:text-primary"
            >
              {hasAccess ? "Dashboard" : "Sign in"}
            </Link>
          </nav>

          <a
            href={MALT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-foreground px-3 py-2 text-xs font-medium text-background transition-colors hover:bg-primary hover:text-background sm:px-4 sm:text-sm"
          >
            {renderIcon(Coffee02Icon, 16)}
            <span className="hidden sm:inline">Buy me a malt</span>
            <span className="sm:hidden">Malt</span>
          </a>
        </div>
      </header>

      <main className="cont py-8 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-2 border-l border-foreground/10 pl-4">
              <span className="pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                On this page
              </span>
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-12">
            <section className="flex flex-col gap-5">
              <div className="inline-flex w-fit items-center gap-2 border border-foreground/15 bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                {renderIcon(BookOpen02Icon, 14)}
                Documentation
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="max-w-3xl font-pixel text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  Get Noodli tracking in under five minutes.
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Noodli is a lightweight Windows tracker that records how long
                  you spend in each application and syncs it to your dashboard.
                  Download the app, sign in once, then use two simple terminal
                  commands: <code className="code-inline">sync</code> and{" "}
                  <code className="code-inline">stop</code>.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={DOWNLOAD_URL}
                  className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground"
                >
                  {renderIcon(WindowsOldIcon)}
                  Download for Windows
                </a>
                <a
                  href={MALT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-foreground/20 bg-background px-5 py-3 text-sm font-medium transition-colors hover:border-foreground hover:bg-secondary"
                >
                  {renderIcon(Coffee02Icon)}
                  Buy me a malt
                  {renderIcon(ArrowUpRight01Icon, 15)}
                </a>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="border border-foreground/10 bg-white/60 px-2.5 py-1">
                  Windows 10 / 11
                </span>
                <span className="border border-foreground/10 bg-white/60 px-2.5 py-1">
                  No installer required
                </span>
                <span className="border border-foreground/10 bg-white/60 px-2.5 py-1">
                  One-time sign in
                </span>
              </div>
            </section>

            <section id="quick-start" className="scroll-mt-24">
              <SectionHeading icon={Rocket01Icon} title="Quick start" />
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "Download Noodli.exe",
                    body: "Grab the latest Windows build from the official GitHub release.",
                    icon: Download04Icon,
                  },
                  {
                    step: "02",
                    title: "Run and sign in once",
                    body: "Enter your Noodli email and password in the terminal window.",
                    icon: Login03Icon,
                  },
                  {
                    step: "03",
                    title: "Sync your activity",
                    body: "Type sync to upload your tracked time, then stop when you are done.",
                    icon: TerminalIcon,
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex flex-col gap-3 border border-foreground/10 bg-white/60 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
                        {renderIcon(item.icon, 18)}
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="install" className="scroll-mt-24">
              <SectionHeading
                icon={Download04Icon}
                title="Download & install"
                description="Noodli ships as a single Windows executable. There is no setup wizard."
              />

              <div className="mt-5 flex flex-col gap-5">
                <Step
                  number="1"
                  title="Download the executable"
                  icon={WindowsOldIcon}
                >
                  <p>
                    Download <code className="code-inline">Noodli.exe</code>{" "}
                    from the official release below. The current build is for
                    Windows 10 and Windows 11.
                  </p>
                  <a
                    href={DOWNLOAD_URL}
                    className="mt-3 inline-flex w-fit items-center gap-2 bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-background"
                  >
                    {renderIcon(Download04Icon, 16)}
                    Download Noodli.exe
                    <span className="text-xs font-normal text-background/60">
                      v1.0.0
                    </span>
                  </a>
                </Step>

                <Step
                  number="2"
                  title="Move it to a permanent folder"
                  icon={Folder01Icon}
                >
                  <p>
                    Create a folder such as{" "}
                    <code className="code-inline">
                      C:\Users\&lt;your-name&gt;\Noodli
                    </code>{" "}
                    and move <code className="code-inline">Noodli.exe</code>{" "}
                    there. Avoid running it directly from your Downloads folder
                    so updates and shortcuts are easier to manage.
                  </p>
                  <p className="mt-2">
                    Optional: right-click the executable, choose{" "}
                    <strong>Send to &gt; Desktop (create shortcut)</strong>, and
                    keep Noodli one double-click away.
                  </p>
                </Step>

                <Step
                  number="3"
                  title="Launch Noodli"
                  icon={Rocket01Icon}
                >
                  <p>
                    Double-click <code className="code-inline">Noodli.exe</code>
                    . A terminal window opens and stays visible while Noodli is
                    tracking. You do not need Python or any other runtime
                    installed.
                  </p>
                  <div className="mt-3 flex gap-3 border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-foreground/80">
                    {renderIcon(SecurityCheckIcon, 16)}
                    <span>
                      If Windows SmartScreen appears, click{" "}
                      <strong>More info</strong>, then{" "}
                      <strong>Run anyway</strong>. Only download Noodli from the
                      official release linked on this page.
                    </span>
                  </div>
                </Step>
              </div>
            </section>

            <section id="login" className="scroll-mt-24">
              <SectionHeading
                icon={Key01Icon}
                title="Signing in"
                description="You only need to enter your credentials the first time, or after your saved session expires."
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={Login03Icon}
                  title="First launch"
                  body="Type your email, press Enter, type your password, then press Enter again. Press Esc to cancel. Use the same account you use on the Noodli website."
                />
                <InfoCard
                  icon={SecurityCheckIcon}
                  title="Saved session"
                  body="After a successful login Noodli stores a token in %USERPROFILE%\.noodli\config.json. On later launches it validates the token and refreshes it silently, so you are not asked to log in again."
                />
              </div>

              <div className="mt-4 border border-foreground/10 bg-white/60 p-5">
                <h3 className="text-sm font-semibold">
                  What happens on each launch?
                </h3>
                <ol className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                  {[
                    "Noodli reads your saved access token.",
                    "If the token is still valid, tracking starts immediately without a login prompt.",
                    "If the access token expired, Noodli tries to refresh it using the saved refresh token.",
                    "If refreshing fails, you are asked to sign in again.",
                  ].map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                To sign out of the desktop app, close it and delete{" "}
                <code className="code-inline">
                  %USERPROFILE%\.noodli\config.json
                </code>
                . The next launch will ask you to sign in.
              </p>
            </section>

            <section id="commands" className="scroll-mt-24">
              <SectionHeading
                icon={CommandLineIcon}
                title="Terminal commands"
                description="Noodli starts tracking automatically after login. Type these commands in the terminal window while it runs."
              />

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="border border-foreground/10 bg-white/60 p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
                      {renderIcon(RefreshIcon, 17)}
                    </span>
                    <h3 className="font-mono text-lg font-semibold">sync</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Uploads everything tracked since the last sync to your
                    Noodli dashboard. On success, the local tracker is cleared so
                    the same activity is never uploaded twice.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Run it before closing Noodli to keep your dashboard current.
                  </p>
                </div>

                <div className="border border-foreground/10 bg-white/60 p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
                      {renderIcon(PauseCircleIcon, 17)}
                    </span>
                    <h3 className="font-mono text-lg font-semibold">stop</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Stops the tracking loop and exits the command prompt. Your
                    local tracker file is left in place, so you can still sync it
                    on the next launch.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <kbd className="code-inline">Ctrl</kbd> +{" "}
                    <kbd className="code-inline">C</kbd> also stops tracking
                    safely.
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-hidden border border-foreground/10 bg-foreground text-background">
                <div className="flex items-center justify-between border-b border-background/10 px-4 py-2.5">
                  <span className="flex items-center gap-2 text-xs font-medium text-background/60">
                    {renderIcon(TerminalIcon, 14)}
                    Noodli terminal
                  </span>
                  <span className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-background/30" />
                    <span className="size-2 rounded-full bg-background/30" />
                    <span className="size-2 rounded-full bg-background/30" />
                  </span>
                </div>
                <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-background/80 sm:text-sm">
                  <code>
                    {"> sync\n"
                      + "Syncing ...\n"
                      + "Sync successful. Tracker cleared.\n\n"
                      + "> stop\n"}
                  </code>
                </pre>
              </div>
            </section>

            <section id="tracking" className="scroll-mt-24">
              <SectionHeading
                icon={ComputerActivityIcon}
                title="Tracking & your data"
                description="Noodli only records the foreground application name and how long it stays active."
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={Folder01Icon}
                  title="Local storage"
                  body="Activity is written to %USERPROFILE%\.noodli\tracker.json while you work. The file is local to your PC until you run sync."
                />
                <InfoCard
                  icon={SecurityCheckIcon}
                  title="What is collected"
                  body="Application names such as Code.exe, dates, and tracked seconds. Noodli does not capture screenshots, keystrokes, or window contents."
                />
              </div>
            </section>

            <section id="goals" className="scroll-mt-24">
              <SectionHeading
                icon={Mail01Icon}
                title="Goals & email alerts"
                description="Set a screen time goal and let Noodli tell you when it is met."
              />

              <div className="mt-5 border border-foreground/10 bg-white/60 p-5">
                <ol className="flex flex-col gap-3 text-sm text-muted-foreground">
                  {[
                    "Open Goals in your dashboard and create a goal.",
                    "Choose all apps or a single application, daily or weekly, and a target in minutes.",
                    "Pick a limit goal to be alerted when you exceed it, or an achievement goal to be alerted when you reach it.",
                    "Keep email notifications on. After each sync, Noodli checks your usage and sends one email per period when the goal is met.",
                  ].map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <Link
                  to="/goals"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
                >
                  Create a goal
                  {renderIcon(ArrowRight01Icon, 15)}
                </Link>
              </div>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <SectionHeading
                icon={CheckmarkCircle02Icon}
                title="Troubleshooting"
              />
              <div className="mt-5 flex flex-col divide-y divide-foreground/10 border border-foreground/10 bg-white/60">
                {[
                  {
                    question: "Noodli asks me to log in every time",
                    answer:
                      "Check that %USERPROFILE%\\.noodli\\config.json exists and that Noodli can write to your home folder. If the token has expired and the refresh token is invalid, sign in again.",
                  },
                  {
                    question: "My dashboard is empty after tracking",
                    answer:
                      "Run sync in the terminal before closing Noodli, wait for the success message, then refresh the dashboard. If sync fails, the tracker file is kept so you can retry.",
                  },
                  {
                    question: "Windows blocked Noodli.exe",
                    answer:
                      "SmartScreen commonly flags new unsigned executables. Click More info, then Run anyway. Only run a copy downloaded from the official release.",
                  },
                  {
                    question: "I stopped tracking but usage is still recorded",
                    answer:
                      "Stop waits for the current one-second tick to finish. If the terminal is stuck, press Ctrl + C to stop safely.",
                  },
                  {
                    question: "Sync failed",
                    answer:
                      "Confirm you have an internet connection and are still signed in. Nothing is cleared locally until the server accepts the upload, so you can safely retry.",
                  },
                  {
                    question: "Where do I change my password?",
                    answer:
                      "Use the forgot password link on the sign-in page. After changing it, delete config.json so Noodli asks for the new password on the next launch.",
                  },
                ].map((item) => (
                  <details key={item.question} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                      {item.question}
                      <span className="text-muted-foreground transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section id="support" className="scroll-mt-24">
              <div className="flex flex-col gap-5 border border-foreground bg-foreground p-6 text-background sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background text-foreground">
                    {renderIcon(Coffee02Icon, 20)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/50">
                      Support Noodli
                    </p>
                    <h2 className="mt-1 font-pixel text-2xl tracking-tight">
                      Buy me a malt?
                    </h2>
                    <p className="mt-1 max-w-md text-sm text-background/60">
                      Noodli is built and maintained by one developer. If it
                      helps you take back your screen time, a cold malt goes a
                      long way.
                    </p>
                  </div>
                </div>

                <a
                  href={MALT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-background"
                >
                  {renderIcon(Coffee02Icon, 16)}
                  Buy me a malt
                  {renderIcon(ArrowUpRight01Icon, 15)}
                </a>
              </div>
            </section>

            <footer className="flex flex-col gap-3 border-t border-foreground/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>
                Noodli documentation. Need help?{" "}
                <a
                  href={MALT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-foreground hover:text-primary"
                >
                  Message the developer
                </a>
                .
              </span>
              <div className="flex items-center gap-4">
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
                <Link
                  to={hasAccess ? "/dashboard" : "/auth"}
                  className="hover:text-foreground"
                >
                  {hasAccess ? "Dashboard" : "Sign in"}
                </Link>
                <a
                  href={DOWNLOAD_URL}
                  className="hover:text-foreground"
                >
                  Download
                </a>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

const SectionHeading = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
      {renderIcon(Icon)}
    </div>
    <div>
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  </div>
);

const Step = ({ number, title, icon: Icon, children }) => (
  <div className="flex gap-4 border border-foreground/10 bg-white/60 p-5">
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
        {renderIcon(Icon, 18)}
      </div>
      <span className="font-mono text-[10px] font-semibold text-muted-foreground">
        {number}
      </span>
    </div>
    <div className="min-w-0 text-sm leading-relaxed text-muted-foreground">
      <h3 className="mb-1.5 text-base font-semibold text-foreground">
        {title}
      </h3>
      {children}
    </div>
  </div>
);

const InfoCard = ({ icon: Icon, title, body }) => (
  <div className="flex flex-col gap-3 border border-foreground/10 bg-white/60 p-5">
    <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
      {renderIcon(Icon, 18)}
    </div>
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  </div>
);

export default Docs;
