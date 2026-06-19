import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular/standalone';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
  IonToggle, IonButton, IonSelect, IonSelectOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, businessOutline, peopleOutline, timerOutline,
  shieldCheckmarkOutline, notificationsOutline, lockClosedOutline,
  logOutOutline, moonOutline, sunnyOutline, phonePortraitOutline,
  ribbonOutline, locationOutline, calendarOutline,
} from 'ionicons/icons';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { ThemeService, ThemeMode } from '@core/services/theme.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: 'admin-profile.page.html',
  styleUrls:  ['admin-profile.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon,
    IonToggle, IonButton, IonSelect, IonSelectOption,
  ],
})
export class AdminProfilePage {
  private readonly nav    = inject(NavController);
  private readonly router = inject(Router);
  private readonly toast  = inject(ToastService);
  readonly auth           = inject(AuthService);
  readonly userService    = inject(UserService);
  readonly theme          = inject(ThemeService);

  notificationsEnabled = true;

  readonly initials = computed(() => {
    const name = this.auth.currentUser()?.name ?? '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  });

  readonly org = {
    name:     'Acme Technologies Pvt. Ltd.',
    industry: 'Information Technology',
    location: 'Bengaluru, Karnataka',
    founded:  '2018',
    plan:     'Professional',
  };

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
      personOutline, businessOutline, peopleOutline, timerOutline,
      shieldCheckmarkOutline, notificationsOutline, lockClosedOutline,
      logOutOutline, moonOutline, sunnyOutline, phonePortraitOutline,
      ribbonOutline, locationOutline, calendarOutline,
    });
  }

  onThemeChange(mode: ThemeMode): void {
    this.theme.setMode(mode);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  goPersonal():        void { this.nav.navigateForward('/tabs/profile/personal'); }
  goAttendanceRules(): void { this.nav.navigateForward('/tabs/attendance-settings'); }
  comingSoon():        void { this.toast.info('Coming soon'); }
}
