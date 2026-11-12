export const RANGES = [
  { key: "today", label: "Today", days: 1 },
  { key: "3d", label: "3 days", days: 3 },
  { key: "7d", label: "7 days", days: 7 },
  { key: "30d", label: "30 days", days: 30 },
  { key: "all", label: "All time", days: null },
];

export const APP_COLORS = ["#0f52ff", "#f97316", "#0d9488", "#e11d48", "#db2777"];

export const cleanAppName = (name) => String(name || "").replace(/\.exe$/i, "");

export const dayKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export const dateFromKey = (key) => new Date(`${key}T00:00:00`);

export const formatDuration = (seconds) => {
  const total = Math.max(0, Math.round(seconds || 0));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  if (m) return `${m}m`;
  return `${s}s`;
};

export const formatDayLabel = (key) =>
  dateFromKey(key).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

export const formatDateLabel = (key) =>
  dateFromKey(key).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const getStartKey = (rangeKey) => {
  const range = RANGES.find((r) => r.key === rangeKey);
  if (!range?.days) return null;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (range.days - 1));
  return dayKey(start);
};

export const normalizeSessions = (data) => {
  const list = Array.isArray(data) ? data : [];

  return list
    .map((item) => {
      const name = item.name;
      const rawDate = item.date;
      const seconds = Number(item.seconds_used ?? 0);
      if (!name || !rawDate || Number.isNaN(seconds)) return null;
      return {
        name,
        date: String(rawDate).slice(0, 10),
        seconds,
      };
    })
    .filter(Boolean);
};

export const filterSessionsByRange = (sessions, rangeKey) => {
  const start = getStartKey(rangeKey);
  if (!start) return sessions;
  return sessions.filter((session) => session.date >= start);
};

export const appTotalsFromSessions = (sessions) => {
  const map = new Map();

  sessions.forEach((session) => {
    const entry =
      map.get(session.name) || {
        name: session.name,
        seconds: 0,
        sessionCount: 0,
        dates: new Set(),
      };

    entry.seconds += session.seconds;
    entry.sessionCount += 1;
    entry.dates.add(session.date);
    map.set(session.name, entry);
  });

  return [...map.values()]
    .map((entry) => {
      const dates = [...entry.dates].sort();
      return {
        name: entry.name,
        seconds: entry.seconds,
        sessionCount: entry.sessionCount,
        activeDays: dates.length,
        firstUsed: dates[0],
        lastUsed: dates[dates.length - 1],
      };
    })
    .sort((a, b) => b.seconds - a.seconds);
};
