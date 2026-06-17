export type CheckStatus = 'not-started' | 'checked-in' | 'checked-out';

export interface TodayRecord {
  date:         string;
  checkInTime:  string;
  checkOutTime: string;
  status:       CheckStatus;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave' | 'half-day';

export interface AttendanceRecord {
  day:               string;
  date:              number;
  checkIn:           string;
  checkOut:          string;
  hours:             string;
  status:            AttendanceStatus;
  checkInLocation?:  string;
  checkOutLocation?: string;
}

export interface MonthData {
  label:   string;
  records: AttendanceRecord[];
}
