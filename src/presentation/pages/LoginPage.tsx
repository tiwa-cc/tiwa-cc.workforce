import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "@/application/usecases/login";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/shared/lib/apiError";
import { DEMO_AUTH_CREDENTIALS } from "@/infrastructure/repositories/MockAuthRepository";
import { authRepository } from "@/presentation/features/auth/authRepository";
import { useI18n } from "@/shared/i18n/I18nProvider";

export function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState<string>(DEMO_AUTH_CREDENTIALS.email);
  const [password, setPassword] = useState<string>("");

  const loginMutation = useMutation({
    mutationFn: ({ nextEmail, nextPassword }: { nextEmail: string; nextPassword: string }) =>
      login(authRepository, nextEmail, nextPassword),
    onSuccess: async (user) => {
      queryClient.setQueryData(["current-user"], user);
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      navigate("/", { replace: true });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginMutation.mutate({ nextEmail: email, nextPassword: password });
  }

  const errorMessage =
    loginMutation.error instanceof ApiError && loginMutation.error.status === 401
      ? t("login.invalidCredentials")
      : loginMutation.isError
        ? t("login.errorDescription")
        : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(255,226,172,0.24),transparent_24%),linear-gradient(160deg,rgba(15,23,42,0.96),rgba(39,60,87,0.92))] px-4 py-8">
      <Card className="w-full max-w-md border-white/12 bg-white/90 shadow-[0_36px_100px_-48px_rgba(15,23,42,0.95)]">
        <CardHeader>
          <div className="inline-flex w-fit items-center rounded-full border border-slate-300/80 bg-slate-100/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-600">
            Workforce Manager
          </div>
          <CardDescription>{t("login.description")}</CardDescription>
          <CardTitle className="text-2xl">{t("login.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertTitle>{t("login.errorTitle")}</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form aria-busy={loginMutation.isPending} className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">{t("login.emailLabel")}</Label>
              <Input
                autoComplete="email"
                id="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("login.emailPlaceholder")}
                type="email"
                value={email}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">{t("login.passwordLabel")}</Label>
              <Input
                autoComplete="current-password"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t("login.passwordPlaceholder")}
                type="password"
                value={password}
              />
            </div>

            <Button className="w-full" disabled={loginMutation.isPending} size="lg" type="submit">
              {loginMutation.isPending ? t("login.submitting") : t("login.submit")}
            </Button>
          </form>

          <p className="text-xs leading-5 text-slate-500/90">
            {t("login.demoCredentials", {
              email: DEMO_AUTH_CREDENTIALS.email,
              password: DEMO_AUTH_CREDENTIALS.password,
            })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
