import type { User } from "@/domain/user/User";

export interface AuthRepository {
  getCurrentUser(): Promise<User | null>;
  login(email: string, password: string): Promise<User>;
}
