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
        <CardDescription>Attendance Input</CardDescription>
        <CardTitle>勤怠入力</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">日付</Label>
              <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledStartAt">開始予定</Label>
              <Input
                id="scheduledStartAt"
                name="scheduledStartAt"
                type="time"
                value={form.scheduledStartAt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledEndAt">終了予定</Label>
              <Input
                id="scheduledEndAt"
                name="scheduledEndAt"
                type="time"
                value={form.scheduledEndAt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualStartAt">開始実績</Label>
              <Input
                id="actualStartAt"
                name="actualStartAt"
                type="time"
                value={form.actualStartAt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualEndAt">終了実績</Label>
              <Input
                id="actualEndAt"
                name="actualEndAt"
                type="time"
                value={form.actualEndAt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breakMinutes">休憩</Label>
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
            <Label htmlFor="note">備考</Label>
            <Textarea id="note" name="note" rows={4} value={form.note} onChange={handleChange} />
          </div>

          <div className="flex flex-col gap-3 border-t border-border/70 pt-4 xl:flex-row xl:items-start">
            <Button disabled={mutation.isPending} type="submit">
              {mutation.isPending ? "保存中..." : "保存する"}
            </Button>

            {mutation.isSuccess && (
              <Alert className="border-emerald-200 bg-emerald-50 text-emerald-950 [&>svg]:text-emerald-600">
                <CheckCircle2 />
                <AlertTitle>保存完了</AlertTitle>
                <AlertDescription>勤怠データを保存しました。</AlertDescription>
              </Alert>
            )}

            {mutation.isError && (
              <Alert className="bg-destructive/6" variant="destructive">
                <TriangleAlert />
                <AlertTitle>保存に失敗しました</AlertTitle>
                <AlertDescription>入力内容を確認して再度お試しください。</AlertDescription>
              </Alert>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
