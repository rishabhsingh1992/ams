import { Injectable, OnDestroy, signal } from '@angular/core';

export type ThemeMode = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'ams-theme-mode';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  private readonly mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  readonly mode = signal<ThemeMode>('system');

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    this.apply(saved ?? 'system');
    this.mediaQuery.addEventListener('change', this.onSystemChange);
  }

  setMode(mode: ThemeMode): void {
    localStorage.setItem(STORAGE_KEY, mode);
    this.apply(mode);
  }

  private apply(mode: ThemeMode): void {
    this.mode.set(mode);
    const dark = mode === 'dark' || (mode === 'system' && this.mediaQuery.matches);
    document.documentElement.classList.toggle('ion-palette-dark', dark);
  }

  private readonly onSystemChange = () => {
    if (this.mode() === 'system') this.apply('system');
  };

  ngOnDestroy(): void {
    this.mediaQuery.removeEventListener('change', this.onSystemChange);
  }
}
