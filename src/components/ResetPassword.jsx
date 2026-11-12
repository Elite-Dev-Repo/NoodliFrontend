import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ComputerActivityIcon,
  ShieldCheckIcon,
} from "@hugeicons/core-free-icons";
import logo from "../assets/logo_no_bg.png";
import { Button } from "@/components/ui/button";
import { confirmPasswordReset, resetPassword } from "@/lib/api";

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const [status, setStatus] = useState("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const verifyLink = async () => {
      const res = await confirmPasswordReset(uidb64, token);
      if (!active) return;

      if (res?.success) {
        setStatus("ready");
      } else {
        setErrorMessage(
          res?.message || "This reset link is invalid or has expired.",
        );
        setStatus("invalid");
      }
    };

    verifyLink();
    return () => {
      active = false;
    };
  }, [uidb64, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const res = await resetPassword({ uidb64, token, new_password: password });
    setIsLoading(false);

    if (res?.success) {
      setStatus("success");
    } else {
      setErrorMessage(res?.message || "Unable to reset your password.");
    }
  };

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-md rounded-3xl border border-foreground/10 bg-white/70 p-8 shadow-sm backdrop-blur sm:p-10">
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

        <div className="mt-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
            <HugeiconsIcon icon={ComputerActivityIcon} size={14} />
            Password recovery
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Choose a new password
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Set a new password for your Noodli account.
          </p>
        </div>

        {status === "checking" && (
          <p className="mt-6 text-sm text-muted-foreground">
            Checking your reset link...
          </p>
        )}

        {status === "invalid" && (
          <div className="mt-6 flex flex-col gap-4">
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
              {errorMessage}
            </p>
            <Button asChild className="h-11 w-full rounded-xl">
              <Link to="/forgot-password">Request a new link</Link>
            </Button>
          </div>
        )}

        {status === "success" && (
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-foreground/10 bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
              <HugeiconsIcon icon={ShieldCheckIcon} size={16} />
              Your password has been changed successfully.
            </div>
            <Button asChild className="h-11 w-full rounded-xl">
              <Link to="/auth">Sign in with your new password</Link>
            </Button>
          </div>
        )}

        {status === "ready" && (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                New password
              </span>
              <input
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
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
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
              {isLoading ? "Updating..." : "Update password"}
              {!isLoading && (
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              )}
            </Button>
          </form>
        )}

        <Link
          to="/auth"
          className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
