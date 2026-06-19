import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline, calendarNumberOutline, timeOutline, filterOutline,
  leafOutline, documentTextOutline, clipboardOutline,
  peopleOutline, statsChartOutline, alertCircleOutline,
  downloadOutline, mailOutline, chevronForwardOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-reports',
  templateUrl: 'reports.page.html',
  styleUrls: ['reports.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon,
  ],
})
export class ReportsPage {
  constructor() {
    addIcons({
      calendarOutline, calendarNumberOutline, timeOutline, filterOutline,
      leafOutline, documentTextOutline, clipboardOutline,
      peopleOutline, statsChartOutline, alertCircleOutline,
      downloadOutline, mailOutline, chevronForwardOutline,
    });
  }
}
