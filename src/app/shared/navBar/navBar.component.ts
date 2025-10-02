import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './navBar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {

   themeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.toggle();
  }
 }
