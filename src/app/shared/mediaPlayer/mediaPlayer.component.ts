import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'media-player',
  imports: [],
  templateUrl: './mediaPlayer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPlayerComponent {
  isExpanded = false;
}
