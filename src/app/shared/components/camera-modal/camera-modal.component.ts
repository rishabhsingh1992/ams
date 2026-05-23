import { Component, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraReverseOutline } from 'ionicons/icons';
import { CameraPreview } from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss'],
  imports: [IonIcon],
  standalone: true
})
export class CameraModalComponent implements OnDestroy {
  @Output() capture = new EventEmitter<void>();

  @ViewChild('previewArea', { static: false }) previewArea!: ElementRef<HTMLElement>;

  isCameraActive = false;
  isCapturing = false;

  constructor() {
    addIcons({ cameraReverseOutline });
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
      this.isCapturing = false;
      this.capture.emit();
    } catch (err) {
      this.isCapturing = false;
      console.error('Error capturing image:', err);
    }
  }

  async ngOnDestroy() {
    await this.stop();
  }
}
