import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSegment, IonSegmentButton, IonLabel, IonBadge,
} from '@ionic/angular/standalone';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave' | 'half-day';

interface AttendanceRecord {
  day: string;
  date: number;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: AttendanceStatus;
}

interface MonthData {
  label: string;
  records: AttendanceRecord[];
}

const STORAGE_KEY = 'ams_today';

function monthLabel(d: Date): string {
  return d.toLocaleString('default', { month: 'long', year: 'numeric' });
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSegment, IonSegmentButton, IonLabel, IonBadge,
  ],
})
export class Tab2Page {

  selectedMonth = 'current';

  months: Record<string, MonthData> = {
    current: {
      label: monthLabel(new Date()),
      records: [
        { day: 'Fri', date: 23, checkIn: '',          checkOut: '',          hours: '',        status: 'absent'  },
        { day: 'Thu', date: 22, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present' },
        { day: 'Wed', date: 21, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Tue', date: 20, checkIn: '09:05 AM', checkOut: '06:00 PM',  hours: '8h 55m', status: 'present' },
        { day: 'Mon', date: 19, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Fri', date: 16, checkIn: '10:30 AM', checkOut: '06:00 PM',  hours: '7h 30m', status: 'late'    },
        { day: 'Thu', date: 15, checkIn: '09:10 AM', checkOut: '06:05 PM',  hours: '8h 55m', status: 'present' },
        { day: 'Wed', date: 14, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Tue', date: 13, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Mon', date: 12, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Fri', date:  9, checkIn: '08:55 AM', checkOut: '06:00 PM',  hours: '9h 05m', status: 'present' },
        { day: 'Thu', date:  8, checkIn: '09:00 AM', checkOut: '05:55 PM',  hours: '8h 55m', status: 'present' },
        { day: 'Wed', date:  7, checkIn: '09:05 AM', checkOut: '06:15 PM',  hours: '9h 10m', status: 'present' },
        { day: 'Tue', date:  6, checkIn: '10:45 AM', checkOut: '06:00 PM',  hours: '7h 15m', status: 'late'    },
        { day: 'Mon', date:  5, checkIn: '',          checkOut: '',          hours: '',        status: 'absent'  },
        { day: 'Fri', date:  2, checkIn: '09:15 AM', checkOut: '06:00 PM',  hours: '8h 45m', status: 'present' },
        { day: 'Thu', date:  1, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present' },
      ],
    },
    last: {
      label: monthLabel(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)),
      records: [
        { day: 'Wed', date: 30, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Tue', date: 29, checkIn: '09:05 AM', checkOut: '06:10 PM',  hours: '9h 05m', status: 'present' },
        { day: 'Mon', date: 28, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Fri', date: 25, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Thu', date: 24, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Wed', date: 23, checkIn: '10:20 AM', checkOut: '06:00 PM',  hours: '7h 40m', status: 'late'    },
        { day: 'Tue', date: 22, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Mon', date: 21, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Fri', date: 18, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present' },
        { day: 'Thu', date: 17, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Wed', date: 16, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Tue', date: 15, checkIn: '09:00 AM', checkOut: '06:05 PM',  hours: '9h 05m', status: 'present' },
        { day: 'Mon', date: 14, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Fri', date: 11, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Thu', date: 10, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Wed', date:  9, checkIn: '09:05 AM', checkOut: '06:10 PM',  hours: '9h 05m', status: 'present' },
        { day: 'Tue', date:  8, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Mon', date:  7, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Fri', date:  4, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Thu', date:  3, checkIn: '09:05 AM', checkOut: '06:15 PM',  hours: '9h 10m', status: 'present' },
        { day: 'Wed', date:  2, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present' },
        { day: 'Tue', date:  1, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present' },
      ],
    },
  };

  ionViewWillEnter() {
    this.mergeRealAttendance();
  }

  get current(): MonthData {
    return this.months[this.selectedMonth];
  }

  onMonthChange(event: CustomEvent) {
    this.selectedMonth = event.detail.value;
  }

  statusLabel(status: AttendanceStatus): string {
    return { present: 'Present', absent: 'Absent', late: 'Late', leave: 'Leave', 'half-day': 'Half Day' }[status];
  }

  private mergeRealAttendance() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const stored: { date: string; checkInTime: string; checkOutTime: string; status: string } = JSON.parse(raw);
    const storedDate = new Date(stored.date);

    // Only merge if the stored record belongs to the current month being shown
    const now = new Date();
    if (storedDate.getMonth() !== now.getMonth() || storedDate.getFullYear() !== now.getFullYear()) return;

    const dateNum = storedDate.getDate();
    const rec = this.months['current'].records.find(r => r.date === dateNum);
    if (!rec) return;

    rec.checkIn  = stored.checkInTime  || '';
    rec.checkOut = stored.checkOutTime || '';

    if (stored.checkInTime) {
      rec.status = 'present';
      rec.hours  = stored.checkOutTime
        ? this.calcHours(stored.checkInTime, stored.checkOutTime)
        : 'Active';
    }
  }

  private calcHours(inTime: string, outTime: string): string {
    const toMin = (t: string) => {
      const [hm, period] = t.split(' ');
      const [h, m] = hm.split(':').map(Number);
      const h24 = period === 'PM' && h !== 12 ? h + 12 : period === 'AM' && h === 12 ? 0 : h;
      return h24 * 60 + m;
    };
    const diff = toMin(outTime) - toMin(inTime);
    if (diff <= 0) return '0h 0m';
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  }
}
