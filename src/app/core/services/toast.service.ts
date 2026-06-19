import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly ctrl = inject(ToastController);

  async success(message: string) {
    await this.show(message, 'success');
  }

  async error(message: string) {
    await this.show(message, 'danger');
  }

  async info(message: string) {
    await this.show(message, 'primary');
  }

  async warning(message: string) {
    await this.show(message, 'warning');
  }

  private async show(message: string, color: string) {
    const toast = await this.ctrl.create({
      message,
      color,
      duration: 2500,
      position: 'top',
      swipeGesture: 'vertical',
    });
    await toast.present();
  }
}
