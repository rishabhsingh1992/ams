import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, cashOutline, cardOutline, calendarOutline,
  documentTextOutline,
} from 'ionicons/icons';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon,
  ],
})
export class ProfilePage {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly initials = computed(() => {
    const name = this.auth.currentUser()?.name ?? '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  });

  readonly roleLabel = computed(() => ({
    employee: 'Employee',
    manager:  'Manager',
    admin:    'Administrator',
  }[this.auth.currentUser()?.role ?? 'employee']));

  readonly greeting = computed(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  });

  constructor() {
    addIcons({
      personOutline, cashOutline, cardOutline, calendarOutline,
      documentTextOutline,
    });
  }

  goPersonal():  void { this.router.navigate(['/tabs/profile/personal']); }
  goSalary():    void { this.router.navigate(['/tabs/profile/salary']); }
  goBank():      void { this.router.navigate(['/tabs/profile/bank']); }
  goLeave():     void { this.router.navigate(['/tabs/profile/leave-balances']); }
  goDocuments(): void { this.router.navigate(['/tabs/profile/documents']); }
}
