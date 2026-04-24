import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/application/usecases/getCurrentUser";
import { authRepository } from "@/presentation/features/auth/authRepository";
import { useAuthStore } from "@/presentation/features/auth/authStore";

export function useCurrentUserQuery() {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(authRepository),
  });

  useEffect(() => {
    if (query.data !== undefined) {
      setCurrentUser(query.data);
    }
  }, [query.data, setCurrentUser]);

  return query;
}
