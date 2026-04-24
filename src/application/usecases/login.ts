import type { AuthRepository } from "@/application/ports/AuthRepository";

export async function login(authRepository: AuthRepository, email: string, password: string) {
  return authRepository.login(email, password);
}
