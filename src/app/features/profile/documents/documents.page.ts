import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline, downloadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-documents',
  templateUrl: 'documents.page.html',
  styleUrls: ['documents.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonIcon,
  ],
})
export class DocumentsPage {
  readonly docs = [
    { name: 'Offer Letter',            date: 'Jan 2024', size: '245 KB' },
    { name: 'Appointment Letter',      date: 'Jan 2024', size: '189 KB' },
    { name: 'ID Proof — Aadhaar',      date: 'Jan 2024', size: '1.2 MB' },
    { name: 'PAN Card',                date: 'Jan 2024', size: '320 KB' },
    { name: 'Experience Letter',       date: 'Dec 2023', size: '156 KB' },
    { name: 'Increment Letter FY25',   date: 'Apr 2025', size: '98 KB'  },
  ];

  constructor() {
    addIcons({ documentTextOutline, downloadOutline });
  }
}
