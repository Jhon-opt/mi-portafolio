import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() appMagnetic: number | string = 1; // Fuerza del imán

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    const strength = typeof this.appMagnetic === 'string' ? parseFloat(this.appMagnetic) || 1 : this.appMagnetic;
    const moveX = distanceX * 0.3 * strength;
    const moveY = distanceY * 0.3 * strength;

    this.renderer.setStyle(this.el.nativeElement, 'transform', `translate(${moveX}px, ${moveY}px)`);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate(0, 0)');
  }
}
