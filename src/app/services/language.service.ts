import { Injectable, signal, computed } from '@angular/core';

export type Language = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  currentLang = signal<Language>('es');

  translations: any = {
    es: {
      nav: {
        home: 'Inicio',
        about: 'Sobre mí',
        projects: 'Proyectos',
        contact: 'Contacto'
      },
      hero: {
        badge: 'Disponible para nuevos proyectos',
        role: 'Full-Stack Developer',
        name: 'Jhon Mario'
      },
      about: {
        badge: 'MI HISTORIA',
        title: 'Ingeniería de software con arquitectura sólida y diseño escalable.',
        p1: 'Soy Jhon Mario Durango Rodríguez, ingeniero egresado de la Universidad Distrital Francisco José de Caldas. Me especializo como Desarrollador Full-Stack, creando tanto interfaces modernas con TypeScript y Angular, como backends robustos de nivel empresarial utilizando C# / .NET 8.0, Node.js y PostgreSQL.',
        p2: 'Tengo experiencia implementando arquitecturas MVC, diseño de APIs RESTful, sistemas de autenticación RBAC y despliegues contenerizados con Docker. Mi pasión es resolver problemas complejos asegurando una base de código limpia, mantenible y segura.',
        cv: 'Descargar CV',
        github: 'GitHub',
        skillsTitle: 'Stack Tecnológico',
        githubTitle: 'Actividad en GitHub',
        githubSubtitle: 'Estadísticas reales de mi cuenta',
        githubNote: 'Nota: Si no ves las gráficas, es posible que tu navegador bloquee contenido externo.'
      },
      projects: {
        title: 'Proyectos',
        more: 'Explorar más proyectos',
        less: 'Mostrar menos',
        view: 'Ver en GitHub',
        arch: 'Ver Arquitectura',
        back: 'Ver Proyecto',
        next: 'Próximos temas',
        time: 'Hora Local (Colombia)',
        items: {
          tobon: 'Sistema de gestión logística integral construido con C# / .NET 8.0 y PostgreSQL. Implementa arquitectura MVC, autenticación RBAC, transacciones ACID complejas y despliegue con Docker.',
          puntum: 'Ecosistema multiplataforma que incluye una aplicación móvil en React Native y plataformas web interconectadas utilizando TypeScript.',
          teslo: 'Backend robusto y escalable construido con Node.js y TypeScript. Expone una API RESTful completa orientada a comercio electrónico.',
          pokemon: 'Aplicación de alto rendimiento utilizando Server-Side Rendering (SSR) con Angular para optimizar el SEO y la velocidad de carga inicial.',
          goAuth: 'Microservicio de autenticación eficiente y seguro desarrollado en Go, enfocado en la velocidad y el manejo concurrente de sesiones.',
          email: 'Agente inteligente desarrollado en Python para la automatización y gestión de correos electrónicos mediante la API de Gmail.'
        }
      },
      game: {
        title: 'Commit Catcher',
        score: 'Puntos',
        lives: 'Vidas',
        instructions: 'Atrapa los commits verdes, evita los bugs rojos.',
        start: 'Iniciar Juego',
        gameOver: 'Fin del Juego',
        retry: 'Reintentar',
        hint: 'Usa las flechas ← → para moverte'
      },
      player: {
        loading: 'Cargando música...',
        playing: 'Reproduciendo',
        paused: 'En pausa',
        nextTracks: 'Próximos temas'
      },
      contact: {
        title: '¿Hablamos?',
        subtitle: 'Si tienes una idea, un proyecto o simplemente quieres saludar, no dudes en escribirme.',
        name: 'Nombre',
        email: 'Correo',
        subject: 'Asunto',
        message: 'Mensaje',
        placeholderName: 'Ej: Jhon Doe',
        placeholderSubject: '¿En qué puedo ayudarte?',
        placeholderMessage: 'Escribe tu mensaje aquí...',
        send: 'Enviar Mensaje',
        sending: 'Enviando...',
        successTitle: '¡Mensaje Enviado!',
        successMsg: 'Gracias por contactarme, te responderé lo antes posible.'
      },
      commands: {
        hint: 'Pulsa para abrir el menú rápido',
        placeholder: "Escribe un comando (ej: 'proyectos', 'dark')...",
        tip: 'TIP: Presiona Ctrl + K para abrir',
        available: 'comandos disponibles',
        notFound: 'No se encontraron comandos para',
        keys: {
          projects: 'ir a proyectos',
          about: 'ir a sobre mi',
          contact: 'ir a contacto',
          dark: 'modo oscuro',
          light: 'modo claro',
          cv: 'descargar cv'
        }
      }
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        badge: 'Available for new projects',
        role: 'Full-Stack Developer',
        name: 'Jhon Mario'
      },
      about: {
        badge: 'MY STORY',
        title: 'Software engineering with solid architecture and scalable design.',
        p1: 'I am Jhon Mario Durango Rodríguez, an engineer graduated from the Francisco José de Caldas District University. I specialize as a Full-Stack Developer, creating both modern interfaces with TypeScript and Angular, and robust enterprise-level backends using C# / .NET 8.0, Node.js, and PostgreSQL.',
        p2: 'I have experience implementing MVC architectures, RESTful API design, RBAC authentication systems, and containerized deployments with Docker. My passion is solving complex problems ensuring a clean, maintainable, and secure codebase.',
        cv: 'Download CV',
        github: 'GitHub',
        skillsTitle: 'Tech Stack',
        githubTitle: 'GitHub Activity',
        githubSubtitle: 'Real statistics from my account',
        githubNote: 'Note: If you do not see the charts, your browser might be blocking external content.'
      },
      projects: {
        title: 'Projects',
        more: 'Explore more projects',
        less: 'Show less',
        view: 'View on GitHub',
        arch: 'View Architecture',
        back: 'View Project',
        next: 'Next tracks',
        time: 'Local Time (Colombia)',
        items: {
          tobon: 'Integral logistics management system built with C# / .NET 8.0 and PostgreSQL. Implements MVC architecture, RBAC authentication, complex ACID transactions, and Docker deployment.',
          puntum: 'Multiplatform ecosystem including a mobile app in React Native and interconnected web platforms using TypeScript.',
          teslo: 'Robust and scalable backend built with Node.js and TypeScript. Exposes a complete RESTful API oriented towards e-commerce.',
          pokemon: 'High-performance application using Server-Side Rendering (SSR) with Angular to optimize SEO and initial load speed.',
          goAuth: 'Efficient and secure authentication microservice developed in Go, focused on speed and concurrent session management.',
          email: 'Intelligent agent developed in Python for the automation and management of emails through the Gmail API.'
        }
      },
      game: {
        title: 'Commit Catcher',
        score: 'Score',
        lives: 'Lives',
        instructions: 'Catch green commits, avoid red bugs.',
        start: 'Start Game',
        gameOver: 'Game Over',
        retry: 'Retry',
        hint: 'Use ← → arrow keys to move'
      },
      player: {
        loading: 'Loading music...',
        playing: 'Playing',
        paused: 'Paused',
        nextTracks: 'Next tracks'
      },
      contact: {
        title: "Let's Talk",
        subtitle: 'If you have an idea, a project or just want to say hi, feel free to write to me.',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        placeholderName: 'e.g.: Jhon Doe',
        placeholderSubject: 'How can I help you?',
        placeholderMessage: 'Write your message here...',
        send: 'Send Message',
        sending: 'Sending...',
        successTitle: 'Message Sent!',
        successMsg: 'Thanks for reaching out, I will get back to you as soon as possible.'
      },
      commands: {
        hint: 'Press to open the quick menu',
        placeholder: "Type a command (e.g.: 'projects', 'dark')...",
        tip: 'TIP: Press Ctrl + K to open',
        available: 'available commands',
        notFound: 'No commands found for',
        keys: {
          projects: 'go to projects',
          about: 'go to about',
          contact: 'go to contact',
          dark: 'dark mode',
          light: 'light mode',
          cv: 'download cv'
        }
      }
    }
  };

  t = computed(() => this.translations[this.currentLang()]);

  toggleLanguage() {
    this.currentLang.set(this.currentLang() === 'es' ? 'en' : 'es');
  }
}
