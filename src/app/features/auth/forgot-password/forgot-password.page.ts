import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonInput, IonButton, IonIcon, IonNote, IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  phonePortraitOutline, arrowBackOutline, checkmarkCircleOutline, refreshOutline,
} from 'ionicons/icons';

type Step = 'phone' | 'otp' | 'success';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.page.html',
  styleUrls: ['forgot-password.page.scss'],
  imports: [FormsModule, IonContent, IonInput, IonButton, IonIcon, IonNote, IonSpinner],
})
export class ForgotPasswordPage {
  private router = inject(Router);

  step = signal<Step>('phone');
  phone = '';
  otp = '';
  phoneError = '';
  otpError = '';
  loading = signal(false);

  constructor() {
    addIcons({ phonePortraitOutline, arrowBackOutline, checkmarkCircleOutline, refreshOutline });
  }

  sendOtp() {
    this.phoneError = '';
    const p = this.phone.trim();
    if (!p) return;
    if (!/^\d{10}$/.test(p.replace(/\s/g, ''))) {
      this.phoneError = 'Enter a valid 10-digit phone number.';
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.step.set('otp');
    }, 1200);
  }

  verifyOtp() {
    this.otpError = '';
    if (this.otp.trim().length < 4) {
      this.otpError = 'Enter the 4-digit OTP sent to your phone.';
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.step.set('success');
    }, 1000);
  }

  resendOtp() {
    this.otp = '';
    this.otpError = '';
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 800);
  }

  goBack() {
    if (this.step() === 'phone') {
      this.router.navigate(['/auth/login'], { replaceUrl: true });
    } else if (this.step() === 'otp') {
      this.step.set('phone');
    } else {
      this.router.navigate(['/auth/login'], { replaceUrl: true });
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }
}
