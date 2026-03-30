import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
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
    <section className="panel stack">
      <div>
        <p className="eyebrow">Attendance Input</p>
        <h2>勤怠入力</h2>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          日付
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </label>
        <label>
          開始予定
          <input name="scheduledStartAt" type="time" value={form.scheduledStartAt} onChange={handleChange} />
        </label>
        <label>
          終了予定
          <input name="scheduledEndAt" type="time" value={form.scheduledEndAt} onChange={handleChange} />
        </label>
        <label>
          開始実績
          <input name="actualStartAt" type="time" value={form.actualStartAt} onChange={handleChange} />
        </label>
        <label>
          終了実績
          <input name="actualEndAt" type="time" value={form.actualEndAt} onChange={handleChange} />
        </label>
        <label>
          休憩
          <input name="breakMinutes" type="number" min="0" value={form.breakMinutes} onChange={handleChange} />
        </label>
        <label className="full-span">
          備考
          <textarea name="note" rows={4} value={form.note} onChange={handleChange} />
        </label>
        <div className="full-span form-actions">
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "保存中..." : "保存する"}
          </button>
          {mutation.isSuccess && <p className="success-text">保存しました。</p>}
          {mutation.isError && <p className="error-text">保存に失敗しました。</p>}
        </div>
      </form>
    </section>
  );
}

