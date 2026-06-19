import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cardOutline, businessOutline, codeSlashOutline, qrCodeOutline,
  shieldCheckmarkOutline, informationCircleOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-bank-details',
  templateUrl: 'bank-details.page.html',
  styleUrls: ['bank-details.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonIcon,
  ],
})
export class BankDetailsPage {
  constructor() {
    addIcons({
      cardOutline, businessOutline, codeSlashOutline, qrCodeOutline,
      shieldCheckmarkOutline, informationCircleOutline,
    });
  }
}
