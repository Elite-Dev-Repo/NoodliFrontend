import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;
import { ACCESS, REFRESH } from "./constants";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class UnauthorizedError extends Error {
  constructor(message = "Session expired. Please sign in again.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export const saveTokens = ({ access, refresh } = {}) => {
  if (access) localStorage.setItem(ACCESS, access);
  if (refresh) localStorage.setItem(REFRESH, refresh);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
};

export async function login(email, password) {
  clearTokens();
  try {
    const res = await api.post(`token/`, { email, password });
    const data = res.data; // Axios data is already parsed, no 'await' needed

    saveTokens({ access: data.access, refresh: data.refresh });
    return { success: true, data };
  } catch (error) {
    // Axios captures 4xx/5xx responses inside error.response
    const data = error.response?.data;

    const errorMessage =
      data?.detail ||
      data?.email?.[0] ||
      data?.password?.[0] ||
      data?.non_field_errors?.[0] ||
      error.message ||
      "Unable to sign in with those credentials.";

    return { success: false, message: errorMessage };
  }
}

export async function requestPasswordReset(email) {
  try {
    const res = await api.post("forgot_password/", { email });
    return { success: true, message: res.data?.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.email?.[0] ||
        error.response?.data?.detail ||
        error.message ||
        "Unable to send the reset email.",
    };
  }
}

export async function confirmPasswordReset(uidb64, token) {
  try {
    const res = await api.get(`forgot_password/${uidb64}/${token}/`);
    return { success: true, message: res.data?.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        "This reset link is invalid or has expired.",
    };
  }
}

export async function resetPassword({ uidb64, token, new_password }) {
  try {
    const res = await api.post("change_password/", {
      uidb64,
      token,
      new_password,
    });
    return { success: true, message: res.data?.message };
  } catch (error) {
    const data = error.response?.data;
    const passwordError = Array.isArray(data?.new_password)
      ? data.new_password[0]
      : data?.new_password;

    return {
      success: false,
      message:
        passwordError ||
        data?.message ||
        data?.detail ||
        error.message ||
        "Unable to reset your password.",
    };
  }
}

export default api;
