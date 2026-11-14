import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  Clock01Icon,
  ComputerActivityIcon,
  FireIcon,
  RefreshIcon,
  Search01Icon,
  Timer01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useProfileData } from "@/hooks/useProfileData";
import {
  APP_COLORS,
  RANGES,
  appTotalsFromSessions,
  cleanAppName,
  filterSessionsByRange,
  formatDateLabel,
  formatDuration,
} from "@/lib/sessions";

const SORTS = [
  { key: "usage", label: "Most used" },
  { key: "name", label: "Name (A-Z)" },
  { key: "sessions", label: "Most sessions" },
  { key: "recent", label: "Recently used" },
];

const Applications = () => {
  const { sessions, loading, error, authState, profile, loadData, logout } =
    useProfileData();
  const [range, setRange] = useState("7d");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("usage");

  const filtered = useMemo(
    () => filterSessionsByRange(sessions, range),
    [sessions, range],
  );

  const totalSeconds = useMemo(
    () => filtered.reduce((sum, session) => sum + session.seconds, 0),
    [filtered],
  );

  const apps = useMemo(() => appTotalsFromSessions(filtered), [filtered]);

  const colorByName = useMemo(() => {
    const map = new Map();
    apps.forEach((app, index) => {
      map.set(app.name, APP_COLORS[index % APP_COLORS.length]);
    });
    return map;
  }, [apps]);

  const visibleApps = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = term
      ? apps.filter((app) =>
          cleanAppName(app.name).toLowerCase().includes(term),
        )
      : apps;

    const sorted = [...list];

    if (sort === "name") {
      sorted.sort((a, b) =>
        cleanAppName(a.name).localeCompare(cleanAppName(b.name)),
      );
    } else if (sort === "sessions") {
      sorted.sort((a, b) => b.sessionCount - a.sessionCount);
    } else if (sort === "recent") {
      sorted.sort((a, b) => (b.lastUsed || "").localeCompare(a.lastUsed || ""));
    } else {
      sorted.sort((a, b) => b.seconds - a.seconds);
    }

    return sorted;
  }, [apps, query, sort]);

  const rangeLabel =
    RANGES.find((item) => item.key === range)?.label || "7 days";
  const topApp = apps[0];
  const averagePerApp = apps.length ? totalSeconds / apps.length : 0;

  const stats = [
    {
      label: "Applications",
      value: String(apps.length),
      hint: `tracked in ${rangeLabel.toLowerCase()}`,
      icon: ComputerActivityIcon,
    },
    {
      label: "Total usage",
      value: formatDuration(totalSeconds),
      hint: `across ${filtered.length} ${
        filtered.length === 1 ? "session" : "sessions"
      }`,
      icon: Clock01Icon,
    },
    {
      label: "Most used",
      value: topApp ? formatDuration(topApp.seconds) : "—",
      hint: topApp ? cleanAppName(topApp.name) : "no activity yet",
      icon: FireIcon,
    },
    {
      label: "Average per app",
      value: apps.length ? formatDuration(averagePerApp) : "—",
      hint: "per application",
      icon: Timer01Icon,
    },
  ];

  if (authState === "checking") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 animate-pulse items-center justify-center rounded-2xl bg-foreground text-background">
            <HugeiconsIcon icon={ComputerActivityIcon} size={22} />
          </div>
          <p className="text-sm text-muted-foreground">
            Connecting to Noodli...
          </p>
        </div>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="h-dvh w-full overflow-hidden bg-background p-2 text-foreground sm:p-3 lg:p-4">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-white/60 font-sans backdrop-blur sm:rounded-3xl lg:flex-row">
        <DashboardSidebar
          active="applications"
          profile={profile}
          onLogout={logout}
        />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex flex-col gap-5 border-b border-foreground/10 px-5 py-6 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  <HugeiconsIcon icon={ComputerActivityIcon} size={14} />
                  Applications
                </div>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Every app,{" "}
                  <span className="text-primary">accounted for.</span>
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse every application Noodli tracked and how long you used
                  it.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={loadData}
                >
                  <HugeiconsIcon icon={RefreshIcon} size={15} />
                  Refresh
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-xl border border-foreground/10 bg-secondary/60 p-1">
                {RANGES.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setRange(item.key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                      range === item.key
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:bg-background hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HugeiconsIcon icon={Calendar03Icon} size={14} />
                {rangeLabel}
              </span>
              {error && (
                <span className="text-xs text-destructive">
                  Could not sync: {error}
                </span>
              )}
            </div>
          </header>

          <div className="flex-1 px-5 py-6 sm:px-8 lg:px-10">
            {loading ? (
              <div className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-32 animate-pulse rounded-2xl border border-foreground/10 bg-secondary/60"
                    />
                  ))}
                </div>
                <div className="h-[420px] animate-pulse rounded-2xl border border-foreground/10 bg-secondary/60" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-foreground/20 bg-white/50 p-10 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground text-background">
                  <HugeiconsIcon icon={ComputerActivityIcon} size={26} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">No activity yet</h2>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Start tracking on your desktop and every application you use
                    will appear here within seconds.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={loadData}>
                  <HugeiconsIcon icon={RefreshIcon} size={15} />
                  Check again
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <Card
                      key={stat.label}
                      className="gap-4 rounded-2xl border-foreground/10 py-5 shadow-none"
                    >
                      <CardContent className="flex items-start justify-between px-5">
                        <div className="min-w-0">
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {stat.label}
                          </p>
                          <p className="mt-2 truncate text-3xl font-semibold tracking-tight">
                            {stat.value}
                          </p>
                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            {stat.hint}
                          </p>
                        </div>
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                          <HugeiconsIcon icon={stat.icon} size={18} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="gap-3 rounded-2xl border-foreground/10 py-5 shadow-none">
                  <CardHeader className="px-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-base">
                          All applications
                        </CardTitle>
                        <CardDescription>
                          {visibleApps.length} of {apps.length}{" "}
                          {apps.length === 1 ? "application" : "applications"}
                        </CardDescription>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <HugeiconsIcon icon={Search01Icon} size={15} />
                          </span>
                          <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search apps..."
                            className="h-9 w-full rounded-xl border border-foreground/15 bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10 sm:w-48"
                          />
                        </div>

                        <div className="relative">
                          <select
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                            className="h-9 w-full cursor-pointer appearance-none rounded-xl border border-foreground/15 bg-background pl-3 pr-8 text-sm outline-none transition-colors focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10 sm:w-40"
                          >
                            {SORTS.map((option) => (
                              <option key={option.key} value={option.key}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            size={14}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-5">
                    {visibleApps.length === 0 ? (
                      <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-foreground">
                          <HugeiconsIcon icon={Search01Icon} size={22} />
                        </div>
                        <p className="text-sm font-medium">
                          No applications match &ldquo;{query}&rdquo;
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Try a different search term.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col divide-y divide-foreground/10">
                        {visibleApps.map((app) => {
                          const share = totalSeconds
                            ? (app.seconds / totalSeconds) * 100
                            : 0;
                          const width = topApp
                            ? (app.seconds / topApp.seconds) * 100
                            : 0;
                          const color =
                            colorByName.get(app.name) || APP_COLORS[0];

                          return (
                            <div
                              key={app.name}
                              className="flex flex-col gap-3 py-4 first:pt-1 last:pb-1 sm:flex-row sm:items-center sm:gap-4"
                            >
                              <div className="flex min-w-0 flex-1 items-center gap-3">
                                <div
                                  className="flex size-10 shrink-0 items-center justify-center rounded-xl text-white"
                                  style={{ backgroundColor: color }}
                                >
                                  <HugeiconsIcon
                                    icon={ComputerActivityIcon}
                                    size={18}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium">
                                    {cleanAppName(app.name)}
                                  </p>
                                  <p className="truncate text-xs text-muted-foreground">
                                    {app.sessionCount}{" "}
                                    {app.sessionCount === 1
                                      ? "session"
                                      : "sessions"}{" "}
                                    · {app.activeDays}{" "}
                                    {app.activeDays === 1 ? "day" : "days"}{" "}
                                    active
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between gap-4 sm:justify-end">
                                <div className="hidden text-right sm:block sm:w-24">
                                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Last used
                                  </p>
                                  <p className="mt-0.5 text-xs tabular-nums">
                                    {app.lastUsed
                                      ? formatDateLabel(app.lastUsed)
                                      : "—"}
                                  </p>
                                </div>

                                <div className="min-w-0 flex-1 sm:w-44 sm:flex-none">
                                  <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="font-mono font-semibold tabular-nums">
                                      {formatDuration(app.seconds)}
                                    </span>
                                    <span className="text-xs text-muted-foreground tabular-nums">
                                      {share.toFixed(0)}%
                                    </span>
                                  </div>
                                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                      className="h-full rounded-full"
                                      style={{
                                        width: `${Math.max(width, 3)}%`,
                                        backgroundColor: color,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between rounded-xl border border-foreground/10 bg-secondary/50 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <HugeiconsIcon icon={Clock01Icon} size={16} />
                        Total in range
                      </div>
                      <span className="font-mono font-semibold tabular-nums">
                        {formatDuration(totalSeconds)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-3 rounded-2xl border border-foreground bg-foreground px-5 py-4 text-background sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-background text-foreground">
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {topApp
                          ? `${cleanAppName(topApp.name)} leads your screen time`
                          : "Start tracking to unlock insights"}
                      </p>
                      <p className="text-xs text-background/60">
                        {topApp
                          ? `${formatDuration(topApp.seconds)} across ${topApp.sessionCount} ${
                              topApp.sessionCount === 1 ? "session" : "sessions"
                            } in ${rangeLabel.toLowerCase()}`
                          : "Your activity will show up here automatically."}
                      </p>
                    </div>
                  </div>
                  <span className="hidden font-pixel text-2xl sm:block">
                    {topApp
                      ? `${Math.round(
                          (topApp.seconds / Math.max(totalSeconds, 1)) * 100,
                        )}%`
                      : "—"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Applications;
