import { Component, computed, inject } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
  IonToggle, IonButton, IonSelect, IonSelectOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline, calendarOutline,
  businessOutline, peopleOutline, locationOutline, briefcaseOutline,
  notificationsOutline, lockClosedOutline, logOutOutline,
  chevronForwardOutline, idCardOutline,
  moonOutline, sunnyOutline, phonePortraitOutline,
} from 'ionicons/icons';
import { ThemeService, ThemeMode } from '../services/theme.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon,
    IonToggle, IonButton, IonSelect, IonSelectOption,
  ],
})
export class Tab3Page {
  readonly theme = inject(ThemeService);
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
      personOutline, mailOutline, callOutline, calendarOutline,
      businessOutline, peopleOutline, locationOutline, briefcaseOutline,
      notificationsOutline, lockClosedOutline, logOutOutline,
      chevronForwardOutline, idCardOutline,
      moonOutline, sunnyOutline, phonePortraitOutline,
    });
  }

  onThemeChange(mode: ThemeMode): void {
    this.theme.setMode(mode);
  }
}
