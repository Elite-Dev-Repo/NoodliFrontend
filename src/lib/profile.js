import api, { UnauthorizedError } from "./api";

export async function fetchProfile() {
  try {
    const res = await api.get("profile/");
    return res.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new UnauthorizedError();
    }

    const message =
      error.response?.data?.detail ||
      error.message ||
      "Unable to load your profile.";

    throw new Error(message, { cause: error });
  }
}
