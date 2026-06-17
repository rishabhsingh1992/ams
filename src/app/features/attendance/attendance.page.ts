import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSegment, IonSegmentButton, IonLabel,
} from '@ionic/angular/standalone';
import { AttendanceStatus, AttendanceRecord, MonthData } from '@core/models/attendance.model';

const STORAGE_KEY = 'ams_today';

function monthLabel(d: Date): string {
  return d.toLocaleString('default', { month: 'long', year: 'numeric' });
}

@Component({
  selector: 'app-attendance',
  templateUrl: 'attendance.page.html',
  styleUrls: ['attendance.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSegment, IonSegmentButton, IonLabel,
  ],
})
export class AttendancePage {

  selectedMonth = 'current';

  months: Record<string, MonthData> = {
    current: {
      label: monthLabel(new Date()),
      records: [
        { day: 'Fri', date: 23, checkIn: '',          checkOut: '',          hours: '',        status: 'absent'  },
        { day: 'Thu', date: 22, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present', checkInLocation: 'Connaught Place, New Delhi', checkOutLocation: 'Sector 62, Noida, UP' },
        { day: 'Wed', date: 21, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Tue', date: 20, checkIn: '09:05 AM', checkOut: '06:00 PM',  hours: '8h 55m', status: 'present', checkInLocation: 'Vasant Kunj, New Delhi', checkOutLocation: 'Connaught Place, New Delhi' },
        { day: 'Mon', date: 19, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Indiranagar, Bengaluru', checkOutLocation: 'Whitefield, Bengaluru' },
        { day: 'Fri', date: 16, checkIn: '10:30 AM', checkOut: '06:00 PM',  hours: '7h 30m', status: 'late',    checkInLocation: 'Sector 18, Noida, UP', checkOutLocation: 'Sector 62, Noida, UP' },
        { day: 'Thu', date: 15, checkIn: '09:10 AM', checkOut: '06:05 PM',  hours: '8h 55m', status: 'present', checkInLocation: 'MG Road, Gurugram', checkOutLocation: 'Cyber City, Gurugram' },
        { day: 'Wed', date: 14, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Saket, New Delhi', checkOutLocation: 'Chanakyapuri, New Delhi' },
        { day: 'Tue', date: 13, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Mon', date: 12, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Fri', date:  9, checkIn: '08:55 AM', checkOut: '06:00 PM',  hours: '9h 05m', status: 'present', checkInLocation: 'Dwarka, New Delhi', checkOutLocation: 'Connaught Place, New Delhi' },
        { day: 'Thu', date:  8, checkIn: '09:00 AM', checkOut: '05:55 PM',  hours: '8h 55m', status: 'present', checkInLocation: 'Sector 62, Noida, UP', checkOutLocation: 'Indirapuram, Ghaziabad' },
        { day: 'Wed', date:  7, checkIn: '09:05 AM', checkOut: '06:15 PM',  hours: '9h 10m', status: 'present', checkInLocation: 'Koramangala, Bengaluru', checkOutLocation: 'MG Road, Bengaluru' },
        { day: 'Tue', date:  6, checkIn: '10:45 AM', checkOut: '06:00 PM',  hours: '7h 15m', status: 'late',    checkInLocation: 'Karol Bagh, New Delhi', checkOutLocation: 'Connaught Place, New Delhi' },
        { day: 'Mon', date:  5, checkIn: '',          checkOut: '',          hours: '',        status: 'absent'  },
        { day: 'Fri', date:  2, checkIn: '09:15 AM', checkOut: '06:00 PM',  hours: '8h 45m', status: 'present', checkInLocation: 'Hauz Khas, New Delhi', checkOutLocation: 'Vasant Kunj, New Delhi' },
        { day: 'Thu', date:  1, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present', checkInLocation: 'Noida City Center, UP', checkOutLocation: 'Sector 62, Noida, UP' },
      ],
    },
    last: {
      label: monthLabel(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)),
      records: [
        { day: 'Wed', date: 30, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Connaught Place, New Delhi', checkOutLocation: 'Sector 62, Noida, UP' },
        { day: 'Tue', date: 29, checkIn: '09:05 AM', checkOut: '06:10 PM',  hours: '9h 05m', status: 'present', checkInLocation: 'Vasant Kunj, New Delhi', checkOutLocation: 'Connaught Place, New Delhi' },
        { day: 'Mon', date: 28, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Indiranagar, Bengaluru', checkOutLocation: 'Whitefield, Bengaluru' },
        { day: 'Fri', date: 25, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Sector 18, Noida, UP', checkOutLocation: 'Sector 62, Noida, UP' },
        { day: 'Thu', date: 24, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'MG Road, Gurugram', checkOutLocation: 'Cyber City, Gurugram' },
        { day: 'Wed', date: 23, checkIn: '10:20 AM', checkOut: '06:00 PM',  hours: '7h 40m', status: 'late',    checkInLocation: 'Saket, New Delhi', checkOutLocation: 'Chanakyapuri, New Delhi' },
        { day: 'Tue', date: 22, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Mon', date: 21, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'   },
        { day: 'Fri', date: 18, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present', checkInLocation: 'Dwarka, New Delhi', checkOutLocation: 'Connaught Place, New Delhi' },
        { day: 'Thu', date: 17, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Sector 62, Noida, UP', checkOutLocation: 'Indirapuram, Ghaziabad' },
        { day: 'Wed', date: 16, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Koramangala, Bengaluru', checkOutLocation: 'MG Road, Bengaluru' },
        { day: 'Tue', date: 15, checkIn: '09:00 AM', checkOut: '06:05 PM',  hours: '9h 05m', status: 'present', checkInLocation: 'Karol Bagh, New Delhi', checkOutLocation: 'Connaught Place, New Delhi' },
        { day: 'Mon', date: 14, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Hauz Khas, New Delhi', checkOutLocation: 'Vasant Kunj, New Delhi' },
        { day: 'Fri', date: 11, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Noida City Center, UP', checkOutLocation: 'Sector 62, Noida, UP' },
        { day: 'Thu', date: 10, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Connaught Place, New Delhi', checkOutLocation: 'Sector 62, Noida, UP' },
        { day: 'Wed', date:  9, checkIn: '09:05 AM', checkOut: '06:10 PM',  hours: '9h 05m', status: 'present', checkInLocation: 'Vasant Kunj, New Delhi', checkOutLocation: 'Connaught Place, New Delhi' },
        { day: 'Tue', date:  8, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Indiranagar, Bengaluru', checkOutLocation: 'Whitefield, Bengaluru' },
        { day: 'Mon', date:  7, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Sector 18, Noida, UP', checkOutLocation: 'Sector 62, Noida, UP' },
        { day: 'Fri', date:  4, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'MG Road, Gurugram', checkOutLocation: 'Cyber City, Gurugram' },
        { day: 'Thu', date:  3, checkIn: '09:05 AM', checkOut: '06:15 PM',  hours: '9h 10m', status: 'present', checkInLocation: 'Saket, New Delhi', checkOutLocation: 'Chanakyapuri, New Delhi' },
        { day: 'Wed', date:  2, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present', checkInLocation: 'Dwarka, New Delhi', checkOutLocation: 'Connaught Place, New Delhi' },
        { day: 'Tue', date:  1, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present', checkInLocation: 'Sector 62, Noida, UP', checkOutLocation: 'Indirapuram, Ghaziabad' },
      ],
    },
  };

  async ionViewWillEnter() {
    await this.mergeRealAttendance();
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

  private async getPlaceName(lat: number, lon: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
        { headers: { 'Accept-Language': 'en', 'User-Agent': 'ams-attendance-app' } }
      );
      const data = await response.json();
      if (data?.address) {
        const a = data.address;
        const road = a.road || a.suburb || a.neighbourhood || a.industrial || '';
        const city = a.city || a.town || a.county || a.state_district || '';
        const parts = [road, city].filter(Boolean);
        if (parts.length) return parts.join(', ');
        return data.display_name.split(',').slice(0, 2).join(',').trim();
      }
      return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    } catch {
      return `GPS: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }
  }

  private async mergeRealAttendance() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const stored: {
      date: string; checkInTime: string; checkOutTime: string; status: string;
      checkInLat?: number | null; checkInLon?: number | null;
      checkOutLat?: number | null; checkOutLon?: number | null;
    } = JSON.parse(raw);

    const storedDate = new Date(stored.date);
    const now = new Date();
    if (storedDate.getMonth() !== now.getMonth() || storedDate.getFullYear() !== now.getFullYear()) return;

    const rec = this.months['current'].records.find(r => r.date === storedDate.getDate());
    if (!rec) return;

    rec.checkIn  = stored.checkInTime  || '';
    rec.checkOut = stored.checkOutTime || '';

    if (stored.checkInTime) {
      rec.status = 'present';
      rec.hours  = stored.checkOutTime ? this.calcHours(stored.checkInTime, stored.checkOutTime) : 'Active';
      rec.checkInLocation = stored.checkInLat && stored.checkInLon
        ? await this.getPlaceName(stored.checkInLat, stored.checkInLon)
        : 'Connaught Place, New Delhi';

      if (stored.checkOutTime) {
        rec.checkOutLocation = stored.checkOutLat && stored.checkOutLon
          ? await this.getPlaceName(stored.checkOutLat, stored.checkOutLon)
          : 'Sector 62, Noida, UP';
      }
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
