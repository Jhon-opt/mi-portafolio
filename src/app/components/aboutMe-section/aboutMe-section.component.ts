import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { LanguageService } from '../../services/language.service';
import { SpotlightDirective } from '../../shared/spotlight.directive';

export interface Skill {
  name: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  category: 'Frontend' | 'Backend' | 'Herramientas';
  icon?: string;
}

@Component({
  selector: 'about-me-section',
  imports: [MagneticDirective, SpotlightDirective],
  templateUrl: './aboutMe-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeSectionComponent {
  langService = inject(LanguageService);
  skills = signal<Skill[]>([
    // Frontend
    { name: 'Angular', level: 'Avanzado', category: 'Frontend' },
    { name: 'TypeScript', level: 'Avanzado', category: 'Frontend' },
    { name: 'React', level: 'Intermedio', category: 'Frontend' },
    { name: 'Tailwind CSS', level: 'Avanzado', category: 'Frontend' },
    
    // Backend
    { name: 'C# / .NET', level: 'Intermedio', category: 'Backend' },
    { name: 'Node.js', level: 'Intermedio', category: 'Backend' },
    { name: 'PostgreSQL', level: 'Intermedio', category: 'Backend' },
    { name: 'Go', level: 'Básico', category: 'Backend' },
    
    // Herramientas
    { name: 'Docker', level: 'Intermedio', category: 'Herramientas' },
    { name: 'Git / GitHub', level: 'Avanzado', category: 'Herramientas' },
    { name: 'Herramientas de IA', level: 'Avanzado', category: 'Herramientas' },
    { name: 'Inglés (B2)', level: 'Intermedio', category: 'Herramientas' },
    { name: 'Linux', level: 'Intermedio', category: 'Herramientas' },
    { name: 'REST APIs', level: 'Avanzado', category: 'Herramientas' },
  ]);

  getSkillsByCategory(category: string) {
    return this.skills().filter(s => s.category === category);
  }
}
