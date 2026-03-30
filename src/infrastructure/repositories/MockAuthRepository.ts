import type { AuthRepository } from "@/application/ports/AuthRepository";
import type { User } from "@/domain/user/User";

const MOCK_USER: User = {
  id: "user-001",
  employeeCode: "EMP001",
  name: "Taro Yamada",
  email: "taro@example.com",
};

export class MockAuthRepository implements AuthRepository {
  async getCurrentUser(): Promise<User | null> {
    await sleep(300);
    return MOCK_USER;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

