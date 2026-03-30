import type { AttendanceRepository } from "@/application/ports/AttendanceRepository";
import type { AttendanceRecord } from "@/domain/attendance/Attendance";

export async function saveAttendance(
  attendanceRepository: AttendanceRepository,
  record: AttendanceRecord,
) {
  return attendanceRepository.save(record);
}

