import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSectionComponent } from "./components/heroSection/heroSection.component";
import { NavBarComponent } from "./shared/navBar/navBar.component";
import { MediaPlayerComponent } from "./shared/mediaPlayer/mediaPlayer.component";
import { AboutMeSectionComponent } from "./components/aboutMe-section/aboutMe-section.component";
import { ProjectsSectionComponent } from "./components/projectsSection/projectsSection.component";
import { ContacSectionComponent } from "./components/contacSection/contacSection.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroSectionComponent, NavBarComponent, MediaPlayerComponent, AboutMeSectionComponent, ProjectsSectionComponent, ContacSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  @ViewChild('dashboard', { read: ElementRef }) dashboard!: ElementRef;
  @ViewChild('about', { read: ElementRef }) about!: ElementRef;
  @ViewChild('projects', { read: ElementRef }) projects!: ElementRef;
  @ViewChild('contact', { read: ElementRef }) contact!: ElementRef;

  protected title = 'mi-portafolio';

  ngAfterViewInit() {
    // Verifica que las referencias estén disponibles
    console.log('Referencias:', {
      dashboard: this.dashboard,
      about: this.about,
      projects: this.projects,
      contact: this.contact
    });
  }

  scrollToSection(section: string) {
    console.log('Scroll a la sección:', section); // Para depuración

    const sections: Record<string, ElementRef> = {
      dashboard: this.dashboard,
      about: this.about,
      projects: this.projects,
      contact: this.contact
    };

    const el = sections[section]?.nativeElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    } else {
      console.error('Sección no encontrada:', section);
    }
  }
}
