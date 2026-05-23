import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSegment, IonSegmentButton, IonLabel,
  IonList, IonItem, IonBadge, IonChip, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowUpOutline, arrowDownOutline } from 'ionicons/icons';

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
  present: number;
  absent: number;
  late: number;
  leave: number;
  records: AttendanceRecord[];
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSegment, IonSegmentButton, IonLabel,
    IonList, IonItem, IonBadge, IonChip, IonIcon,
  ],
})
export class Tab2Page {

  selectedMonth = 'current';

  months: Record<string, MonthData> = {
    current: {
      label: 'May 2025',
      present: 15, absent: 1, late: 2, leave: 3,
      records: [
        { day: 'Fri', date: 23, checkIn: '09:02 AM', checkOut: '',          hours: '4h 38m', status: 'present'  },
        { day: 'Thu', date: 22, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present'  },
        { day: 'Wed', date: 21, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'    },
        { day: 'Tue', date: 20, checkIn: '09:05 AM', checkOut: '06:00 PM',  hours: '8h 55m', status: 'present'  },
        { day: 'Mon', date: 19, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Fri', date: 16, checkIn: '10:30 AM', checkOut: '06:00 PM',  hours: '7h 30m', status: 'late'     },
        { day: 'Thu', date: 15, checkIn: '09:10 AM', checkOut: '06:05 PM',  hours: '8h 55m', status: 'present'  },
        { day: 'Wed', date: 14, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Tue', date: 13, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'    },
        { day: 'Mon', date: 12, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'    },
        { day: 'Fri', date:  9, checkIn: '08:55 AM', checkOut: '06:00 PM',  hours: '9h 05m', status: 'present'  },
        { day: 'Thu', date:  8, checkIn: '09:00 AM', checkOut: '05:55 PM',  hours: '8h 55m', status: 'present'  },
        { day: 'Wed', date:  7, checkIn: '09:05 AM', checkOut: '06:15 PM',  hours: '9h 10m', status: 'present'  },
        { day: 'Tue', date:  6, checkIn: '10:45 AM', checkOut: '06:00 PM',  hours: '7h 15m', status: 'late'     },
        { day: 'Mon', date:  5, checkIn: '',          checkOut: '',          hours: '',        status: 'absent'   },
        { day: 'Fri', date:  2, checkIn: '09:15 AM', checkOut: '06:00 PM',  hours: '8h 45m', status: 'present'  },
        { day: 'Thu', date:  1, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present'  },
      ],
    },
    last: {
      label: 'April 2025',
      present: 19, absent: 0, late: 1, leave: 2,
      records: [
        { day: 'Wed', date: 30, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Tue', date: 29, checkIn: '09:05 AM', checkOut: '06:10 PM',  hours: '9h 05m', status: 'present'  },
        { day: 'Mon', date: 28, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Fri', date: 25, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Thu', date: 24, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Wed', date: 23, checkIn: '10:20 AM', checkOut: '06:00 PM',  hours: '7h 40m', status: 'late'     },
        { day: 'Tue', date: 22, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'    },
        { day: 'Mon', date: 21, checkIn: '',          checkOut: '',          hours: '',        status: 'leave'    },
        { day: 'Fri', date: 18, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present'  },
        { day: 'Thu', date: 17, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Wed', date: 16, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Tue', date: 15, checkIn: '09:00 AM', checkOut: '06:05 PM',  hours: '9h 05m', status: 'present'  },
        { day: 'Mon', date: 14, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Fri', date: 11, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Thu', date: 10, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Wed', date:  9, checkIn: '09:05 AM', checkOut: '06:10 PM',  hours: '9h 05m', status: 'present'  },
        { day: 'Tue', date:  8, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Mon', date:  7, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Fri', date:  4, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Thu', date:  3, checkIn: '09:05 AM', checkOut: '06:15 PM',  hours: '9h 10m', status: 'present'  },
        { day: 'Wed', date:  2, checkIn: '09:00 AM', checkOut: '06:00 PM',  hours: '9h 00m', status: 'present'  },
        { day: 'Tue', date:  1, checkIn: '09:00 AM', checkOut: '06:10 PM',  hours: '9h 10m', status: 'present'  },
      ],
    },
  };

  get current(): MonthData {
    return this.months[this.selectedMonth];
  }

  onMonthChange(event: CustomEvent) {
    this.selectedMonth = event.detail.value;
  }

  statusLabel(status: AttendanceStatus): string {
    return { present: 'Present', absent: 'Absent', late: 'Late', leave: 'Leave', 'half-day': 'Half Day' }[status];
  }

  constructor() {
    addIcons({ arrowUpOutline, arrowDownOutline });
  }
}
