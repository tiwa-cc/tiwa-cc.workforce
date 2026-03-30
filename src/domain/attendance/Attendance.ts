export interface AttendanceRecord {
  date: string;
  scheduledStartAt: string;
  scheduledEndAt: string;
  actualStartAt: string;
  actualEndAt: string;
  breakMinutes: number;
  note: string;
}

