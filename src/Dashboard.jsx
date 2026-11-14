import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Analytics01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  ChartLineData02Icon,
  Clock01Icon,
  ComputerActivityIcon,
  DashboardSquare01Icon,
  FireIcon,
  PieChartIcon,
  RefreshIcon,
  Timer01Icon,
} from "@hugeicons/core-free-icons";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useProfileData } from "@/hooks/useProfileData";
import {
  APP_COLORS,
  RANGES,
  appTotalsFromSessions,
  filterSessionsByRange,
  formatDayLabel,
  formatDuration,
} from "@/lib/sessions";

const PRIMARY_CHART_COLOR = "#0f52ff";

const Dashboard = () => {
  const { sessions, loading, error, authState, profile, loadData, logout } =
    useProfileData();
  const [range, setRange] = useState("7d");

  const filtered = useMemo(
    () => filterSessionsByRange(sessions, range),
    [sessions, range],
  );

  const totalSeconds = useMemo(
    () => filtered.reduce((sum, session) => sum + session.seconds, 0),
    [filtered],
  );

  const appTotals = useMemo(
    () => appTotalsFromSessions(filtered),
    [filtered],
  );

  const dailyData = useMemo(() => {
    const map = new Map();
    filtered.forEach((session) => {
      map.set(session.date, (map.get(session.date) || 0) + session.seconds);
    });
    return [...map.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, seconds]) => ({
        date,
        label: formatDayLabel(date),
        minutes: Math.round(seconds / 60),
      }));
  }, [filtered]);

  const topApps = useMemo(() => appTotals.slice(0, 6), [appTotals]);

  const barData = useMemo(
    () =>
      topApps.map((app) => ({
        name: app.name.replace(/\.exe$/i, ""),
        minutes: Math.round(app.seconds / 60),
        seconds: app.seconds,
      })),
    [topApps],
  );

  const pieData = useMemo(() => {
    if (!appTotals.length) return [];
    const head = appTotals.slice(0, 5);
    const rest = appTotals.slice(5);
    const restSeconds = rest.reduce((sum, app) => sum + app.seconds, 0);
    const data = head.map((app) => ({
      name: app.name.replace(/\.exe$/i, ""),
      value: app.seconds,
    }));
    if (restSeconds > 0) data.push({ name: "Other", value: restSeconds });
    return data;
  }, [appTotals]);

  const activeDays = useMemo(
    () => new Set(filtered.map((session) => session.date)).size,
    [filtered],
  );

  const dailyAverage = activeDays ? totalSeconds / activeDays : 0;
  const topApp = appTotals[0];

  const trendConfig = {
    minutes: { label: "Minutes", color: PRIMARY_CHART_COLOR },
  };

  const barConfig = {
    minutes: { label: "Time", color: PRIMARY_CHART_COLOR },
  };

  const pieConfig = useMemo(() => {
    const config = {};
    pieData.forEach((item, index) => {
      config[item.name] = {
        label: item.name,
        color: APP_COLORS[index % APP_COLORS.length],
      };
    });
    return config;
  }, [pieData]);

  const rangeLabel =
    RANGES.find((item) => item.key === range)?.label || "7 days";

  const stats = [
    {
      label: "Total tracked",
      value: formatDuration(totalSeconds),
      hint: `${activeDays} active ${activeDays === 1 ? "day" : "days"}`,
      icon: Clock01Icon,
    },
    {
      label: "Daily average",
      value: formatDuration(dailyAverage),
      hint: "per active day",
      icon: Timer01Icon,
    },
    {
      label: "Apps tracked",
      value: String(appTotals.length),
      hint: "distinct applications",
      icon: ComputerActivityIcon,
    },
    {
      label: "Most used app",
      value: topApp ? formatDuration(topApp.seconds) : "—",
      hint: topApp ? topApp.name.replace(/\.exe$/i, "") : "no activity yet",
      icon: FireIcon,
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
          active="dashboard"
          profile={profile}
          onLogout={logout}
        />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex flex-col gap-5 border-b border-foreground/10 px-5 py-6 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  <HugeiconsIcon icon={DashboardSquare01Icon} size={14} />
                  Dashboard
                </div>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Your focus, in{" "}
                  <span className="text-primary">numbers.</span>
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Live data synced from your Noodli desktop app.
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
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-32 animate-pulse rounded-2xl border border-foreground/10 bg-secondary/60"
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-foreground/20 bg-white/50 p-10 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground text-background">
                  <HugeiconsIcon icon={ComputerActivityIcon} size={26} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">No activity yet</h2>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Start tracking on your desktop and your app usage will
                    appear here within seconds.
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

                <div className="grid gap-4 lg:grid-cols-3">
                  <Card className="gap-3 rounded-2xl border-foreground/10 py-5 shadow-none lg:col-span-2">
                    <CardHeader className="px-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">
                            Activity over time
                          </CardTitle>
                          <CardDescription>
                            Daily tracked minutes for {rangeLabel.toLowerCase()}
                          </CardDescription>
                        </div>
                        <HugeiconsIcon
                          icon={ChartLineData02Icon}
                          size={20}
                          className="text-muted-foreground"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="px-2">
                      <ChartContainer
                        config={trendConfig}
                        className="h-[260px] w-full"
                      >
                        <AreaChart
                          data={dailyData}
                          margin={{ left: 4, right: 12, top: 8 }}
                        >
                          <defs>
                            <linearGradient
                              id="fillMinutes"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor={PRIMARY_CHART_COLOR}
                                stopOpacity={0.35}
                              />
                              <stop
                                offset="95%"
                                stopColor={PRIMARY_CHART_COLOR}
                                stopOpacity={0.5}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            vertical={false}
                            strokeDasharray="4 4"
                          />
                          <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={16}
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            width={44}
                            tickFormatter={(value) => `${value}m`}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={
                              <ChartTooltipContent
                                indicator="line"
                                labelFormatter={(value) => value}
                              />
                            }
                          />
                          <Area
                            dataKey="minutes"
                            type="monotone"
                            fill="url(#fillMinutes)"
                            stroke={PRIMARY_CHART_COLOR}
                            strokeWidth={2.5}
                            dot={
                              dailyData.length <= 7
                                ? {
                                    r: 3,
                                    fill: PRIMARY_CHART_COLOR,
                                    strokeWidth: 0,
                                  }
                                : false
                            }
                            activeDot={{ r: 5, fill: PRIMARY_CHART_COLOR }}
                          />
                        </AreaChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="gap-3 rounded-2xl border-foreground/10 py-5 shadow-none">
                    <CardHeader className="px-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">
                            App distribution
                          </CardTitle>
                          <CardDescription>
                            Share of total screen time
                          </CardDescription>
                        </div>
                        <HugeiconsIcon
                          icon={PieChartIcon}
                          size={20}
                          className="text-muted-foreground"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="px-2">
                      <ChartContainer
                        config={pieConfig}
                        className="mx-auto h-[260px] w-full"
                      >
                        <PieChart>
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                hideLabel
                                nameKey="name"
                                formatter={(value, name) => (
                                  <div className="flex w-full items-center justify-between gap-3">
                                    <span className="text-muted-foreground">
                                      {name}
                                    </span>
                                    <span className="font-mono font-medium tabular-nums">
                                      {formatDuration(value)}
                                    </span>
                                  </div>
                                )}
                              />
                            }
                          />
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={2}
                            strokeWidth={2}
                          >
                            {pieData.map((entry, index) => (
                              <Cell
                                key={entry.name}
                                fill={APP_COLORS[index % APP_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            className="flex-wrap"
                          />
                        </PieChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <Card className="gap-3 rounded-2xl border-foreground/10 py-5 shadow-none">
                    <CardHeader className="px-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">
                            Top applications
                          </CardTitle>
                          <CardDescription>
                            Time spent per app, highest first
                          </CardDescription>
                        </div>
                        <HugeiconsIcon
                          icon={Timer01Icon}
                          size={20}
                          className="text-muted-foreground"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="px-2">
                      <ChartContainer
                        config={barConfig}
                        className="h-[280px] w-full"
                      >
                        <BarChart
                          data={barData}
                          layout="vertical"
                          margin={{ left: 8, right: 16 }}
                        >
                          <CartesianGrid
                            horizontal={false}
                            strokeDasharray="4 4"
                          />
                          <XAxis
                            type="number"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={6}
                            tickFormatter={(value) => `${value}m`}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            width={96}
                            tick={{ fontSize: 12 }}
                          />
                          <ChartTooltip
                            cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                            content={
                              <ChartTooltipContent
                                hideLabel
                                hideIndicator
                                formatter={(value, name, item) => (
                                  <div className="flex w-full items-center justify-between gap-3">
                                    <span className="text-muted-foreground">
                                      {name}
                                    </span>
                                    <span className="font-mono font-medium tabular-nums">
                                      {formatDuration(
                                        item?.payload?.seconds ?? value * 60,
                                      )}
                                    </span>
                                  </div>
                                )}
                              />
                            }
                          />
                          <Bar
                            dataKey="minutes"
                            fill={PRIMARY_CHART_COLOR}
                            radius={[0, 8, 8, 0]}
                            barSize={22}
                          />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="gap-3 rounded-2xl border-foreground/10 py-5 shadow-none">
                    <CardHeader className="px-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">
                            App breakdown
                          </CardTitle>
                          <CardDescription>
                            Every application in this period
                          </CardDescription>
                        </div>
                        <HugeiconsIcon
                          icon={Analytics01Icon}
                          size={20}
                          className="text-muted-foreground"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="px-5">
                      <div className="flex max-h-[280px] flex-col gap-4 overflow-y-auto pr-1">
                        {appTotals.slice(0, 8).map((app, index) => {
                          const share = totalSeconds
                            ? (app.seconds / totalSeconds) * 100
                            : 0;
                          const width = appTotals[0]
                            ? (app.seconds / appTotals[0].seconds) * 100
                            : 0;

                          return (
                            <div
                              key={app.name}
                              className="flex flex-col gap-1.5"
                            >
                              <div className="flex items-center justify-between gap-3 text-sm">
                                <div className="flex min-w-0 items-center gap-2">
                                  <span
                                    className="size-2.5 shrink-0 rounded-full"
                                    style={{
                                      backgroundColor:
                                        APP_COLORS[index % APP_COLORS.length],
                                    }}
                                  />
                                  <span className="truncate font-medium">
                                    {app.name.replace(/\.exe$/i, "")}
                                  </span>
                                </div>
                                <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                                  {formatDuration(app.seconds)} ·{" "}
                                  {share.toFixed(0)}%
                                </span>
                              </div>
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${Math.max(width, 3)}%`,
                                    backgroundColor:
                                      APP_COLORS[index % APP_COLORS.length],
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

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
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-foreground bg-foreground px-5 py-4 text-background">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-background text-foreground">
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {topApp
                          ? `${topApp.name.replace(/\.exe$/i, "")} leads your screen time`
                          : "Start tracking to unlock insights"}
                      </p>
                      <p className="text-xs text-background/60">
                        {topApp
                          ? `${formatDuration(topApp.seconds)} logged in ${rangeLabel.toLowerCase()}`
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

export default Dashboard;
