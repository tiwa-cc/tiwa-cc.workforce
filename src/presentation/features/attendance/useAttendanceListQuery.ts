import { useQuery } from "@tanstack/react-query";
import { MockAttendanceRepository } from "@/infrastructure/repositories/MockAttendanceRepository";

const attendanceRepository = new MockAttendanceRepository();

export function useAttendanceListQuery() {
  return useQuery({
    queryKey: ["attendance-records"],
    queryFn: () => attendanceRepository.list(),
  });
}

export { attendanceRepository };

