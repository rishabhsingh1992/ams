import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonFab, IonFabButton, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, searchOutline, closeOutline } from 'ionicons/icons';
import { UserService } from '@core/services/user.service';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonFab, IonFabButton, IonIcon,
    AvatarComponent, EmptyStateComponent,
  ],
})
export class UsersPage {
  private readonly userService = inject(UserService);
  private readonly router      = inject(Router);

  readonly search     = signal('');
  readonly showSearch = signal(false);

  readonly filtered = computed(() => {
    const q = this.search().toLowerCase();
    if (!q) return this.userService.users();
    return this.userService.users().filter(u =>
      u.fullName.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q) ||
      u.employeeId.toLowerCase().includes(q)
    );
  });

  constructor() { addIcons({ chevronForwardOutline, searchOutline, closeOutline }); }

  toggleSearch(): void {
    this.showSearch.update(v => !v);
    if (!this.showSearch()) this.search.set('');
  }

  closeSearch(): void {
    this.showSearch.set(false);
    this.search.set('');
  }

  openEdit(id: string): void {
    this.router.navigate(['/tabs/users', id, 'edit']);
  }

}
