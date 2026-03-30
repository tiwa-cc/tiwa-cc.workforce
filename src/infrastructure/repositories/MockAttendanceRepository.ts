import type { AttendanceRepository } from "@/application/ports/AttendanceRepository";
import type { AttendanceRecord } from "@/domain/attendance/Attendance";

const INITIAL_RECORDS: AttendanceRecord[] = [
  {
    date: "2026-03-30",
    scheduledStartAt: "09:00",
    scheduledEndAt: "18:00",
    actualStartAt: "09:05",
    actualEndAt: "18:10",
    breakMinutes: 60,
    note: "Initial mock data",
  },
];

export class MockAttendanceRepository implements AttendanceRepository {
  private records = [...INITIAL_RECORDS];

  async save(record: AttendanceRecord): Promise<void> {
    await sleep(300);
    this.records = [record, ...this.records.filter((item) => item.date !== record.date)];
  }

  async list(): Promise<AttendanceRecord[]> {
    await sleep(300);
    return this.records;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

