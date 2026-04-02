import { FileBarChart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/shared/i18n/I18nProvider";

export function ReportPageContent() {
  const { t } = useI18n();

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardDescription>{t("report.description")}</CardDescription>
        <CardTitle className="flex items-center gap-2">
          <FileBarChart className="size-5 text-accent" />
          {t("report.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-7 text-muted-foreground">{t("report.body")}</p>
        <Separator />
        <Alert>
          <AlertTitle>{t("report.nextTitle")}</AlertTitle>
          <AlertDescription>{t("report.nextDescription")}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
