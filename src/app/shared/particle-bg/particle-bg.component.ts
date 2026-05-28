import { Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

@Component({
  selector: 'app-particle-bg',
  standalone: true,
  template: `<canvas #canvas class="fixed inset-0 pointer-events-none z-0 opacity-60 dark:opacity-20 transition-opacity duration-1000"></canvas>`,
  styles: [`
    :host { display: block; }
    canvas { background: transparent; }
  `]
})
export class ParticleBgComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId!: number;
  private ngZone = inject(NgZone);
  
  mouseX = signal(0);
  mouseY = signal(0);

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resize();
    this.initParticles();
    
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }

  @HostListener('window:resize')
  resize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX.set(event.clientX);
    this.mouseY.set(event.clientY);
  }

  private initParticles() {
    this.particles = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    // Colores un poco más vibrantes para que se vean en blanco
    const colors = ['#4f46e5', '#6366f1', '#818cf8', '#4338ca'];
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  private animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = 0;
      if (p.y < 0) p.y = window.innerHeight;
      if (p.y > window.innerHeight) p.y = 0;

      // Mouse interaction
      const dx = this.mouseX() - p.x;
      const dy = this.mouseY() - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x -= dx * 0.01;
        p.y -= dy * 0.01;
      }

      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
