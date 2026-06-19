import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline, calendarOutline,
  heartOutline, locationOutline, peopleOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-personal-details',
  templateUrl: 'personal-details.page.html',
  styleUrls: ['personal-details.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonIcon,
  ],
})
export class PersonalDetailsPage {
  constructor() {
    addIcons({
      personOutline, mailOutline, callOutline, calendarOutline,
      heartOutline, locationOutline, peopleOutline,
    });
  }
}
