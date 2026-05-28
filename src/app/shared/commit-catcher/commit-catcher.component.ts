import { Component, HostListener, signal, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-commit-catcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden relative min-h-[300px] flex flex-col">
      <div class="flex justify-between items-center mb-4 z-10">
        <h4 class="font-mono font-bold text-gray-900 dark:text-white">{{ langService.t().game.title }}</h4>
        <div class="flex gap-4 text-xs font-mono">
          <span class="text-indigo-500">{{ langService.t().game.score }}: {{ score() }}</span>
          <span class="text-red-500">{{ langService.t().game.lives }}: {{ lives() }}</span>
        </div>
      </div>

      @if (!gameStarted()) {
        <div class="flex-1 flex flex-col items-center justify-center text-center z-10">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-[200px]">{{ langService.t().game.instructions }}</p>
          <button 
            (click)="startGame()"
            class="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all active:scale-95"
          >
            {{ langService.t().game.start }}
          </button>
        </div>
      } @else if (gameOver()) {
        <div class="flex-1 flex flex-col items-center justify-center text-center z-10">
          <h5 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ langService.t().game.gameOver }}</h5>
          <p class="text-sm text-gray-500 mb-6">{{ langService.t().game.score }}: {{ score() }}</p>
          <button 
            (click)="startGame()"
            class="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-lg transition-all"
          >
            {{ langService.t().game.retry }}
          </button>
        </div>
      }

      <!-- Game Area -->
      <div class="flex-1 relative overflow-hidden bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
        <!-- Player -->
        <div 
          [style.left.px]="playerX()"
          class="absolute bottom-2 w-12 h-12 flex items-center justify-center bg-indigo-500 rounded-xl shadow-lg transition-all duration-75"
        >
          <span class="text-white text-xl font-bold">JD</span>
        </div>

        <!-- Falling Items -->
        @for (item of items(); track item.id) {
          <div 
            [style.left.px]="item.x"
            [style.top.px]="item.y"
            class="absolute w-8 h-8 flex items-center justify-center rounded-lg shadow-sm"
            [class]="item.type === 'commit' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
          >
            @if (item.type === 'commit') {
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            } @else {
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            }
          </div>
        }
      </div>

      <!-- Controls Hint -->
      <div class="mt-4 text-[10px] text-center text-gray-400 font-mono">
        {{ langService.t().game.hint }}
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class CommitCatcherComponent implements OnInit, OnDestroy {
  private ngZone = inject(NgZone);
  langService = inject(LanguageService);
  private gameInterval: any;
  private animationId: any;

  gameStarted = signal(false);
  gameOver = signal(false);
  score = signal(0);
  lives = signal(3);
  playerX = signal(100);
  items = signal<any[]>([]);
  
  private lastItemTime = 0;
  private itemIdCounter = 0;

  ngOnInit() {}

  ngOnDestroy() {
    this.stopGame();
  }

  startGame() {
    this.gameStarted.set(true);
    this.gameOver.set(false);
    this.score.set(0);
    this.lives.set(3);
    this.items.set([]);
    this.playerX.set(100);
    
    this.ngZone.runOutsideAngular(() => {
      this.gameLoop();
    });
  }

  stopGame() {
    cancelAnimationFrame(this.animationId);
    this.gameStarted.set(false);
  }

  @HostListener('window:keydown', ['$event'])
  handleInput(event: KeyboardEvent) {
    if (!this.gameStarted() || this.gameOver()) return;
    
    const step = 20;
    if (event.key === 'ArrowLeft') {
      this.playerX.update(x => Math.max(0, x - step));
    } else if (event.key === 'ArrowRight') {
      this.playerX.update(x => Math.min(250, x + step)); // Adjust based on width
    }
  }

  private gameLoop() {
    if (!this.gameStarted() || this.gameOver()) return;

    const now = Date.now();
    if (now - this.lastItemTime > 1500) {
      this.spawnItem();
      this.lastItemTime = now;
    }

    this.updateItems();
    this.checkCollisions();

    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private spawnItem() {
    const type = Math.random() > 0.3 ? 'commit' : 'bug';
    const newItem = {
      id: this.itemIdCounter++,
      x: Math.random() * 250,
      y: -30,
      type: type,
      speed: 2 + Math.random() * 2
    };
    
    this.ngZone.run(() => {
      this.items.update(items => [...items, newItem]);
    });
  }

  private updateItems() {
    this.ngZone.run(() => {
      this.items.update(items => {
        return items
          .map(item => ({ ...item, y: item.y + item.speed }))
          .filter(item => {
            if (item.y > 250) {
              if (item.type === 'commit') {
                this.lives.update(l => l - 1);
                if (this.lives() <= 0) this.endGame();
              }
              return false;
            }
            return true;
          });
      });
    });
  }

  private checkCollisions() {
    const px = this.playerX();
    const py = 200; // Fixed player Y near bottom

    this.ngZone.run(() => {
      this.items.update(items => {
        return items.filter(item => {
          const dx = Math.abs(item.x - px);
          const dy = Math.abs(item.y - 200);
          
          if (dx < 30 && dy < 30) {
            if (item.type === 'commit') {
              this.score.update(s => s + 10);
            } else {
              this.lives.update(l => l - 1);
              if (this.lives() <= 0) this.endGame();
            }
            return false;
          }
          return true;
        });
      });
    });
  }

  private endGame() {
    this.gameOver.set(true);
  }
}
