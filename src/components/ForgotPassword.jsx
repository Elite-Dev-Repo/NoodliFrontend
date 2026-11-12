import { useState } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ComputerActivityIcon,
} from "@hugeicons/core-free-icons";
import logo from "../assets/logo_no_bg.png";
import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/lib/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    setErrorMessage("");
    setMessage("");
    setIsLoading(true);

    const res = await requestPasswordReset(email.trim());
    setIsLoading(false);

    if (res?.success) {
      setMessage(
        res.message ||
          "If an account with that email exists, a reset link is on its way.",
      );
    } else {
      setErrorMessage(res?.message || "Unable to send the reset email.");
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
            Forgot password?
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter the email linked to your Noodli account and we&rsquo;ll send
            you a reset link.
          </p>
        </div>

        {message ? (
          <div className="mt-6 rounded-xl border border-foreground/10 bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
              {isLoading ? "Sending..." : "Send reset link"}
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

export default ForgotPassword;
