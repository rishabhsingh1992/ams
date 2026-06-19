import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonSearchbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline, calendarOutline, chevronForwardOutline, checkmarkCircle,
  closeCircle, timeOutline,
} from 'ionicons/icons';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';

type StatusFilter = 'all' | 'present' | 'late' | 'absent';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'present' | 'late' | 'absent';
  checkInTime: string;
}

@Component({
  selector: 'app-team',
  templateUrl: 'team.page.html',
  styleUrls: ['team.page.scss'],
  imports: [
    DatePipe,
    IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonSearchbar,
    AvatarComponent, StatusBadgeComponent, EmptyStateComponent,
  ],
})
export class TeamPage {
  readonly auth        = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router      = inject(Router);

  readonly today = new Date();
  readonly search = signal('');
  readonly statusFilter = signal<StatusFilter>('all');

  readonly statusFilters: { label: string; value: StatusFilter }[] = [
    { label: 'All',     value: 'all'     },
    { label: 'Present', value: 'present' },
    { label: 'Late',    value: 'late'    },
    { label: 'Absent',  value: 'absent'  },
  ];

  readonly allMembers = computed<TeamMember[]>(() => {
    const STATUSES: ('present' | 'late' | 'absent')[] = ['present', 'present', 'present', 'late', 'absent'];
    const TIMES = ['09:02 AM', '08:55 AM', '09:30 AM', '10:15 AM', '—'];
    return this.userService.users()
      .filter(u => u.role !== 'admin')
      .map((u, i) => ({
        id:          u.id,
        name:        u.fullName,
        role:        u.role.charAt(0).toUpperCase() + u.role.slice(1),
        department:  u.department,
        status:      STATUSES[i % STATUSES.length],
        checkInTime: TIMES[i % TIMES.length],
      }));
  });

  readonly filtered = computed(() => {
    const q  = this.search().toLowerCase();
    const sf = this.statusFilter();
    return this.allMembers().filter(m => {
      const statusMatch = sf === 'all' || m.status === sf;
      const searchMatch = !q ||
        m.name.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q);
      return statusMatch && searchMatch;
    });
  });

  readonly stats = computed(() => {
    const members = this.allMembers();
    return {
      present: members.filter(m => m.status === 'present').length,
      late:    members.filter(m => m.status === 'late').length,
      absent:  members.filter(m => m.status === 'absent').length,
      total:   members.length,
    };
  });

  readonly pendingApprovals = 2;

  constructor() {
    addIcons({ peopleOutline, calendarOutline, chevronForwardOutline, checkmarkCircle, closeCircle, timeOutline });
  }

  goApprovals() {
    this.router.navigate(['/tabs/team/approvals']);
  }
}
