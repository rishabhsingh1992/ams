import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonContent,
  IonCard, IonCardContent, IonIcon, IonButton,
  IonModal, ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logInOutline, logOutOutline, calendarOutline,
  notificationsOutline, checkmarkCircleOutline,
} from 'ionicons/icons';
import { CameraModalComponent } from '../shared/components/camera-modal/camera-modal.component';

type CheckStatus = 'not-started' | 'checked-in' | 'checked-out';

const STORAGE_KEY = 'ams_today';

interface TodayRecord {
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: CheckStatus;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    DatePipe,
    IonHeader, IonToolbar, IonContent,
    IonCard, IonCardContent, IonIcon, IonButton,
    IonModal, CameraModalComponent,
  ],
})
export class Tab1Page implements OnInit {
  private toastCtrl = inject(ToastController);
  @ViewChild(CameraModalComponent) cameraModalComponent?: CameraModalComponent;

  today        = new Date();
  checkStatus: CheckStatus = 'not-started';
  checkInTime  = '';
  checkOutTime = '';
  hoursWorked  = '';
  isCameraModalOpen = false;

  pendingAction: 'check-in' | 'check-out' | null = null;

  get statusLabel(): string {
    return ({ 'not-started': 'Not Checked In', 'checked-in': 'Active', 'checked-out': 'Checked Out' })[this.checkStatus];
  }

  get statusColor(): string {
    return ({ 'not-started': '#8C8C8C', 'checked-in': '#2DD36F', 'checked-out': '#3880FF' })[this.checkStatus];
  }

  constructor() {
    addIcons({ logInOutline, logOutOutline, calendarOutline, notificationsOutline, checkmarkCircleOutline });
  }

  ngOnInit() { this.loadFromStorage(); }

  onCheckIn() {
    this.pendingAction = 'check-in';
    this.isCameraModalOpen = true;
  }

  onCheckOut() {
    this.pendingAction = 'check-out';
    this.isCameraModalOpen = true;
  }

  onCapture() {
    this.isCameraModalOpen = false;
    this.applyAction(this.nowFormatted());
  }

  onCameraCancel() {
    this.isCameraModalOpen = false;
    this.pendingAction = null;
  }

  onCameraModalPresent() {
    this.cameraModalComponent?.start();
  }

  onCameraModalDismiss() {
    this.cameraModalComponent?.stop();
    this.isCameraModalOpen = false;
    this.pendingAction = null;
  }

  private applyAction(time: string) {
    if (this.pendingAction === 'check-in') {
      this.checkInTime  = time;
      this.checkOutTime = '';
      this.hoursWorked  = '';
      this.checkStatus  = 'checked-in';
      this.showToast(`Checked in at ${time}`);
    } else if (this.pendingAction === 'check-out') {
      this.checkOutTime = time;
      this.checkStatus  = 'checked-out';
      this.hoursWorked  = this.calcHours(this.checkInTime, time);
      this.showToast(`Checked out at ${time}`);
    }
    this.saveToStorage();
    this.pendingAction = null;
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const record: TodayRecord = JSON.parse(raw);
    const todayStr = this.today.toISOString().split('T')[0];

    if (record.date !== todayStr) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    this.checkInTime  = record.checkInTime;
    this.checkOutTime = record.checkOutTime;
    this.checkStatus  = record.status;
    if (this.checkInTime && this.checkOutTime) {
      this.hoursWorked = this.calcHours(this.checkInTime, this.checkOutTime);
    }
  }

  private saveToStorage() {
    const record: TodayRecord = {
      date:         this.today.toISOString().split('T')[0],
      checkInTime:  this.checkInTime,
      checkOutTime: this.checkOutTime,
      status:       this.checkStatus,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  }

  private nowFormatted(): string {
    const d    = new Date();
    const h    = d.getHours();
    const m    = d.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12  = h % 12 || 12;
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  private calcHours(inTime: string, outTime: string): string {
    const toMin = (t: string) => {
      const [hm, period] = t.split(' ');
      const [h, m]       = hm.split(':').map(Number);
      const h24 = period === 'PM' && h !== 12 ? h + 12 : period === 'AM' && h === 12 ? 0 : h;
      return h24 * 60 + m;
    };
    const diff = toMin(outTime) - toMin(inTime);
    if (diff <= 0) return '0h 0m';
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  }

  private async showToast(message: string) {
    const t = await this.toastCtrl.create({ message, duration: 2000, position: 'bottom', color: 'dark' });
    await t.present();
  }
}
