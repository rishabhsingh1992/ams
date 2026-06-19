import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cashOutline, walletOutline, businessOutline, starOutline,
  removeCircleOutline, trendingDownOutline, documentTextOutline, downloadOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-salary-details',
  templateUrl: 'salary-details.page.html',
  styleUrls: ['salary-details.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonIcon,
  ],
})
export class SalaryDetailsPage {
  readonly payslips = [
    { month: 'May 2025', net: '₹86,467' },
    { month: 'Apr 2025', net: '₹86,467' },
    { month: 'Mar 2025', net: '₹86,467' },
  ];

  constructor() {
    addIcons({
      cashOutline, walletOutline, businessOutline, starOutline,
      removeCircleOutline, trendingDownOutline, documentTextOutline, downloadOutline,
    });
  }
}
