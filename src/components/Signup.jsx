import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ComputerActivityIcon,
  ShieldCheckIcon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import logo from "../assets/logo_no_bg.png";
import { Button } from "@/components/ui/button";
import { register } from "../lib/api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage("Fill in every field to create your account.");
      return;
    }

    if (username.trim().length < 3) {
      setErrorMessage("Username must be at least 3 characters.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const res = await register({
      username: username.trim(),
      email: email.trim(),
      password,
      password2: confirmPassword,
    });

    setIsLoading(false);

    if (res?.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setErrorMessage(
        res?.message || "Failed to create your account. Please try again.",
      );
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
              Start owning
              <br />
              your time.
            </h1>
            <p className="max-w-xs text-sm font-light leading-relaxed text-background/60">
              Create your free Noodli account, connect the Windows tracker, and
              see exactly where your screen time goes.
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
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
              <HugeiconsIcon icon={UserAdd01Icon} size={14} />
              Create account
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Get started with Noodli<span className="text-primary">.</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Free to use. No credit card, no desktop setup required yet.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Username
              </span>
              <input
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="your-username"
                className="h-11 rounded-xl border border-foreground/15 bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
              />
            </label>

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

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Password
                </span>
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  className="h-11 rounded-xl border border-foreground/15 bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Confirm password
                </span>
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat password"
                  className="h-11 rounded-xl border border-foreground/15 bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                />
              </label>
            </div>

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
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && (
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/auth"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
