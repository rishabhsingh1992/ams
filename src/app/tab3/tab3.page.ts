import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
  IonToggle, IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline, calendarOutline,
  businessOutline, peopleOutline, locationOutline, briefcaseOutline,
  notificationsOutline, lockClosedOutline, logOutOutline,
  chevronForwardOutline, idCardOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon,
    IonToggle, IonButton,
  ],
})
export class Tab3Page {
  notificationsEnabled = true;

  constructor() {
    addIcons({
      personOutline, mailOutline, callOutline, calendarOutline,
      businessOutline, peopleOutline, locationOutline, briefcaseOutline,
      notificationsOutline, lockClosedOutline, logOutOutline,
      chevronForwardOutline, idCardOutline,
    });
  }
}
