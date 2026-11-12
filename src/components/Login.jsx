import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ComputerActivityIcon,
  ShieldCheckIcon,
} from "@hugeicons/core-free-icons";
import logo from "../assets/logo_no_bg.png";
import { Button } from "@/components/ui/button";
import { login } from "../lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password) return;

    setErrorMessage("");
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res?.success) {
      navigate("/dashboard");
    } else {
      setErrorMessage(res?.message || "Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background p-4 text-foreground">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-foreground/10 bg-white/70 shadow-sm backdrop-blur lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-foreground p-10 text-background lg:flex">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="Noodli logo"
              className="h-10 w-auto object-contain"
            />
            <span className="font-pixel text-2xl tracking-tight">
              Noodli<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="flex flex-col gap-4">
            <h1 className="font-pixel text-4xl leading-tight">
              Your screen time,
              <br />
              finally accountable.
            </h1>
            <p className="max-w-xs text-sm font-light leading-relaxed text-background/60">
              Sign in to sync every tracked session from your desktop app and
              see where your hours actually go.
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-background/50">
              <HugeiconsIcon icon={ShieldCheckIcon} size={16} />
              Private by design. Your activity stays yours.
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-background/40">
            <HugeiconsIcon icon={ComputerActivityIcon} size={14} />
            Noodli for Windows
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 p-8 sm:p-12">
          <div className="lg:hidden">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={logo}
                alt="Noodli logo"
                className="h-9 w-auto object-contain"
              />
              <span className="font-pixel text-xl tracking-tight">
                Noodli<span className="text-primary">.</span>
              </span>
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back<span className="text-primary">.</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in with your Noodli account to view your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-xl border border-foreground/15 bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Password
                <Link
                  to="/forgot-password"
                  className="normal-case tracking-normal text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="h-11 rounded-xl border border-foreground/15 bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
              />
            </label>

            {errorMessage && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-xl"
            >
              {isLoading ? "Signing in..." : "Sign in"}
              {!isLoading && (
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              )}
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-foreground/10" />
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              or
            </span>
            <span className="h-px flex-1 bg-foreground/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
