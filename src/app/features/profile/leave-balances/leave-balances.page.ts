import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { leafOutline, medkitOutline, sunnyOutline, trophyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-leave-balances',
  templateUrl: 'leave-balances.page.html',
  styleUrls: ['leave-balances.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonIcon,
  ],
})
export class LeaveBalancesPage {
  readonly leaves = [
    { label: 'Earned Leave',  icon: 'leaf-outline',    remaining: 20, used: 4,  total: 24, color: 'blue'   },
    { label: 'Sick Leave',    icon: 'medkit-outline',  remaining:  9, used: 3,  total: 12, color: 'green'  },
    { label: 'Casual Leave',  icon: 'sunny-outline',   remaining:  6, used: 2,  total:  8, color: 'orange' },
    { label: 'Comp-off',      icon: 'trophy-outline',  remaining:  1, used: 0,  total:  1, color: 'purple' },
  ];

  constructor() {
    addIcons({ leafOutline, medkitOutline, sunnyOutline, trophyOutline });
  }
}
