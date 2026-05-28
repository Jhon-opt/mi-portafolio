import { Component, HostListener, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reading-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <div 
        class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] transition-all duration-150 ease-out"
        [style.width.%]="progress()"
      ></div>
    </div>
  `
})
export class ReadingProgressComponent {
  progress = signal(0);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const currentPosition = window.scrollY;
    this.progress.set((currentPosition / totalHeight) * 100);
  }
}
