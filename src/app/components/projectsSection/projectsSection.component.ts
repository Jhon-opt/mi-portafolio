import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';

@Component({
  selector: 'projects-section',
  imports: [DatePipe],
  templateUrl: './projectsSection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {

  customDate = signal(new Date());
  tickingDateEffect = effect((OnCleanup)=>{
    const interval = setInterval(() => {
      this.customDate.set(new Date())
    }, 1000);

    OnCleanup(() => {
      clearInterval(interval);
    });
  })
 }
