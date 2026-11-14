import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Calendar03Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  ComputerActivityIcon,
  Delete02Icon,
  Edit02Icon,
  Mail01Icon,
  Notification01Icon,
  PauseCircleIcon,
  PlayCircleIcon,
  RefreshIcon,
  Target01Icon,
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
import {
  createGoal,
  deleteGoal,
  fetchGoals,
  updateGoal,
} from "@/lib/goals";
import {
  appTotalsFromSessions,
  cleanAppName,
  formatDuration,
} from "@/lib/sessions";

const EMPTY_FORM = {
  title: "",
  metric: "total_time",
  app_name: "",
  period: "daily",
  goal_type: "limit",
  target_minutes: 60,
  email_notifications: true,
  is_active: true,
};

const METRICS = [
  { value: "total_time", label: "All apps" },
  { value: "app_time", label: "One app" },
];

const PERIODS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

const GOAL_TYPES = [
  { value: "limit", label: "Stay under a limit" },
  { value: "achieve", label: "Reach a target" },
];

const fieldClass =
  "h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10";

const labelClass =
  "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground";

const Goals = () => {
  const { sessions, authState, profile, logout } = useProfileData();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadGoals = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchGoals();
      setGoals(data);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setGoals([]);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authState !== "authenticated") return;
    const timer = setTimeout(loadGoals, 0);
    return () => clearTimeout(timer);
  }, [authState, loadGoals]);

  const appOptions = useMemo(() => {
    const names = appTotalsFromSessions(sessions).map((app) =>
      cleanAppName(app.name),
    );
    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
  }, [sessions]);

  const stats = useMemo(() => {
    const active = goals.filter((goal) => goal.is_active);
    const met = active.filter((goal) => goal.goal_met);
    const emailing = active.filter((goal) => goal.email_notifications);
    return [
      {
        label: "Total goals",
        value: String(goals.length),
        hint: `${active.length} active`,
        icon: Target01Icon,
      },
      {
        label: "Goals met",
        value: String(met.length),
        hint: "in the current period",
        icon: CheckmarkCircle02Icon,
      },
      {
        label: "Email alerts",
        value: String(emailing.length),
        hint: "automatic notifications",
        icon: Mail01Icon,
      },
      {
        label: "Apps available",
        value: String(appOptions.length),
        hint: "from tracked activity",
        icon: ComputerActivityIcon,
      },
    ];
  }, [goals, appOptions]);

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (goal) => {
    setEditingId(goal.id);
    setForm({
      title: goal.title,
      metric: goal.metric,
      app_name: goal.app_name || "",
      period: goal.period,
      goal_type: goal.goal_type,
      target_minutes: goal.target_minutes,
      email_notifications: goal.email_notifications,
      is_active: goal.is_active,
    });
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setFormError("Give your goal a name.");
      return;
    }

    if (form.metric === "app_time" && !form.app_name.trim()) {
      setFormError("Choose an app for this goal.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      metric: form.metric,
      app_name:
        form.metric === "app_time" ? form.app_name.trim() : "",
      period: form.period,
      goal_type: form.goal_type,
      target_minutes: Math.max(1, Number(form.target_minutes) || 1),
      email_notifications: form.email_notifications,
      is_active: form.is_active,
    };

    setSaving(true);
    setFormError("");

    const result = editingId
      ? await updateGoal(editingId, payload)
      : await createGoal(payload);

    setSaving(false);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setGoals((prev) =>
      editingId
        ? prev.map((goal) => (goal.id === editingId ? result.goal : goal))
        : [result.goal, ...prev],
    );
    closeForm();
  };

  const handleToggle = async (goal) => {
    setBusyId(goal.id);
    setError("");
    const result = await updateGoal(goal.id, { is_active: !goal.is_active });
    setBusyId(null);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setGoals((prev) =>
      prev.map((item) => (item.id === goal.id ? result.goal : item)),
    );
  };

  const handleDelete = async (goal) => {
    if (!window.confirm(`Delete "${goal.title}"?`)) return;

    setBusyId(goal.id);
    setError("");
    const result = await deleteGoal(goal.id);
    setBusyId(null);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setGoals((prev) => prev.filter((item) => item.id !== goal.id));
  };

  if (authState === "checking") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 animate-pulse items-center justify-center rounded-2xl bg-foreground text-background">
            <HugeiconsIcon icon={Target01Icon} size={22} />
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
        <DashboardSidebar active="goals" profile={profile} onLogout={logout} />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="flex flex-col gap-5 border-b border-foreground/10 px-5 py-6 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  <HugeiconsIcon icon={Target01Icon} size={14} />
                  Goals
                </div>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Set the bar,{" "}
                  <span className="text-primary">then clear it.</span>
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Track daily or weekly screen time goals. Noodli emails you
                  automatically when a goal is met.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={loadGoals}
                >
                  <HugeiconsIcon icon={RefreshIcon} size={15} />
                  Refresh
                </Button>
                <Button size="sm" onClick={openCreate}>
                  <HugeiconsIcon icon={Add01Icon} size={15} />
                  New goal
                </Button>
              </div>
            </div>

            {error && (
              <span className="text-xs text-destructive">
                Could not sync goals: {error}
              </span>
            )}
          </header>

          <div className="flex-1 px-5 py-6 sm:px-8 lg:px-10">
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

              {showForm && (
                <Card className="gap-4 rounded-2xl border-foreground/10 py-5 shadow-none">
                  <CardHeader className="flex-row items-start justify-between px-5">
                    <div>
                      <CardTitle className="text-base">
                        {editingId ? "Edit goal" : "Create a goal"}
                      </CardTitle>
                      <CardDescription>
                        Choose what to track, the period, and when Noodli should
                        email you.
                      </CardDescription>
                    </div>
                    <button
                      type="button"
                      onClick={closeForm}
                      aria-label="Close goal form"
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-foreground/15 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={16} />
                    </button>
                  </CardHeader>

                  <CardContent className="px-5">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-1.5">
                          <span className={labelClass}>Goal name</span>
                          <input
                            type="text"
                            value={form.title}
                            onChange={(event) =>
                              updateField("title", event.target.value)
                            }
                            placeholder="e.g. Keep Instagram under 30m"
                            className={fieldClass}
                          />
                        </label>

                        <label className="flex flex-col gap-1.5">
                          <span className={labelClass}>Period</span>
                          <select
                            value={form.period}
                            onChange={(event) =>
                              updateField("period", event.target.value)
                            }
                            className={`${fieldClass} cursor-pointer`}
                          >
                            {PERIODS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="flex flex-col gap-1.5">
                          <span className={labelClass}>Track</span>
                          <select
                            value={form.metric}
                            onChange={(event) =>
                              updateField("metric", event.target.value)
                            }
                            className={`${fieldClass} cursor-pointer`}
                          >
                            {METRICS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        {form.metric === "app_time" ? (
                          <label className="flex flex-col gap-1.5">
                            <span className={labelClass}>Application</span>
                            <input
                              type="text"
                              list="goal-app-options"
                              value={form.app_name}
                              onChange={(event) =>
                                updateField("app_name", event.target.value)
                              }
                              placeholder="e.g. Instagram"
                              className={fieldClass}
                            />
                            <datalist id="goal-app-options">
                              {appOptions.map((name) => (
                                <option key={name} value={name} />
                              ))}
                            </datalist>
                          </label>
                        ) : (
                          <label className="flex flex-col gap-1.5">
                            <span className={labelClass}>Goal type</span>
                            <select
                              value={form.goal_type}
                              onChange={(event) =>
                                updateField("goal_type", event.target.value)
                              }
                              className={`${fieldClass} cursor-pointer`}
                            >
                              {GOAL_TYPES.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}

                        <label className="flex flex-col gap-1.5">
                          <span className={labelClass}>Target (minutes)</span>
                          <input
                            type="number"
                            min="1"
                            step="5"
                            value={form.target_minutes}
                            onChange={(event) =>
                              updateField("target_minutes", event.target.value)
                            }
                            className={fieldClass}
                          />
                        </label>

                        {form.metric === "app_time" && (
                          <label className="flex flex-col gap-1.5">
                            <span className={labelClass}>Goal type</span>
                            <select
                              value={form.goal_type}
                              onChange={(event) =>
                                updateField("goal_type", event.target.value)
                              }
                              className={`${fieldClass} cursor-pointer`}
                            >
                              {GOAL_TYPES.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 rounded-xl border border-foreground/10 bg-secondary/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <label className="flex items-center gap-3 text-sm">
                          <input
                            type="checkbox"
                            checked={form.email_notifications}
                            onChange={(event) =>
                              updateField(
                                "email_notifications",
                                event.target.checked,
                              )
                            }
                            className="size-4 accent-[#0f52ff]"
                          />
                          <span className="flex items-center gap-2">
                            <HugeiconsIcon
                              icon={Mail01Icon}
                              size={16}
                              className="text-muted-foreground"
                            />
                            Email me automatically when this goal is met
                          </span>
                        </label>

                        <label className="flex items-center gap-3 text-sm">
                          <input
                            type="checkbox"
                            checked={form.is_active}
                            onChange={(event) =>
                              updateField("is_active", event.target.checked)
                            }
                            className="size-4 accent-[#0f52ff]"
                          />
                          Goal is active
                        </label>
                      </div>

                      {formError && (
                        <p className="text-sm text-destructive">{formError}</p>
                      )}

                      <div className="flex items-center justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={closeForm}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" size="sm" disabled={saving}>
                          {saving
                            ? "Saving..."
                            : editingId
                              ? "Save changes"
                              : "Create goal"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-52 animate-pulse rounded-2xl border border-foreground/10 bg-secondary/60"
                    />
                  ))}
                </div>
              ) : goals.length === 0 ? (
                <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-foreground/20 bg-white/50 p-10 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-foreground text-background">
                    <HugeiconsIcon icon={Target01Icon} size={26} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">No goals yet</h2>
                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      Create your first goal to keep your screen time in check.
                      We will email you automatically when it is met.
                    </p>
                  </div>
                  <Button size="sm" onClick={openCreate}>
                    <HugeiconsIcon icon={Add01Icon} size={15} />
                    Create a goal
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {goals.map((goal) => {
                    const percent = Math.min(
                      Number(goal.progress_percent) || 0,
                      100,
                    );
                    const remaining = Math.max(
                      goal.target_seconds - goal.progress_seconds,
                      0,
                    );
                    const over = Math.max(
                      goal.progress_seconds - goal.target_seconds,
                      0,
                    );
                    const busy = busyId === goal.id;

                    return (
                      <Card
                        key={goal.id}
                        className="gap-4 rounded-2xl border-foreground/10 py-5 shadow-none"
                      >
                        <CardHeader className="px-5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <CardTitle className="truncate text-base">
                                {goal.title}
                              </CardTitle>
                              <CardDescription className="mt-1 flex flex-wrap items-center gap-1.5">
                                <span className="inline-flex items-center gap-1">
                                  <HugeiconsIcon
                                    icon={
                                      goal.metric === "app_time"
                                        ? ComputerActivityIcon
                                        : Clock01Icon
                                    }
                                    size={12}
                                  />
                                  {goal.metric === "app_time"
                                    ? cleanAppName(goal.app_name)
                                    : "All apps"}
                                </span>
                                <span aria-hidden="true">&middot;</span>
                                <span className="inline-flex items-center gap-1">
                                  <HugeiconsIcon
                                    icon={Calendar03Icon}
                                    size={12}
                                  />
                                  {goal.period === "weekly"
                                    ? "Weekly"
                                    : "Daily"}
                                </span>
                              </CardDescription>
                            </div>

                            <div className="flex shrink-0 flex-col items-end gap-2">
                              {!goal.is_active ? (
                                <Badge variant="secondary">
                                  <HugeiconsIcon
                                    icon={PauseCircleIcon}
                                    size={12}
                                  />
                                  Paused
                                </Badge>
                              ) : goal.goal_met ? (
                                <Badge className="border-transparent bg-emerald-500 text-white">
                                  <HugeiconsIcon
                                    icon={CheckmarkCircle02Icon}
                                    size={12}
                                  />
                                  Met
                                </Badge>
                              ) : (
                                <Badge variant="outline">
                                  <HugeiconsIcon
                                    icon={Notification01Icon}
                                    size={12}
                                  />
                                  In progress
                                </Badge>
                              )}

                              {goal.email_notifications && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                  <HugeiconsIcon icon={Mail01Icon} size={12} />
                                  Email on
                                </span>
                              )}
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="px-5">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="font-mono font-semibold tabular-nums">
                              {formatDuration(goal.progress_seconds)}
                            </span>
                            <span className="text-xs text-muted-foreground tabular-nums">
                              of {formatDuration(goal.target_seconds)}
                            </span>
                          </div>

                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                              className={`h-full rounded-full transition-all ${
                                goal.goal_met
                                  ? "bg-emerald-500"
                                  : "bg-primary"
                              }`}
                              style={{ width: `${Math.max(percent, 3)}%` }}
                            />
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                            <span>{percent.toFixed(0)}% of goal</span>
                            <span>
                              {goal.goal_met
                                ? goal.goal_type === "limit"
                                  ? over > 0
                                    ? `${formatDuration(over)} over`
                                    : "Limit reached"
                                  : "Target achieved"
                                : `${formatDuration(
                                    remaining,
                                  )} to ${
                                    goal.goal_type === "limit"
                                      ? "limit"
                                      : "target"
                                  }`}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-2 border-t border-foreground/10 pt-3">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEdit(goal)}
                              >
                                <HugeiconsIcon icon={Edit02Icon} size={14} />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={busy}
                                onClick={() => handleToggle(goal)}
                              >
                                <HugeiconsIcon
                                  icon={
                                    goal.is_active
                                      ? PauseCircleIcon
                                      : PlayCircleIcon
                                  }
                                  size={14}
                                />
                                {goal.is_active ? "Pause" : "Resume"}
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={busy}
                              onClick={() => handleDelete(goal)}
                              aria-label={`Delete ${goal.title}`}
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              <HugeiconsIcon icon={Delete02Icon} size={16} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-col gap-3 rounded-2xl border border-foreground bg-foreground px-5 py-4 text-background sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-background text-foreground">
                    <HugeiconsIcon icon={Mail01Icon} size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Automatic email alerts
                    </p>
                    <p className="text-xs text-background/60">
                      Every time your usage syncs, Noodli checks your active
                      goals and sends one email per period when a goal is met.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Goals;
