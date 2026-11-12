import { useCallback, useEffect, useState } from "react";

import { UnauthorizedError, clearTokens, saveTokens } from "@/lib/api";
import { ACCESS } from "@/lib/constants";
import { normalizeSessions } from "@/lib/sessions";
import { fetchProfile } from "@/lib/profile";

export function useProfileData() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authState, setAuthState] = useState("checking");
  const [profile, setProfile] = useState(null);

  const loadData = useCallback(async () => {
    if (!localStorage.getItem(ACCESS)) {
      setAuthState("unauthenticated");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const profileData = await fetchProfile();

      setProfile(profileData);
      setSessions(normalizeSessions(profileData?.sessions));
      setAuthState("authenticated");
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        clearTokens();
        setSessions([]);
        setProfile(null);
        setAuthState("unauthenticated");
      } else {
        setError(err.message);
        setAuthState("authenticated");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) saveTokens({ access: token });
    const timer = setTimeout(loadData, 0);
    return () => clearTimeout(timer);
  }, [loadData]);

  const logout = useCallback(() => {
    clearTokens();
    setSessions([]);
    setProfile(null);
    setAuthState("unauthenticated");
  }, []);

  return { sessions, loading, error, authState, profile, loadData, logout };
}
