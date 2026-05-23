import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonIcon, IonList, IonItem, IonLabel, IonBadge,
  IonButton, IonNote,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cubeOutline, checkmarkCircleOutline, constructOutline,
  archiveOutline, addOutline, qrCodeOutline, listOutline,
  timeOutline,
} from 'ionicons/icons';

interface AssetStat {
  label: string;
  count: number;
  icon: string;
  color: string;
}

interface RecentAsset {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'maintenance' | 'retired';
  updatedAt: Date;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    DatePipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonCard, IonCardContent,
    IonIcon, IonList, IonItem, IonLabel, IonBadge,
    IonButton, IonNote,
  ],
})
export class Tab1Page {
  today = new Date();

  stats: AssetStat[] = [
    { label: 'Total Assets', count: 142, icon: 'cube-outline',              color: 'primary' },
    { label: 'Active',       count: 118, icon: 'checkmark-circle-outline',  color: 'success' },
    { label: 'Maintenance',  count: 17,  icon: 'construct-outline',         color: 'warning' },
    { label: 'Retired',      count: 7,   icon: 'archive-outline',           color: 'medium'  },
  ];

  recentAssets: RecentAsset[] = [
    { id: 'AST-001', name: 'Dell Laptop 15"',  category: 'IT Hardware', status: 'active',      updatedAt: new Date('2025-05-22') },
    { id: 'AST-047', name: 'Forklift Unit B',  category: 'Machinery',   status: 'maintenance', updatedAt: new Date('2025-05-21') },
    { id: 'AST-083', name: 'Office Chair Set', category: 'Furniture',   status: 'active',      updatedAt: new Date('2025-05-20') },
    { id: 'AST-112', name: 'HVAC Unit #3',     category: 'Facilities',  status: 'maintenance', updatedAt: new Date('2025-05-19') },
    { id: 'AST-130', name: 'Projector Epson',  category: 'IT Hardware', status: 'retired',     updatedAt: new Date('2025-05-18') },
  ];

  statusColor(status: RecentAsset['status']): string {
    const map: Record<RecentAsset['status'], string> = {
      active: 'success',
      maintenance: 'warning',
      retired: 'medium',
    };
    return map[status];
  }

  constructor() {
    addIcons({
      cubeOutline, checkmarkCircleOutline, constructOutline,
      archiveOutline, addOutline, qrCodeOutline, listOutline,
      timeOutline,
    });
  }
}
