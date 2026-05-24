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
        toBack: true,
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

  // Main method to normalize captured images (mirror front camera and fix landscape rotation)
  private async normaliseImage(src: string): Promise<string> {
    const img = await this.loadImageElement(src);
    const canvas = document.createElement('canvas');
    const isLandscape = img.width > img.height;

    if (isLandscape) {
      this.drawLandscapeImage(img, canvas);
    } else {
      this.drawPortraitImage(img, canvas);
    }

    const base64Result = canvas.toDataURL('image/jpeg', 0.85);
    return base64Result;
  }

  // Helper function to asynchronously load an image source in a Promise
  private loadImageElement(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }

  // Helper function to process landscape captured image: rotate it by 90 degrees and mirror it
  private drawLandscapeImage(img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    // Landscape captures are rotated sideways, so swap width and height
    canvas.width = img.height;
    canvas.height = img.width;

    const ctx = canvas.getContext('2d')!;
    
    // Move origin (0,0) to center of canvas for rotation and scale operations
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI / 2); // Rotate 90 degrees
    ctx.scale(-1, 1);       // Mirror the image horizontally
    
    // Draw the image centered relative to the new origin
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
  }

  // Helper function to process portrait captured image: mirror it for a standard front-camera look
  private drawPortraitImage(img: HTMLImageElement, canvas: HTMLCanvasElement): void {
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d')!;
    
    // Move origin (0,0) to center of canvas to mirror
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(-1, 1); // Mirror the image horizontally
    
    // Draw the image centered relative to the new origin
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
  }

  onConfirm() {
    this.capturedImage = null;
    this.capture.emit();
  }

  async onRetake() {
    this.capturedImage = null;
    this.cdr.detectChanges();
    // Yield to the browser repaint so the parent footer expands and camera container shrinks back first
    setTimeout(async () => {
      await this.start();
    }, 150);
  }

  async ngOnDestroy() {
    await this.stop();
  }
}
