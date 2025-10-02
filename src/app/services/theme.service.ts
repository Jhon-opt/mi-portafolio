
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    this.init();
  }

  private init() {
    // preferencia del usuario o sistema
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      this.setTheme(saved as 'light' | 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
    }
  }

  setTheme(mode: 'light' | 'dark') {
    this.theme.set(mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('theme', mode);
  }

  toggle() {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }
}
