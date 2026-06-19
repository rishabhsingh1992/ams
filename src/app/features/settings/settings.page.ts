import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon, IonToggle,
} from '@ionic/angular/standalone';
import { AuthService } from '@core/services/auth.service';
import { addIcons } from 'ionicons';
import {
  barChartOutline, notificationsOutline, moonOutline, sunnyOutline,
  phonePortraitOutline, lockClosedOutline, fingerPrintOutline,
  shieldCheckmarkOutline, informationCircleOutline, documentTextOutline,
  helpCircleOutline, logOutOutline, chevronForwardOutline, timeOutline,
} from 'ionicons/icons';
import { ThemeService, ThemeMode } from '@core/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonIcon, IonToggle,
  ],
})
export class SettingsPage {
  readonly theme  = inject(ThemeService);
  private  auth   = inject(AuthService);
  private  router = inject(Router);

  notificationsEnabled = true;
  biometricsEnabled    = false;

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
      barChartOutline, notificationsOutline, moonOutline, sunnyOutline,
      phonePortraitOutline, lockClosedOutline, fingerPrintOutline,
      shieldCheckmarkOutline, informationCircleOutline, documentTextOutline,
      helpCircleOutline, logOutOutline, chevronForwardOutline, timeOutline,
    });
  }

  cyclTheme() {
    const next: Record<ThemeMode, ThemeMode> = { system: 'dark', dark: 'light', light: 'system' };
    this.theme.setMode(next[this.theme.mode()]);
  }

  goReports() {
    this.router.navigate(['/tabs/reports']);
  }

  goAttendanceSettings() {
    this.router.navigate(['/tabs/attendance-settings']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }
}
