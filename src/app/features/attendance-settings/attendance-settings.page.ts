import { Component, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon, IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  timeOutline, calendarOutline, timerOutline, trendingUpOutline,
  locationOutline, cameraOutline, scanOutline, powerOutline,
  alertCircleOutline, stopwatchOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-attendance-settings',
  templateUrl: 'attendance-settings.page.html',
  styleUrls: ['attendance-settings.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonIcon, IonToggle,
  ],
})
export class AttendanceSettingsPage {
  // Work Schedule
  shiftStart   = '09:00 AM';
  shiftEnd     = '06:00 PM';
  workingDays  = 'Mon – Sat';

  // Attendance Rules
  gracePeriod      = '15 minutes';
  halfDayThreshold = '4 hours';
  overtimeAfter    = '9 hours';

  // Check-in Policy
  gpsRequired     = signal(true);
  selfieRequired  = signal(true);
  geofenceEnabled = signal(false);
  officeRadius    = '200 m';

  // Auto Actions
  autoCheckout     = signal(false);
  autoCheckoutTime = '11:59 PM';
  autoMarkAbsent   = signal(false);

  constructor() {
    addIcons({
      timeOutline, calendarOutline, timerOutline, trendingUpOutline,
      locationOutline, cameraOutline, scanOutline, powerOutline,
      alertCircleOutline, stopwatchOutline,
    });
  }
}
