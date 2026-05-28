import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '@environments/environment';
import { LanguageService } from '../../services/language.service';

/** 🔹 Interface para un ítem del playlist */
interface YouTubeItem {
  title: string;
  author: string;
  thumbnail: string;
  videoId: string;
}

/** 🔹 Interface para la respuesta de la API de YouTube */
interface YouTubeApiResponse {
  items: Array<{
    snippet: {
      title: string;
      videoOwnerChannelTitle: string;
      thumbnails: { medium: { url: string } };
      resourceId: { videoId: string };
    };
  }>;
}

/** 🔹 Tipos de la API de YouTube */
declare global {
  interface Window {
    YT: typeof YT;
  }

  namespace YT {
    class Player {
      constructor(
        elementId: string,
        options: {
          height: string;
          width: string;
          videoId: string;
          playerVars?: Record<string, any>;
          events?: {
            onReady?: () => void;
            onStateChange?: (event: PlayerEvent) => void;
          };
        }
      );
      playVideo(): void;
      pauseVideo(): void;
      loadVideoById(videoId: string): void;
      destroy(): void;
    }

    interface PlayerEvent {
      data: number;
    }

    enum PlayerState {
      UNSTARTED = -1,
      ENDED = 0,
      PLAYING = 1,
      PAUSED = 2,
      BUFFERING = 3,
      CUED = 5
    }
  }
}

@Component({
  selector: 'media-player',
  imports: [],
  templateUrl: './mediaPlayer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  langService = inject(LanguageService);
  private player: YT.Player | null = null;

  playlist: YouTubeItem[] = [];
  currentIndex = 0;
  isExpanded = false;
  isPlaying = false;

  ngOnInit(): void {
    this.loadPlaylist();
    this.loadYouTubeApi();
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
    }
  }

  /** 🔹 Cargar la lista de reproducción desde YouTube API */
  loadPlaylist(): void {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=${environment.playlistId}&key=${environment.youtubeApiKey}`;

    this.http.get<YouTubeApiResponse>(url).subscribe({
      next: (res: YouTubeApiResponse) => {
        this.playlist = res.items.map((item) => ({
          title: item.snippet.title,
          author: item.snippet.videoOwnerChannelTitle,
          thumbnail: item.snippet.thumbnails.medium.url,
          videoId: item.snippet.resourceId.videoId,
        }));
        this.initPlayer();
        this.cdr.markForCheck(); // Fuerza la actualización para cargar la miniatura inicial
      },
      error: (err) => console.error('Error al cargar playlist:', err),
    });
  }

  /** 🔹 Inicializa el reproductor oculto */
  initPlayer(): void {
    const videoId = this.playlist[this.currentIndex]?.videoId;
    if (!videoId) return;

    // Espera que la API esté disponible
    if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
      this.player = new window.YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: { autoplay: 0 },
        events: {
          onReady: () => console.log('✅ Player ready'),
          onStateChange: (event: YT.PlayerEvent) => this.onStateChange(event),
        },
      });
    } else {
      // Si la API aún no cargó, vuelve a intentarlo
      setTimeout(() => this.initPlayer(), 500);
    }
  }

  /** 🔹 Carga diferida del script de YouTube para evitar render-blocking */
  private loadYouTubeApi(): void {
    if (typeof window !== 'undefined' && !window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.defer = true;
      tag.async = true;
      document.body.appendChild(tag);
    }
  }

  /** 🔹 Maneja cambios de estado (play, pause, end) */
  onStateChange(event: YT.PlayerEvent): void {
    switch (event.data) {
      case window.YT.PlayerState.ENDED:
        this.next();
        break;
      case window.YT.PlayerState.PLAYING:
        this.isPlaying = true;
        this.cdr.markForCheck();
        break;
      case window.YT.PlayerState.PAUSED:
        this.isPlaying = false;
        this.cdr.markForCheck();
        break;
    }
  }

  /** 🔹 Reproduce / pausa */
  playPause(): void {
    if (!this.player) return;
    this.isPlaying ? this.player.pauseVideo() : this.player.playVideo();
  }

  /** 🔹 Siguiente canción */
  next(): void {
    if (this.currentIndex < this.playlist.length - 1) {
      this.currentIndex++;
      this.loadVideo();
    }
  }

  /** 🔹 Canción anterior */
  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadVideo();
    }
  }

  /** 🔹 Cargar nuevo video en el reproductor */
  loadVideo(): void {
    if (!this.player) return;
    const nextId = this.playlist[this.currentIndex].videoId;
    this.player.loadVideoById(nextId);
    this.isPlaying = true;
    this.cdr.markForCheck();
  }

  /** 🔹 Devuelve el track actual */
  get currentTrack(): YouTubeItem | undefined {
    return this.playlist[this.currentIndex];
  }
}
