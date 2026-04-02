import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/presentation/components/AppShell";
import { useCurrentUserQuery } from "@/presentation/features/auth/useCurrentUserQuery";
import { useI18n } from "@/shared/i18n/I18nProvider";

export function LoginPage() {
  const { t } = useI18n();
  const { data, isLoading, isError } = useCurrentUserQuery();

  return (
    <AppShell>
      <Card className="max-w-3xl">
        <CardHeader>
          <CardDescription>{t("login.description")}</CardDescription>
          <CardTitle>{t("login.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full rounded-[1.5rem]" />
              <Skeleton className="h-10 w-full rounded-[1.5rem]" />
              <Skeleton className="h-10 w-full rounded-[1.5rem]" />
            </div>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertTitle>{t("login.errorTitle")}</AlertTitle>
              <AlertDescription>{t("login.errorDescription")}</AlertDescription>
            </Alert>
          )}

          {data && (
            <dl className="grid gap-4">
              <div className="grid gap-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {t("login.employeeCode")}
                </dt>
                <dd className="text-lg font-semibold">{data.employeeCode}</dd>
              </div>
              <Separator />
              <div className="grid gap-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {t("login.name")}
                </dt>
                <dd className="text-lg font-semibold">{data.name}</dd>
              </div>
              <Separator />
              <div className="grid gap-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {t("login.email")}
                </dt>
                <dd className="text-lg font-semibold">{data.email}</dd>
              </div>
            </dl>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
