import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Clock01Icon,
  ComputerActivityIcon,
  FireIcon,
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PRIMARY = "#0f52ff";

const weeklyData = [
  { day: "Mon", minutes: 142 },
  { day: "Tue", minutes: 185 },
  { day: "Wed", minutes: 160 },
  { day: "Thu", minutes: 210 },
  { day: "Fri", minutes: 175 },
  { day: "Sat", minutes: 96 },
  { day: "Sun", minutes: 120 },
];

const appData = [
  { name: "VS Code", minutes: 186, color: "#0f52ff" },
  { name: "Chrome", minutes: 96, color: "#f97316" },
  { name: "Figma", minutes: 74, color: "#0d9488" },
  { name: "Slack", minutes: 42, color: "#e11d48" },
];

const focusData = [
  { name: "Deep work", value: 65, color: "#0f52ff" },
  { name: "Browsing", value: 22, color: "#f97316" },
  { name: "Other", value: 13, color: "#0d9488" },
];

const stats = [
  {
    label: "Today",
    value: "4h 32m",
    icon: Clock01Icon,
  },
  {
    label: "Top app",
    value: "VS Code",
    icon: ComputerActivityIcon,
  },
  {
    label: "Focus score",
    value: "82%",
    icon: FireIcon,
  },
];

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--card-foreground)",
  fontSize: 12,
  padding: "6px 10px",
};

const MiniDashboard = () => {
  return (
    <div className="min-w-0 max-w-full overflow-hidden border border-foreground/10 bg-background shadow-2xl">
      <div className="flex items-center justify-between border-b border-foreground/10 bg-secondary/70 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">
          Noodli dashboard
        </span>
        <span className="hidden text-[10px] text-muted-foreground sm:block">
          Live preview
        </span>
      </div>

      <div className="grid min-w-0 gap-3 p-3 sm:gap-4 sm:p-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
          <div className="grid min-w-0 grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-xl border border-foreground/10 bg-card px-2.5 py-2 sm:px-3 sm:py-2.5"
              >
                <div className="flex items-center justify-between gap-1 text-primary">
                  <p className="text-[9px] font-medium uppercase tracking-wider sm:text-[10px]">
                    {stat.label}
                  </p>
                  <HugeiconsIcon icon={stat.icon} size={12} />
                </div>
                <p className="mt-1 truncate text-sm font-semibold tracking-tight sm:text-base">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="min-w-0 rounded-xl border border-foreground/10 bg-card p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium sm:text-sm">
                  Activity this week
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Tracked minutes per day
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={12} />
                18%
              </span>
            </div>

            <div className="mt-3 h-28 w-full min-w-0 sm:h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyData}
                  margin={{ top: 5, right: 4, left: -28, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="miniFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={PRIMARY}
                        stopOpacity={0.35}
                      />
                      <stop offset="95%" stopColor={PRIMARY} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="4 4" />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: "var(--muted-foreground)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    stroke={PRIMARY}
                    strokeWidth={2}
                    fill="url(#miniFill)"
                    name="Minutes"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
          <div className="min-w-0 rounded-xl border border-foreground/10 bg-card p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium sm:text-sm">Top apps</p>
              <span className="text-[10px] text-muted-foreground">
                This week
              </span>
            </div>

            <div className="mt-2 h-28 w-full min-w-0 sm:h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={appData}
                  layout="vertical"
                  margin={{ top: 4, right: 8, left: -8, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    width={56}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                    contentStyle={tooltipStyle}
                  />
                  <Bar
                    dataKey="minutes"
                    name="Minutes"
                    radius={[0, 6, 6, 0]}
                    barSize={12}
                  >
                    {appData.map((app) => (
                      <Cell key={app.name} fill={app.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="min-w-0 rounded-xl border border-foreground/10 bg-card p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium sm:text-sm">Focus balance</p>
              <span className="text-[10px] text-muted-foreground">Today</span>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <div className="h-20 w-20 shrink-0 sm:h-24 sm:w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={focusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="62%"
                      outerRadius="100%"
                      paddingAngle={3}
                      stroke="none"
                    >
                      {focusData.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex min-w-0 flex-col gap-1.5">
                {focusData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3 text-[10px] sm:text-xs"
                  >
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="truncate text-muted-foreground">
                        {item.name}
                      </span>
                    </span>
                    <span className="font-mono font-medium tabular-nums">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniDashboard;
