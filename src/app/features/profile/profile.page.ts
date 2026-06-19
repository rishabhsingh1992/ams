import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
  IonToggle, IonButton, IonSelect, IonSelectOption,
  IonFab, IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, cashOutline, cardOutline, calendarOutline,
  documentTextOutline, notificationsOutline, lockClosedOutline,
  logOutOutline, moonOutline, sunnyOutline, phonePortraitOutline,
  settingsOutline,
} from 'ionicons/icons';
import { ThemeService, ThemeMode } from '@core/services/theme.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon,
    IonToggle, IonButton, IonSelect, IonSelectOption,
    IonFab, IonFabButton,
  ],
})
export class ProfilePage {
  readonly theme  = inject(ThemeService);
  private readonly auth   = inject(AuthService);
  private readonly router = inject(Router);
  notificationsEnabled = true;

  readonly themeIcon = computed(() => ({
    system: 'phone-portrait-outline',
    light:  'sunny-outline',
    dark:   'moon-outline',
  }[this.theme.mode()]));

  readonly themeLabel = computed(() => ({
    system: 'System Default',
    light:  'Light',
    dark:   'Dark',
  }[this.theme.mode()]));

  constructor() {
    addIcons({
      personOutline, cashOutline, cardOutline, calendarOutline,
      documentTextOutline, notificationsOutline, lockClosedOutline,
      logOutOutline, moonOutline, sunnyOutline, phonePortraitOutline,
      settingsOutline,
    });
  }

  onThemeChange(mode: ThemeMode): void {
    this.theme.setMode(mode);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  goSettings(): void { this.router.navigate(['/tabs/settings']); }
  goPersonal():  void { this.router.navigate(['/tabs/profile/personal']); }
  goSalary():    void { this.router.navigate(['/tabs/profile/salary']); }
  goBank():      void { this.router.navigate(['/tabs/profile/bank']); }
  goLeave():     void { this.router.navigate(['/tabs/profile/leave-balances']); }
  goDocuments(): void { this.router.navigate(['/tabs/profile/documents']); }
}
