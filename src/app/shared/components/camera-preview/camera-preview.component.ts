import { Component, EventEmitter, Output, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraReverseOutline, checkmarkOutline, refreshOutline } from 'ionicons/icons';
import { CameraPreview } from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.scss'],
  imports: [IonIcon],
  standalone: true
})
export class CameraPreviewComponent implements OnDestroy {
  @Output() capture = new EventEmitter<void>();

  @ViewChild('previewArea', { static: false }) previewArea!: ElementRef<HTMLElement>;

  private cdr = inject(ChangeDetectorRef);

  isCameraActive = false;
  isCapturing    = false;
  capturedImage: string | null = null;

  constructor() {
    addIcons({ cameraReverseOutline, checkmarkOutline, refreshOutline });
  }

  async start() {
    if (this.isCameraActive) return;
    try {
      const el   = this.previewArea.nativeElement;
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
      console.error('Camera start error:', err);
    }
  }

  async stop() {
    if (!this.isCameraActive) return;
    try {
      await CameraPreview.stop();
      this.isCameraActive = false;
    } catch (err) {
      console.error('Camera stop error:', err);
    }
  }

  async onFlip() {
    if (!this.isCameraActive) return;
    try { await CameraPreview.flip(); } catch (err) { console.error(err); }
  }

  async onCapture() {
    if (!this.isCameraActive || this.isCapturing) return;
    try {
      this.isCapturing = true;
      const result = await CameraPreview.capture({ quality: 85 });
      await this.stop();
      this.capturedImage = await this.normaliseImage(`data:image/jpeg;base64,${result.value}`);
      this.isCapturing   = false;
    } catch (err) {
      this.isCapturing = false;
      console.error('Capture error:', err);
    }
  }

  // Rotate landscape captures to portrait and mirror for front-camera feel.
  private normaliseImage(src: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const landscape = img.width > img.height;
        const canvas    = document.createElement('canvas');

        if (landscape) {
          // Raw capture is sideways — rotate -90° so portrait fills the frame
          canvas.width  = img.height;
          canvas.height = img.width;
          const ctx = canvas.getContext('2d')!;
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(Math.PI / 2);
          ctx.scale(-1, 1); // mirror simultaneously
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
        } else {
          canvas.width  = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d')!;
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.scale(-1, 1); // mirror only
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
        }

        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = src;
    });
  }

  onConfirm() {
    this.capturedImage = null;
    this.capture.emit();
  }

  async onRetake() {
    this.capturedImage = null;
    this.cdr.detectChanges();
    await this.start();
  }

  async ngOnDestroy() {
    await this.stop();
  }
}
