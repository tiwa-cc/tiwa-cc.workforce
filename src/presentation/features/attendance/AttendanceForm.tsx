import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AttendanceRecord } from "@/domain/attendance/Attendance";
import { useSaveAttendanceMutation } from "@/presentation/features/attendance/useSaveAttendanceMutation";
import { useI18n } from "@/shared/i18n/I18nProvider";

const INITIAL_FORM: AttendanceRecord = {
  date: "2026-03-30",
  scheduledStartAt: "09:00",
  scheduledEndAt: "18:00",
  actualStartAt: "09:00",
  actualEndAt: "18:00",
  breakMinutes: 60,
  note: "",
};

export function AttendanceForm() {
  const { t } = useI18n();
  const [form, setForm] = useState<AttendanceRecord>(INITIAL_FORM);
  const mutation = useSaveAttendanceMutation();

  function updateField<K extends keyof AttendanceRecord>(key: K, value: AttendanceRecord[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    if (name === "breakMinutes") {
      updateField("breakMinutes", Number(value));
      return;
    }

    updateField(name as keyof AttendanceRecord, value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await mutation.mutateAsync(form);
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>{t("attendance.inputDescription")}</CardDescription>
        <CardTitle>{t("attendance.inputTitle")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          aria-busy={mutation.isPending}
          aria-describedby="attendance-form-status"
          aria-label={t("attendance.inputTitle")}
          className="grid gap-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">{t("attendance.date")}</Label>
              <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledStartAt">{t("attendance.scheduledStartAt")}</Label>
              <Input
                id="scheduledStartAt"
                name="scheduledStartAt"
                type="time"
                value={form.scheduledStartAt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledEndAt">{t("attendance.scheduledEndAt")}</Label>
              <Input
                id="scheduledEndAt"
                name="scheduledEndAt"
                type="time"
                value={form.scheduledEndAt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualStartAt">{t("attendance.actualStartAt")}</Label>
              <Input
                id="actualStartAt"
                name="actualStartAt"
                type="time"
                value={form.actualStartAt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualEndAt">{t("attendance.actualEndAt")}</Label>
              <Input
                id="actualEndAt"
                name="actualEndAt"
                type="time"
                value={form.actualEndAt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breakMinutes">{t("attendance.breakMinutes")}</Label>
              <Input
                id="breakMinutes"
                min="0"
                name="breakMinutes"
                type="number"
                value={form.breakMinutes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">{t("attendance.note")}</Label>
            <Textarea id="note" name="note" rows={4} value={form.note} onChange={handleChange} />
          </div>

          <div className="flex flex-col gap-3 border-t border-border/70 pt-4 xl:flex-row xl:items-start">
            <Button disabled={mutation.isPending} type="submit">
              {mutation.isPending ? t("attendance.submitting") : t("attendance.submit")}
            </Button>

            <div
              aria-atomic="true"
              aria-live="polite"
              className="sr-only"
              id="attendance-form-status"
              role="status"
            >
              {mutation.isPending ? t("attendance.submittingStatus") : ""}
            </div>

            {mutation.isSuccess && (
              <Alert
                aria-atomic="true"
                aria-live="polite"
                className="border-emerald-200 bg-emerald-50 text-emerald-950 [&>svg]:text-emerald-600"
              >
                <CheckCircle2 />
                <AlertTitle>{t("attendance.saveSuccessTitle")}</AlertTitle>
                <AlertDescription>{t("attendance.saveSuccessDescription")}</AlertDescription>
              </Alert>
            )}

            {mutation.isError && (
              <Alert aria-atomic="true" className="bg-destructive/6" variant="destructive">
                <TriangleAlert />
                <AlertTitle>{t("attendance.saveErrorTitle")}</AlertTitle>
                <AlertDescription>{t("attendance.saveErrorDescription")}</AlertDescription>
              </Alert>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
