import { Navigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";

import DashboardSidebar from "@/components/DashboardSidebar";
import { useProfileData } from "@/hooks/useProfileData";

const ComingSoon = ({ section, label, icon: Icon }) => {
  const { authState, profile, logout } = useProfileData();

  if (authState === "checking") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">Loading...</p>
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
          active={section}
          profile={profile}
          onLogout={logout}
        />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <header className="border-b border-foreground/10 px-5 py-6 sm:px-8 lg:px-10">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
              <HugeiconsIcon icon={Icon} size={14} />
              {label}
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              {label}
            </h1>
          </header>

          <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <HugeiconsIcon icon={Icon} size={26} />
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Coming soon
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComingSoon;
