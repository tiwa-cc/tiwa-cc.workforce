import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveAttendance } from "@/application/usecases/saveAttendance";
import type { AttendanceRecord } from "@/domain/attendance/Attendance";
import { attendanceRepository } from "@/presentation/features/attendance/useAttendanceListQuery";

export function useSaveAttendanceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (record: AttendanceRecord) => saveAttendance(attendanceRepository, record),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["attendance-records"] });
    },
  });
}

