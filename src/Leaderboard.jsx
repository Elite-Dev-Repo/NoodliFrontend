import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  CrownIcon,
  MedalFirstPlaceIcon,
  MedalSecondPlaceIcon,
  MedalThirdPlaceIcon,
  RefreshIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

import { Badge } from "@/components/ui/badge";
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
import { UnauthorizedError } from "@/lib/api";
import { fetchLeaderboard } from "@/lib/leaderboard";
import { formatDuration } from "@/lib/sessions";

/*
 * Podium config, indexed by rank (0 = 1st, 1 = 2nd, 2 = 3rd).
 * `order` places the cards 2nd · 1st · 3rd on desktop while keeping
 * 1st → 3rd reading order on mobile.
 */

const PODIUM = [
  {
    label: "1st place",
    icon: MedalFirstPlaceIcon,
    order: "sm:order-2",
    pedestal: "h-24 sm:h-32",

    // Gold
    card: "border-yellow-400 bg-[linear-gradient(160deg,#FFF0A6_0%,#FFD34D_55%,#FFC229_100%)]",
    pedestalBg:
      "bg-[linear-gradient(180deg,#FFC928_0%,#F5A900_55%,#D98A00_100%)] border-yellow-600/60",
    avatar: "bg-[linear-gradient(145deg,#FFD84D,#E99A00)] text-yellow-950",
    ring: "ring-yellow-400",
    glow: "bg-yellow-400/60",
    numeral: "text-yellow-950/80",
    chip: "bg-yellow-950/15 text-yellow-950",
  },
  {
    label: "2nd place",
    icon: MedalSecondPlaceIcon,
    order: "sm:order-1",
    pedestal: "h-20 sm:h-24",

    // Silver
    card: "border-slate-300 bg-[linear-gradient(160deg,#F1F5FA_0%,#D1DCE9_55%,#B9C8D9_100%)]",
    pedestalBg:
      "bg-[linear-gradient(180deg,#BFCBDA_0%,#9BAFC5_55%,#778BA3_100%)] border-slate-400/70",
    avatar: "bg-[linear-gradient(145deg,#DCE6F1,#8FA3BA)] text-slate-950",
    ring: "ring-slate-300",
    glow: "bg-slate-300/60",
    numeral: "text-slate-950/80",
    chip: "bg-slate-800/15 text-slate-800",
  },
  {
    label: "3rd place",
    icon: MedalThirdPlaceIcon,
    order: "sm:order-3",
    pedestal: "h-16 sm:h-20",

    // Bronze
    card: "border-orange-400 bg-[linear-gradient(160deg,#FFE0BD_0%,#FFB77E_55%,#F49A55_100%)]",
    pedestalBg:
      "bg-[linear-gradient(180deg,#F3A46D_0%,#D97839_55%,#AD4F20_100%)] border-orange-700/60",
    avatar: "bg-[linear-gradient(145deg,#F5AD70,#C56832)] text-orange-950",
    ring: "ring-orange-400",
    glow: "bg-orange-400/60",
    numeral: "text-orange-950/80",
    chip: "bg-orange-950/15 text-orange-950",
  },
];

const rankTextClasses = ["text-amber-600", "text-slate-500", "text-orange-700"];

const displayName = (entry) => entry?.username || "Noodli User";

const PodiumCard = ({ entry, index, isYou }) => {
  const config = PODIUM[index];
  const isFirst = index === 0;

  return (
    <div
      className={`flex min-w-0 flex-col justify-end ${config.order} ${
        isFirst ? "sm:-mt-4" : ""
      }`}
    >
      {/* Player card */}
      <div
        className={`relative flex flex-col items-center gap-2 overflow-hidden rounded-t-2xl border border-b-0 px-4 pb-5 text-center ${
          isFirst ? "pt-7" : "pt-6"
        } ${config.card}`}
      >
        {/* soft glow behind the avatar */}
        <div
          className={`pointer-events-none absolute left-1/2 top-2 size-28 -translate-x-1/2 rounded-full blur-2xl ${config.glow}`}
        />

        {isFirst && (
          <HugeiconsIcon
            icon={CrownIcon}
            size={22}
            className="relative -mb-1 text-amber-600"
          />
        )}

        <div className="relative">
          <div
            className={`flex items-center justify-center rounded-full text-xl font-semibold uppercase shadow-sm ring-4 ring-offset-2 ring-offset-transparent ${
              config.avatar
            } ${config.ring} ${isFirst ? "size-16" : "size-14"}`}
          >
            {displayName(entry).slice(0, 1)}
          </div>
          <div className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-background text-foreground shadow ring-1 ring-foreground/10">
            <HugeiconsIcon icon={config.icon} size={16} />
          </div>
        </div>

        <div className="relative mt-1 min-w-0 max-w-full">
          <p className="truncate text-base font-semibold text-foreground">
            {displayName(entry)}
          </p>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <span className="font-mono text-sm font-semibold tabular-nums text-foreground/80">
              {formatDuration(entry.total_seconds)}
            </span>
            {isYou && <Badge variant="secondary">You</Badge>}
          </div>
        </div>
      </div>

      {/* Pedestal */}
      <div
        className={`relative flex items-start justify-center rounded-b-lg border pt-2 shadow-inner ${config.pedestal} ${config.pedestalBg}`}
      >
        <span
          className={`font-pixel text-4xl leading-none sm:text-5xl ${config.numeral}`}
        >
          {index + 1}
        </span>
        <span
          className={`absolute bg-background bottom-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${config.chip}`}
        >
          {config.label}
        </span>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const { authState, profile, logout } = useProfileData();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchLeaderboard();
      setEntries(data);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setEntries([]);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authState !== "authenticated") return;
    const timer = setTimeout(loadLeaderboard, 0);
    return () => clearTimeout(timer);
  }, [authState, loadLeaderboard]);

  const currentEntry = useMemo(
    () => entries.find((entry) => entry.id === profile?.id),
    [entries, profile],
  );

  const topThree = entries.slice(0, 3);
  const maxSeconds = entries[0]?.total_seconds || 1;

  const stats = [
    {
      label: "Players",
      value: String(entries.length),
      hint: "ranked by hours",
      icon: UserGroupIcon,
    },
    {
      label: "Your rank",
      value: currentEntry ? `#${currentEntry.rank}` : "—",
      hint: currentEntry
        ? `of ${entries.length} players`
        : "start tracking to rank",
      icon: TrophyIcon,
    },
    {
      label: "Your usage",
      value: currentEntry ? formatDuration(currentEntry.total_seconds) : "—",
      hint: "total hours logged",
      icon: Clock01Icon,
    },
    {
      label: "Leader",
      value: entries[0] ? displayName(entries[0]) : "—",
      hint: entries[0]
        ? formatDuration(entries[0].total_seconds)
        : "no activity yet",
      icon: CrownIcon,
    },
  ];

  if (authState === "checking") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 animate-pulse items-center justify-center rounded-2xl bg-foreground text-background">
            <HugeiconsIcon icon={TrophyIcon} size={22} />
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
          active="leaderboard"
          profile={profile}
          onLogout={logout}
        />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex flex-col gap-5 border-b border-foreground/10  px-5 py-6 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  <HugeiconsIcon icon={TrophyIcon} size={14} />
                  Leaderboard
                </div>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Every player,{" "}
                  <span className="text-primary">ranked by hours.</span>
                </h1>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  See how your total Noodli usage stacks up against everyone
                  else on the app.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={loading}
                onClick={loadLeaderboard}
                className="rounded-full"
              >
                <HugeiconsIcon
                  icon={RefreshIcon}
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </Button>
            </div>

            {error && (
              <span className="rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                Could not sync the leaderboard: {error}
              </span>
            )}
          </header>

          <div className="flex-1 px-5 py-6 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-6">
              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <Card
                    key={stat.label}
                    className="gap-4 rounded-2xl border-foreground/10 bg-white/70 py-5 shadow-none transition-colors hover:border-foreground/20"
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
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
                        <HugeiconsIcon icon={stat.icon} size={18} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {loading ? (
                <div className="flex flex-col gap-3">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-44 animate-pulse rounded-2xl border border-foreground/10 bg-secondary/60"
                      />
                    ))}
                  </div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-16 animate-pulse rounded-2xl border border-foreground/10 bg-secondary/60"
                    />
                  ))}
                </div>
              ) : entries.length === 0 ? (
                <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-foreground/20 bg-white/50 p-10 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground text-background">
                    <HugeiconsIcon icon={TrophyIcon} size={26} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      The board is still empty
                    </h2>
                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      Usage appears here once players start tracking their
                      screen time.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Podium */}
                  <section className="rounded-3xl border border-foreground/10 bg-white px-4 pb-0 pt-8 sm:px-8">
                    <div className="mx-auto grid max-w-3xl items-end gap-3 sm:grid-cols-3 sm:gap-4">
                      {topThree.map((entry, index) => (
                        <PodiumCard
                          key={entry.id}
                          entry={entry}
                          index={index}
                          isYou={entry.id === profile?.id}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Global ranking */}
                  <Card className="gap-3 rounded-2xl border-foreground/10 bg-white/70 py-5 shadow-none">
                    <CardHeader className="px-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <CardTitle className="text-base">
                            Global ranking
                          </CardTitle>
                          <CardDescription>
                            All Noodli users ordered by total hours used
                          </CardDescription>
                        </div>
                        <div className="flex size-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                          <HugeiconsIcon icon={TrophyIcon} size={18} />
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="px-3">
                      <div className="flex items-center gap-3 border-b border-foreground/10 px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        <span className="w-8 text-center">Rank</span>
                        <span className="flex-1">Player</span>
                        <span className="w-24 text-right">Hours used</span>
                      </div>

                      <div className="mt-2 flex flex-col gap-1">
                        {entries.map((entry, index) => {
                          const isCurrentUser = entry.id === profile?.id;
                          const isTop = index < 3;
                          const width = Math.max(
                            (entry.total_seconds / maxSeconds) * 100,
                            3,
                          );

                          return (
                            <div
                              key={entry.id}
                              className={`flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors ${
                                isCurrentUser
                                  ? "bg-primary/5 ring-1 ring-inset ring-primary/20"
                                  : "hover:bg-secondary/50"
                              }`}
                            >
                              <span
                                className={`w-8 text-center font-mono text-sm font-semibold tabular-nums ${
                                  isTop
                                    ? rankTextClasses[index]
                                    : "text-muted-foreground"
                                }`}
                              >
                                {entry.rank}
                              </span>

                              <div className="flex min-w-0 flex-1 items-center gap-3">
                                <div
                                  className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold uppercase ${
                                    isTop
                                      ? `${PODIUM[index].avatar} ring-2 ${PODIUM[index].ring}`
                                      : "bg-foreground text-background"
                                  }`}
                                >
                                  {displayName(entry).slice(0, 1)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="truncate text-sm font-medium">
                                      {displayName(entry)}
                                    </p>
                                    {isCurrentUser && (
                                      <Badge variant="secondary">You</Badge>
                                    )}
                                  </div>
                                  <div className="mt-1.5 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-secondary">
                                    <div
                                      className="h-full rounded-full bg-primary transition-[width] duration-500"
                                      style={{ width: `${width}%` }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <span className="w-24 text-right font-mono text-sm font-semibold tabular-nums">
                                {formatDuration(entry.total_seconds)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Footer banner */}
              <div className="flex flex-col gap-3 rounded-2xl border border-foreground bg-foreground px-5 py-4 text-background sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-foreground">
                    <HugeiconsIcon icon={UserGroupIcon} size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {currentEntry
                        ? `You are #${currentEntry.rank} on the board`
                        : "Track your screen time to join the board"}
                    </p>
                    <p className="text-xs text-background/60">
                      Rankings use each player's total tracked hours across all
                      applications. Usernames are shown, emails stay private.
                    </p>
                  </div>
                </div>
                {currentEntry && (
                  <span className="font-pixel text-2xl">
                    {formatDuration(currentEntry.total_seconds)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
