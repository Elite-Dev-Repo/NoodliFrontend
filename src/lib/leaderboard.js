import api, { UnauthorizedError } from "./api";

export async function fetchLeaderboard() {
  try {
    const res = await api.get("leaderboard/");
    return Array.isArray(res.data) ? res.data : res.data?.results || [];
  } catch (error) {
    if (error.response?.status === 401) {
      throw new UnauthorizedError();
    }

    throw new Error(
      error.response?.data?.detail ||
        error.message ||
        "Unable to load the leaderboard.",
      { cause: error },
    );
  }
}
