import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonContent, IonFooter,
  IonIcon, IonButton,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logInOutline, logOutOutline,
  notificationsOutline, checkmarkCircleOutline,
  timeOutline, locationOutline, refreshOutline,
} from 'ionicons/icons';
import { CameraPreviewComponent } from '@shared/components/camera-preview/camera-preview.component';
import { Geolocation } from '@capacitor/geolocation';
import { CheckStatus, TodayRecord } from '@core/models/attendance.model';

const STORAGE_KEY = 'ams_today';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    DatePipe,
    IonHeader, IonToolbar, IonContent, IonFooter,
    IonIcon, IonButton,
    CameraPreviewComponent,
  ],
})
export class HomePage implements OnInit {
  private toastCtrl = inject(ToastController);
  private router    = inject(Router);
  @ViewChild(CameraPreviewComponent) cameraComp?: CameraPreviewComponent;

  today        = new Date();
  checkStatus: CheckStatus = 'not-started';
  checkInTime  = '';
  checkOutTime = '';
  hoursWorked  = '';

  latitude: number | null = null;
  longitude: number | null = null;
  isAcquiringLocation = false;
  locationError: string | null = null;

  private pendingAction: 'check-in' | 'check-out' | null = null;

  get statusLabel(): string {
    return ({ 'not-started': 'Not Clocked In', 'checked-in': 'Active', 'checked-out': 'Clocked Out' })[this.checkStatus];
  }

  get statusColor(): string {
    return ({ 'not-started': '#8C8C8C', 'checked-in': '#2DD36F', 'checked-out': '#3880FF' })[this.checkStatus];
  }

  constructor() {
    addIcons({ logInOutline, logOutOutline, notificationsOutline, checkmarkCircleOutline, timeOutline, locationOutline, refreshOutline });
  }

  ngOnInit() {
    this.loadFromStorage();
    this.acquireLocation();
  }

  ionViewDidEnter() { this.cameraComp?.start(); }

  ionViewWillLeave() { this.cameraComp?.stop(); }

  onCheckIn() {
    if (!this.latitude || !this.longitude) {
      this.showToast('Precise GPS location is required before you can clock in.');
      this.acquireLocation();
      return;
    }
    this.pendingAction = 'check-in';
    this.cameraComp?.onCapture();
  }

  onCheckOut() {
    if (!this.latitude || !this.longitude) {
      this.showToast('Precise GPS location is required before you can clock out.');
      this.acquireLocation();
      return;
    }
    this.pendingAction = 'check-out';
    this.cameraComp?.onCapture();
  }

  onCapture() {
    this.applyAction(this.nowFormatted());
  }

  private applyAction(time: string) {
    if (this.pendingAction === 'check-in') {
      this.checkInTime  = time;
      this.checkOutTime = '';
      this.hoursWorked  = '';
      this.checkStatus  = 'checked-in';
      this.showToast(`Clocked in at ${time}`);
    } else if (this.pendingAction === 'check-out') {
      this.checkOutTime = time;
      this.checkStatus  = 'checked-out';
      this.hoursWorked  = this.calcHours(this.checkInTime, time);
      this.showToast(`Clocked out at ${time}`);
    }
    this.saveToStorage();
    this.pendingAction = null;
    this.router.navigateByUrl('/tabs/attendance');
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
    const date = new Date();
    const rawHours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = rawHours >= 12 ? 'PM' : 'AM';
    let hours12 = rawHours % 12;
    if (hours12 === 0) hours12 = 12;
    return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  }

  private calcHours(inTime: string, outTime: string): string {
    const startMinutes = this.convertTimeToMinutes(inTime);
    const endMinutes   = this.convertTimeToMinutes(outTime);
    const diff = endMinutes - startMinutes;
    if (diff <= 0) return '0h 0m';
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  }

  private convertTimeToMinutes(timeString: string): number {
    const [timePart, ampmPart] = timeString.split(' ');
    const [h, m] = timePart.split(':').map(Number);
    let h24 = h;
    if (ampmPart === 'PM' && h !== 12) h24 = h + 12;
    if (ampmPart === 'AM' && h === 12) h24 = 0;
    return h24 * 60 + m;
  }

  async acquireLocation() {
    this.isAcquiringLocation = true;
    this.locationError = null;

    try {
      let permissions = await Geolocation.checkPermissions();

      if (permissions.location === 'prompt' || permissions.location === 'denied' ||
          permissions.coarseLocation === 'prompt' || permissions.coarseLocation === 'denied') {
        permissions = await Geolocation.requestPermissions({ permissions: ['location', 'coarseLocation'] });
      }

      if (permissions.location !== 'granted' && permissions.coarseLocation === 'granted') {
        this.latitude = null;
        this.longitude = null;
        this.locationError = 'Approximate permission rejected';
        this.isAcquiringLocation = false;
        this.showToast('Precise location is required. Please enable "Precise" location in your device settings.');
        return;
      }

      if (permissions.location !== 'granted' && permissions.coarseLocation !== 'granted') {
        this.latitude = null;
        this.longitude = null;
        this.locationError = 'Permission denied';
        this.isAcquiringLocation = false;
        this.showToast('Location permission is required to Clock In/Out. Please grant location access.');
        return;
      }

      const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
      const MAX_ACCURACY_LIMIT = 50;

      if (coordinates.coords.accuracy > MAX_ACCURACY_LIMIT) {
        this.latitude = null;
        this.longitude = null;
        this.locationError = 'Approximate location rejected';
        this.isAcquiringLocation = false;
        this.showToast('Precise location is required. Please turn on Precise Location in system settings.');
        return;
      }

      this.latitude  = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.isAcquiringLocation = false;
    } catch (error) {
      this.isAcquiringLocation = false;
      this.locationError = 'Failed to get location';
      this.latitude  = null;
      this.longitude = null;
      this.showToast('Precise location coordinates are required. Please enable GPS and allow location access.');
      console.error('Error fetching GPS geolocation:', error);
    }
  }

  private async showToast(message: string) {
    const t = await this.toastCtrl.create({ message, duration: 2000, position: 'bottom', color: 'dark' });
    await t.present();
  }
}
