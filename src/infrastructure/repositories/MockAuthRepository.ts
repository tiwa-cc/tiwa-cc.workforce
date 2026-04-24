import type { AuthRepository } from "@/application/ports/AuthRepository";
import type { User } from "@/domain/user/User";
import { ApiError } from "@/shared/lib/apiError";

const AUTH_STORAGE_KEY = "workforce-manager-demo-authenticated";

export const DEMO_AUTH_CREDENTIALS = {
  email: "taro@example.com",
  password: "demo1234",
} as const;

const MOCK_USER: User = {
  id: "user-001",
  employeeCode: "EMP001",
  name: "Taro Yamada",
  email: DEMO_AUTH_CREDENTIALS.email,
};

export class MockAuthRepository implements AuthRepository {
  async getCurrentUser(): Promise<User | null> {
    await sleep(300);
    return readAuthenticated() ? MOCK_USER : null;
  }

  async login(email: string, password: string): Promise<User> {
    await sleep(300);

    if (email !== DEMO_AUTH_CREDENTIALS.email || password !== DEMO_AUTH_CREDENTIALS.password) {
      throw new ApiError("Invalid demo credentials", 401);
    }

    writeAuthenticated(true);

    return MOCK_USER;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function readAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

function writeAuthenticated(isAuthenticated: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  if (isAuthenticated) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
