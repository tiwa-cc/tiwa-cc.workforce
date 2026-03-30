import type { AttendanceRecord } from "@/domain/attendance/Attendance";

export interface AttendanceRepository {
  save(record: AttendanceRecord): Promise<void>;
  list(): Promise<AttendanceRecord[]>;
}

