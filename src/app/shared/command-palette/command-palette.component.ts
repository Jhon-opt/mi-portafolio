import { Component, HostListener, signal, inject, Output, EventEmitter, OnInit, computed, effect } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Command {
  key: string;
  label: string;
  action: () => void;
  icon: string;
}

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-black/20" (click)="close()">
        <div class="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in zoom-in-95 duration-200" (click)="$event.stopPropagation()">
          
          <div class="flex items-center p-4 border-b border-gray-100 dark:border-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              #input
              type="text" 
              [(ngModel)]="query"
              (input)="filterCommands()"
              class="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 font-mono text-sm"
              [placeholder]="langService.t().commands.placeholder"
              (keydown.esc)="close()"
              (keydown.enter)="executeFirst()"
            >
            <div class="flex items-center gap-1">
              <kbd class="px-2 py-1 text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-md">ESC</kbd>
            </div>
          </div>

          <div class="max-h-[350px] overflow-y-auto p-2">
            @for (cmd of filteredCommands(); track cmd.key) {
              <button 
                (click)="cmd.action(); close()"
                class="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 group transition-all text-left"
              >
                <div class="flex items-center gap-3">
                  <span class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                    <span [innerHTML]="cmd.icon"></span>
                  </span>
                  <div>
                    <div class="text-sm font-bold text-gray-900 dark:text-white">{{ cmd.label }}</div>
                    <div class="text-xs text-gray-500 font-mono">{{ cmd.key }}</div>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            } @empty {
              <div class="p-8 text-center text-gray-500 text-sm font-mono">
                {{ langService.t().commands.notFound }} "{{ query }}"
              </div>
            }
          </div>

          <div class="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px] text-gray-400 font-mono">
            <span>{{ langService.t().commands.tip }}</span>
            <span>{{ filteredCommands().length }} {{ langService.t().commands.available }}</span>
          </div>
        </div>
      </div>
    }

    <!-- Hint Toast -->
    @if (showHint() && !isOpen()) {
      <div class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] animate-in slide-in-from-bottom-5 fade-in duration-500">
        <div class="bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white/10 flex items-center gap-3">
          <kbd class="px-2 py-1 bg-white/20 dark:bg-gray-200 rounded text-xs font-bold">Ctrl + K</kbd>
          <span class="text-sm font-medium">{{ langService.t().commands.hint }}</span>
          <button (click)="showHint.set(false)" class="ml-2 hover:opacity-70">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class CommandPaletteComponent implements OnInit {
  @Output() actionExecuted = new EventEmitter<string>();
  
  themeService = inject(ThemeService);
  langService = inject(LanguageService);
  isOpen = signal(false);
  showHint = signal(false);
  query = '';

  ngOnInit() {
    setTimeout(() => {
      if (!this.isOpen()) {
        this.showHint.set(true);
        setTimeout(() => this.showHint.set(false), 6000);
      }
    }, 8000);
  }
  
  commands = computed<Command[]>(() => {
    const k = this.langService.t().commands.keys;
    return [
      { key: k.projects, label: this.langService.t().nav.projects, action: () => this.actionExecuted.emit('projects'), icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>' },
      { key: k.about, label: this.langService.t().nav.about, action: () => this.actionExecuted.emit('about'), icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>' },
      { key: k.contact, label: this.langService.t().nav.contact, action: () => this.actionExecuted.emit('contact'), icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>' },
      { key: k.dark, label: this.langService.t().commands.keys.dark, action: () => this.themeService.setTheme('dark'), icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>' },
      { key: k.light, label: this.langService.t().commands.keys.light, action: () => this.themeService.setTheme('light'), icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' },
      { key: k.cv, label: this.langService.t().about.cv, action: () => window.open('https://drive.google.com/drive/folders/1acaJXhp0Xd3-O0Gpeh5mXv2QlnT7mgiW?usp=sharing', '_blank'), icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>' },
    ];
  });

  filteredCommands = signal<Command[]>([]);

  constructor() {
    effect(() => {
      this.filterCommands();
    }, { allowSignalWrites: true });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.toggle();
    }
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
    if (this.isOpen()) {
      this.query = '';
      this.filterCommands();
    }
  }

  close() {
    this.isOpen.set(false);
  }

  filterCommands() {
    const q = this.query.toLowerCase();
    this.filteredCommands.set(
      this.commands().filter(c => c.key.includes(q) || c.label.toLowerCase().includes(q))
    );
  }

  executeFirst() {
    const first = this.filteredCommands()[0];
    if (first) {
      first.action();
      this.close();
    }
  }
}
