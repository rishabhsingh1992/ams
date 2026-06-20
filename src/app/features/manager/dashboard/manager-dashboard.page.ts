import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline, checkmarkCircleOutline, closeCircleOutline,
  timeOutline, calendarOutline, alertCircleOutline, chevronForwardOutline,
} from 'ionicons/icons';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';

type AttendanceStatus = 'present' | 'late' | 'absent' | 'leave';

interface TeamMember {
  name:       string;
  role:       string;
  status:     AttendanceStatus;
  checkInTime: string;
}

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: 'manager-dashboard.page.html',
  styleUrls: ['manager-dashboard.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, AvatarComponent, StatusBadgeComponent],
})
export class ManagerDashboardPage {
  private readonly router = inject(Router);

  readonly teamStats = {
    total:   12,
    present: 9,
    late:    2,
    absent:  1,
  };

  readonly pendingApprovals = 3;

  readonly teamMembers: TeamMember[] = [
    { name: 'Rishabh Singh', role: 'Engineer',    status: 'present', checkInTime: '9:00 AM'  },
    { name: 'Anita Kumar',   role: 'Designer',    status: 'present', checkInTime: '8:55 AM'  },
    { name: 'Rahul Verma',   role: 'Analyst',     status: 'late',    checkInTime: '10:15 AM' },
    { name: 'Neha Joshi',    role: 'Engineer',    status: 'present', checkInTime: '9:05 AM'  },
    { name: 'Suresh Mehta',  role: 'QA',          status: 'absent',  checkInTime: '—'        },
    { name: 'Pooja Iyer',    role: 'Engineer',    status: 'present', checkInTime: '9:20 AM'  },
    { name: 'Amit Shah',     role: 'DevOps',      status: 'leave',   checkInTime: '—'        },
  ];

  statusLabel(status: AttendanceStatus): string {
    return ({ present: 'Present', late: 'Late', absent: 'Absent', leave: 'On Leave' })[status];
  }

  constructor() {
    addIcons({
      peopleOutline, checkmarkCircleOutline, closeCircleOutline,
      timeOutline, calendarOutline, alertCircleOutline, chevronForwardOutline,
    });
  }

  goTeam():      void { this.router.navigate(['/tabs/team']);            }
  goApprovals(): void { this.router.navigate(['/tabs/team/approvals']);  }
}
