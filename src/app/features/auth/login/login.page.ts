import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonInput, IonButton, IonIcon, IonNote,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { phonePortraitOutline, arrowForwardOutline } from 'ionicons/icons';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [FormsModule, IonContent, IonInput, IonButton, IonIcon, IonNote],
})
export class LoginPage {
  private auth   = inject(AuthService);
  private router = inject(Router);

  phone    = '';
  errorMsg = '';

  constructor() {
    addIcons({ phonePortraitOutline, arrowForwardOutline });
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/tabs/home'], { replaceUrl: true });
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
    this.router.navigate(['/tabs/home'], { replaceUrl: true });
  }
}
