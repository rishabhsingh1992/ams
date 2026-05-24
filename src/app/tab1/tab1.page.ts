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
  timeOutline, locationOutline, refreshOutline
} from 'ionicons/icons';
import { CameraPreviewComponent } from '../shared/components/camera-preview/camera-preview.component';
import { Geolocation } from '@capacitor/geolocation';

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
    IonHeader, IonToolbar, IonContent, IonFooter,
    IonIcon, IonButton,
    CameraPreviewComponent,
  ],
})
export class Tab1Page implements OnInit {
  private toastCtrl = inject(ToastController);
  private router    = inject(Router);
  @ViewChild(CameraPreviewComponent) cameraComp?: CameraPreviewComponent;

  today        = new Date();
  checkStatus: CheckStatus = 'not-started';
  checkInTime  = '';
  checkOutTime = '';
  hoursWorked  = '';

  // Geolocation tracking state variables
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
    this.acquireLocation(); // Automatically fetch location on load
  }

  ionViewDidEnter() { this.cameraComp?.start(); }

  ionViewWillLeave() { this.cameraComp?.stop(); }

  onCheckIn() {
    if (!this.latitude || !this.longitude) {
      this.showToast('Precise GPS location is required before you can clock in.');
      this.acquireLocation(); // Re-trigger location acquisition
      return;
    }
    this.pendingAction = 'check-in';
    this.cameraComp?.onCapture();
  }

  onCheckOut() {
    if (!this.latitude || !this.longitude) {
      this.showToast('Precise GPS location is required before you can clock out.');
      this.acquireLocation(); // Re-trigger location acquisition
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
    this.router.navigateByUrl('/tabs/tab2');
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

  // Returns the current time formatted as a friendly string (e.g. "09:30 AM")
  private nowFormatted(): string {
    const date = new Date();
    const rawHours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM
    const ampm = rawHours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour format
    let hours12 = rawHours % 12;
    if (hours12 === 0) {
      hours12 = 12; // 0 hours in 12-hour format represents 12
    }

    // Add leading zeros if numbers are single digit (e.g., "9" becomes "09")
    const formattedHours = String(hours12).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  // Calculates the total hours and minutes worked between Clock In and Clock Out
  private calcHours(inTime: string, outTime: string): string {
    const startMinutes = this.convertTimeToMinutes(inTime);
    const endMinutes = this.convertTimeToMinutes(outTime);
    
    const timeDifference = endMinutes - startMinutes;
    
    // If calculation goes negative or equals 0, return default placeholder
    if (timeDifference <= 0) {
      return '0h 0m';
    }
    
    const hours = Math.floor(timeDifference / 60);
    const minutes = timeDifference % 60;
    
    return `${hours}h ${minutes}m`;
  }

  // Helper function that parses a time string (e.g. "09:30 AM") and returns total minutes since midnight
  private convertTimeToMinutes(timeString: string): number {
    // Split time into [timePart, ampmPart] (e.g. "09:30" and "AM")
    const parts = timeString.split(' ');
    const timePart = parts[0];
    const ampmPart = parts[1];

    // Split hour and minute (e.g. "09" and "30")
    const timeNumbers = timePart.split(':');
    const hours = Number(timeNumbers[0]);
    const minutes = Number(timeNumbers[1]);

    // Convert hours to 24-hour format
    let hours24 = hours;
    if (ampmPart === 'PM') {
      if (hours !== 12) {
        hours24 = hours + 12; // Add 12 hours for PM times, unless it's 12 PM
      }
    } else if (ampmPart === 'AM') {
      if (hours === 12) {
        hours24 = 0; // 12 AM is midnight (0 hours in 24-hour format)
      }
    }

    // Compute total minutes since midnight
    const totalMinutes = (hours24 * 60) + minutes;
    return totalMinutes;
  }

  // Requests the current GPS coordinates of the device (Location is required before checking in/out)
  async acquireLocation() {
    this.isAcquiringLocation = true;
    this.locationError = null;

    try {
      // 1. Check current Geolocation permission status
      let permissions = await Geolocation.checkPermissions();

      // If permissions are not granted or promptable, request them
      if (permissions.location === 'prompt' || permissions.location === 'denied' || 
          permissions.coarseLocation === 'prompt' || permissions.coarseLocation === 'denied') {
        permissions = await Geolocation.requestPermissions({
          permissions: ['location', 'coarseLocation']
        });
      }

      // 2. Enforce precise location permission (Android 12+)
      // If fine location (location) is not granted, but coarse (approximate) is, the user chose "Approximate"
      if (permissions.location !== 'granted' && permissions.coarseLocation === 'granted') {
        this.latitude = null;
        this.longitude = null;
        this.locationError = 'Approximate permission rejected';
        this.isAcquiringLocation = false;
        this.showToast('Precise location is required. Please enable "Precise" location in your device settings.');
        return;
      }

      // If neither is granted, block completely
      if (permissions.location !== 'granted' && permissions.coarseLocation !== 'granted') {
        this.latitude = null;
        this.longitude = null;
        this.locationError = 'Permission denied';
        this.isAcquiringLocation = false;
        this.showToast('Location permission is required to Clock In/Out. Please grant location access.');
        return;
      }

      // 3. Fetch current precise coordinates using hardware GPS (enableHighAccuracy: true)
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true, // Forces precise GPS hardware usage on the device
        timeout: 10000 // Stop waiting after 10 seconds if GPS is slow
      });
      
      const gpsAccuracy = coordinates.coords.accuracy;
      const MAX_ACCURACY_LIMIT = 50; // Maximum allowed inaccuracy (in meters) for high precision GPS

      // 4. Double check coordinate accuracy to filter out any remaining coarse/approximate cached readings
      if (gpsAccuracy > MAX_ACCURACY_LIMIT) {
        this.latitude = null;
        this.longitude = null;
        this.locationError = 'Approximate location rejected';
        this.isAcquiringLocation = false;
        this.showToast('Precise location is required. Please turn on Precise Location in system settings.');
        return;
      }
      
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.isAcquiringLocation = false;
    } catch (error) {
      this.isAcquiringLocation = false;
      this.locationError = 'Failed to get location';
      this.latitude = null;
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
