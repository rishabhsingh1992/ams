import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonInput, IonButton, IonIcon, IonNote,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { phonePortraitOutline, arrowForwardOutline } from 'ionicons/icons';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [FormsModule, IonContent, IonInput, IonButton, IonIcon, IonNote],
})
export class LoginPage {
  private auth        = inject(AuthService);
  private router      = inject(Router);
  private userService = inject(UserService);

  phone    = '';
  errorMsg = '';

  constructor() {
    addIcons({ phonePortraitOutline, arrowForwardOutline });
    this.userService.restoreSeed();
    if (this.auth.isLoggedIn()) {
      this.router.navigate([this.homeRoute()], { replaceUrl: true });
    }
  }

  login() {
    this.errorMsg = '';
    const phone = this.phone.trim();
    if (!phone) return;

    const ok = this.auth.login(phone);
    if (!ok) {
      this.errorMsg = 'Phone number not recognised. Please try again.';
      return;
    }
    this.router.navigate([this.homeRoute()], { replaceUrl: true });
  }

  forgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  private homeRoute(): string {
    const role = this.auth.currentUser()?.role;
    if (role === 'admin')   return '/tabs/dashboard';
    if (role === 'manager') return '/tabs/manager-home';
    return '/tabs/home';
  }
}
