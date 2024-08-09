import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Howl } from 'howler';

@Injectable()
export class AudioStreamingService {
  private _sound!: Howl;
  private _isPlaying: boolean = true;
  private _duration: number = 0;
  private _currentTime: number = 0;

  constructor(private http: HttpClient) {}

  loadAudio(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const objectUrl = URL.createObjectURL(blob);
      this._sound = new Howl({
        src: [objectUrl],
        html5: true,
        onload: () => {
          this._duration = this._sound.duration();
        },
        onplay: () => {
          requestAnimationFrame(this.update_currentTime.bind(this));
        }
      });
    });
  }

  play() {
    this._sound.play();
    this._isPlaying = true;
  }

  pause() {
    this._sound.pause();
    this._isPlaying = false;
  }

  stop() {
    this._sound.stop();
    this._isPlaying = false;
    this._currentTime = 0;
  }

  seekTo(time: number) {
    this._sound.seek(time);
    this._currentTime = time;
  }

  seekForward(seconds: number = 10) {
    this.seekTo(this._sound.seek() + seconds);
  }

  seekBackward(seconds: number = 10) {
    this.seekTo(this._sound.seek() - seconds);
  }

  private update_currentTime() {
    if (this._isPlaying) {
      this._currentTime = this._sound.seek() as number;
      requestAnimationFrame(this.update_currentTime.bind(this));
    }
  }

  get_currentTime(): number {
    return this._currentTime;
  }

  get_duration(): number {
    return this._duration;
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }
}
