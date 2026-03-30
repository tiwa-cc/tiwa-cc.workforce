import type { AuthRepository } from "@/application/ports/AuthRepository";

export async function getCurrentUser(authRepository: AuthRepository) {
  return authRepository.getCurrentUser();
}

