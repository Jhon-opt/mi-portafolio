import { ChangeDetectionStrategy, Component, computed, effect, signal, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { DatePipe, CommonModule } from '@angular/common';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  isLarge?: boolean;
  isWide?: boolean;
  architecture?: {
    client: string;
    server: string;
    db: string;
  };
}

@Component({
  selector: 'projects-section',
  imports: [DatePipe, SpotlightDirective, ScrollRevealDirective, CommonModule],
  templateUrl: './projectsSection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  langService = inject(LanguageService);

  flippedProject = signal<string | null>(null);

  allProjects = computed<Project[]>(() => {
    const t = this.langService.t().projects.items;
    return [
      {
        title: 'Proyecto Tobon (Logística Enterprise)',
        description: t.tobon,
        image: 'resources/proyecto-tobon.webp',
        link: 'https://github.com/Jhon-opt/Proyecto_tobon',
        isLarge: true,
        isWide: true,
        architecture: {
          client: 'Angular 20 / Tailwind',
          server: 'ASP.NET Core MVC / .NET 8.0',
          db: 'PostgreSQL / Docker'
        }
      },
      {
        title: 'Puntum Suite',
        description: t.puntum,
        image: 'resources/puntum.webp',
        link: 'https://github.com/Jhon-opt/Puntum-Web',
        isLarge: true,
        architecture: {
          client: 'React Native / TypeScript',
          server: 'Node.js / Express',
          db: 'Firebase'
        }
      },
      {
        title: 'Teslo Shop API',
        description: t.teslo,
        image: 'resources/teslo-shop.webp',
        link: 'https://github.com/Jhon-opt/teslo-shop-back',
        isWide: true,
        architecture: {
          client: 'Postman / REST Client',
          server: 'Node.js / NestJS',
          db: 'PostgreSQL / TypeORM'
        }
      },
      {
        title: 'Pokémon SSR',
        description: t.pokemon,
        image: 'resources/pokemon-ssr.webp',
        link: 'https://github.com/Jhon-opt/Pokemon-SSR',
        architecture: {
          client: 'Angular SSR / SEO',
          server: 'Node.js / Vercel',
          db: 'PokeAPI'
        }
      },
      {
        title: 'Go-Auth Service',
        description: t.goAuth,
        image: 'resources/go-auth.webp',
        link: 'https://github.com/Jhon-opt/go-auth',
        architecture: {
          client: 'Mobile / Web App',
          server: 'Go / Fiber',
          db: 'Redis / JWT'
        }
      },
      {
        title: 'Email Agent Gmail',
        description: t.email,
        image: 'resources/email-agent.webp',
        link: 'https://github.com/Jhon-opt/email-agent-gmail',
        architecture: {
          client: 'Gmail API / Auth',
          server: 'Python / Agent',
          db: 'OAuth2 / Local Cache'
        }
      }
    ];
  });

  showAll = signal(false);
  
  projects = computed(() => {
    return this.showAll() ? this.allProjects() : this.allProjects().slice(0, 3);
  });

  toggleShowAll() {
    this.showAll.set(!this.showAll());
  }

  toggleFlip(title: string) {
    if (this.flippedProject() === title) {
      this.flippedProject.set(null);
    } else {
      this.flippedProject.set(title);
    }
  }

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
