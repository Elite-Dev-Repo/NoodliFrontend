import api, { UnauthorizedError } from "./api";

const firstError = (data) => {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (Array.isArray(data)) return firstError(data[0]);
  if (typeof data === "object") {
    const value = Object.values(data)[0];
    return firstError(value);
  }
  return String(data);
};

const failure = (error, fallback) => ({
  success: false,
  message:
    firstError(error.response?.data) ||
    error.response?.data?.detail ||
    error.message ||
    fallback,
});

export async function fetchGoals() {
  try {
    const res = await api.get("goals/");
    return Array.isArray(res.data) ? res.data : res.data?.results || [];
  } catch (error) {
    if (error.response?.status === 401) {
      throw new UnauthorizedError();
    }

    throw new Error(
      error.response?.data?.detail ||
        error.message ||
        "Unable to load your goals.",
      { cause: error },
    );
  }
}

export async function createGoal(payload) {
  try {
    const res = await api.post("goals/", payload);
    return { success: true, goal: res.data };
  } catch (error) {
    return failure(error, "Unable to create the goal.");
  }
}

export async function updateGoal(id, payload) {
  try {
    const res = await api.patch(`goals/${id}/`, payload);
    return { success: true, goal: res.data };
  } catch (error) {
    return failure(error, "Unable to update the goal.");
  }
}

export async function deleteGoal(id) {
  try {
    await api.delete(`goals/${id}/`);
    return { success: true };
  } catch (error) {
    return failure(error, "Unable to delete the goal.");
  }
}
