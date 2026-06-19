import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonFab, IonFabButton, IonIcon, IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, personOutline } from 'ionicons/icons';
import { UserService } from '@core/services/user.service';
import { UserRole } from '@core/models/user.model';

type FilterRole = UserRole | 'all';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonFab, IonFabButton, IonIcon, IonToggle,
  ],
})
export class UsersPage {
  private readonly userService = inject(UserService);
  private readonly router      = inject(Router);

  readonly search = signal('');
  readonly filter = signal<FilterRole>('all');

  readonly filters: { label: string; value: FilterRole }[] = [
    { label: 'All',      value: 'all'      },
    { label: 'Employee', value: 'employee' },
    { label: 'Manager',  value: 'manager'  },
    { label: 'Admin',    value: 'admin'    },
  ];

  readonly filtered = computed(() => {
    const q = this.search().toLowerCase();
    const f = this.filter();
    return this.userService.users().filter(u => {
      const roleMatch   = f === 'all' || u.role === f;
      const searchMatch = !q ||
        u.fullName.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        u.employeeId.toLowerCase().includes(q);
      return roleMatch && searchMatch;
    });
  });

  constructor() { addIcons({ addOutline, personOutline }); }

  initials(name: string): string {
    return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  }

  toggleStatus(id: string, event: Event): void {
    event.stopPropagation();
    this.userService.toggleStatus(id);
  }

  openEdit(id: string): void {
    this.router.navigate(['/tabs/users', id, 'edit']);
  }

  addUser(): void {
    this.router.navigate(['/tabs/users/add']);
  }
}
