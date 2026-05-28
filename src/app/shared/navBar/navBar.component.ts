import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './navBar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {

    @Output() sectionSelected = new EventEmitter<string>();

  selectSection(section: string) {
    console.log('Clic en sección:', section);
    this.sectionSelected.emit(section);
  }

   themeService = inject(ThemeService);
   langService = inject(LanguageService);
   isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  toggleTheme() {
    this.themeService.toggle();
  }

  toggleLang() {
    this.langService.toggleLanguage();
  }
 }
