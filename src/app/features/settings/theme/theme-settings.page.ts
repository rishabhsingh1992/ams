import { Component, inject } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  phonePortraitOutline, sunnyOutline, moonOutline, checkmarkOutline,
} from 'ionicons/icons';
import { ThemeService, ThemeMode } from '@core/services/theme.service';

@Component({
  selector: 'app-theme-settings',
  templateUrl: 'theme-settings.page.html',
  styleUrls: ['theme-settings.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonList, IonItem, IonLabel, IonIcon,
  ],
})
export class ThemeSettingsPage {
  readonly theme = inject(ThemeService);

  readonly options: { value: ThemeMode; label: string; desc: string; icon: string; color: string }[] = [
    { value: 'system', label: 'System Default', desc: 'Follows your device setting',  icon: 'phone-portrait-outline', color: 'blue'   },
    { value: 'light',  label: 'Light',          desc: 'Always use light appearance',  icon: 'sunny-outline',          color: 'orange' },
    { value: 'dark',   label: 'Dark',           desc: 'Always use dark appearance',   icon: 'moon-outline',           color: 'purple' },
  ];

  constructor() {
    addIcons({ phonePortraitOutline, sunnyOutline, moonOutline, checkmarkOutline });
  }

  select(mode: ThemeMode): void {
    this.theme.setMode(mode);
  }
}
