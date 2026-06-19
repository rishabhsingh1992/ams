import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline, personAddOutline, documentTextOutline,
  settingsOutline, timeOutline, checkmarkCircleOutline,
  closeCircleOutline, alertCircleOutline, calendarOutline,
} from 'ionicons/icons';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';

interface ActivityItem {
  name:   string;
  action: string;
  time:   string;
  type:   'on-time' | 'late' | 'absent';
}

interface DeptStat {
  name:    string;
  present: number;
  total:   number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, DatePipe],
})
export class AdminDashboardPage {
  private readonly router = inject(Router);
  readonly auth           = inject(AuthService);
  readonly userService    = inject(UserService);

  readonly today = new Date();

  readonly stats = {
    total:   50,
    present: 38,
    absent:  7,
    late:    3,
    onLeave: 2,
  };

  get presentPct(): number {
    return Math.round((this.stats.present / this.stats.total) * 100);
  }

  get ringGradient(): string {
    const pct = this.presentPct;
    return `conic-gradient(#2DD36F ${pct}%, rgba(var(--ion-text-color-rgb),0.08) ${pct}%)`;
  }

  readonly departments: DeptStat[] = [
    { name: 'Engineering',    present: 12, total: 14 },
    { name: 'Human Resources', present: 4,  total: 5  },
    { name: 'Finance',        present: 6,  total: 8  },
    { name: 'Operations',     present: 9,  total: 11 },
    { name: 'Marketing',      present: 5,  total: 7  },
    { name: 'Sales',          present: 2,  total: 5  },
  ];

  readonly recentActivity: ActivityItem[] = [
    { name: 'Priya Sharma',  action: 'Checked in',      time: '8:55 AM',  type: 'on-time' },
    { name: 'Anita Kumar',   action: 'Checked in',      time: '9:02 AM',  type: 'on-time' },
    { name: 'Rahul Verma',   action: 'Checked in late', time: '10:15 AM', type: 'late'    },
    { name: 'Suresh Mehta',  action: 'Absent today',    time: '—',        type: 'absent'  },
    { name: 'Neha Joshi',    action: 'Checked in',      time: '9:10 AM',  type: 'on-time' },
  ];

  totalUsers(): number {
    return this.userService.users().length;
  }

  deptBarWidth(stat: DeptStat): string {
    return `${Math.round((stat.present / stat.total) * 100)}%`;
  }

  constructor() {
    addIcons({
      peopleOutline, personAddOutline, documentTextOutline, settingsOutline,
      timeOutline, checkmarkCircleOutline, closeCircleOutline,
      alertCircleOutline, calendarOutline,
    });
  }

  goUsers():    void { this.router.navigate(['/tabs/users']);               }
  goReports():  void { this.router.navigate(['/tabs/reports']);             }
  goSettings(): void { this.router.navigate(['/tabs/attendance-settings']); }
}
