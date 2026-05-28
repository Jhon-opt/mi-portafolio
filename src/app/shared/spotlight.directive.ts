import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
  standalone: true
})
export class SpotlightDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Actualizamos las variables CSS para que el fondo del componente las use
    this.renderer.setStyle(this.el.nativeElement, '--mouse-x', `${x}px`);
    this.renderer.setStyle(this.el.nativeElement, '--mouse-y', `${y}px`);
  }
}
