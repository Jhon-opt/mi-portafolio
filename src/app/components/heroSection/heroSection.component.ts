import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hero-section',
  imports: [],
  templateUrl: './heroSection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent { }
