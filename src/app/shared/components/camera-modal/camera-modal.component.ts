import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonContent, IonTitle, IonButtons, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, cameraReverseOutline } from 'ionicons/icons';
import { CameraPreview } from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss'],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonContent, IonTitle, IonButtons, IonButton, IonIcon
  ],
  standalone: true
})
export class CameraModalComponent implements OnDestroy {
  @Input() pendingAction: 'check-in' | 'check-out' | null = null;
  @Output() capture = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('previewArea', { static: false }) previewArea!: ElementRef<HTMLElement>;

  isCameraActive = false;
  isCapturing = false;

  constructor() {
    addIcons({ closeOutline, cameraReverseOutline });
  }

  async start() {
    if (this.isCameraActive) return;

    try {
      const el = this.previewArea.nativeElement;
      const rect = el.getBoundingClientRect();

      await CameraPreview.start({
        position: 'front',
        toBack: false,
        disableAudio: true,
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
      this.isCameraActive = true;
    } catch (err) {
      console.error('Error starting camera preview:', err);
    }
  }

  async stop() {
    if (!this.isCameraActive) return;

    try {
      await CameraPreview.stop();
      this.isCameraActive = false;
    } catch (err) {
      console.error('Error stopping camera preview:', err);
    }
  }

  async onFlip() {
    if (!this.isCameraActive) return;
    try {
      await CameraPreview.flip();
    } catch (err) {
      console.error('Error flipping camera:', err);
    }
  }

  async onCapture() {
    if (!this.isCameraActive || this.isCapturing) return;

    try {
      this.isCapturing = true;
      await CameraPreview.capture({ quality: 85 });
      await this.stop();
      this.isCapturing = false;
      this.capture.emit();
    } catch (err) {
      this.isCapturing = false;
      console.error('Error capturing image:', err);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  async ngOnDestroy() {
    await this.stop();
  }
}
