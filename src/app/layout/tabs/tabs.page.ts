import { Component, EnvironmentInjector, computed, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  gridOutline, fingerPrintOutline, personOutline,
  peopleOutline, documentTextOutline, personAddOutline, settingsOutline,
} from 'ionicons/icons';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  readonly auth = inject(AuthService);

  readonly homeTab = computed(() => {
    const role = this.auth.currentUser()?.role;
    if (role === 'admin')   return 'dashboard';
    if (role === 'manager') return 'manager-home';
    return 'home';
  });

  readonly homeHref = computed(() => `/tabs/${this.homeTab()}`);

  constructor() {
    addIcons({
      gridOutline, fingerPrintOutline, personOutline,
      peopleOutline, documentTextOutline, personAddOutline, settingsOutline,
    });
  }
}
