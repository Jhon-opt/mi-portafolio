import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSectionComponent } from "./components/heroSection/heroSection.component";
import { NavBarComponent } from "./shared/navBar/navBar.component";
import { MediaPlayerComponent } from "./shared/mediaPlayer/mediaPlayer.component";
import { AboutMeSectionComponent } from "./components/aboutMe-section/aboutMe-section.component";
import { ProjectsSectionComponent } from "./components/projectsSection/projectsSection.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroSectionComponent, NavBarComponent, MediaPlayerComponent, AboutMeSectionComponent, ProjectsSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'mi-portafolio';
}
