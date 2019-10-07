import { Injectable } from '@angular/core';
import { AudioPart } from 'src/app/model/audio-part';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private uri = '../../../assets/audio/';
  private audio: any;
  private isPlaying: boolean;

  constructor() { 
    this.isPlaying = false;
  }

  playCazaToofSong(name:string){
    this.playSong(this.uri + '/caza-toof/kimay/' + name, null, null);
  }

  playSongToPlay(source:string){
    this.playSong(this.uri + '/song-to-play/kimay/' + source, null, null);
  }

  playWinPointsSong(endCallback:Function){
    this.playSong("toof-genial.mp3", null, endCallback);
  }

  playLosePointsSong(endCallback:Function){
    this.playSong("toof-grosse-merde.mp3", null, endCallback);
  }

  playSong(name:string, startCallback?:Function, endCallback?:Function){
    this.play(this.uri + name, startCallback, endCallback);
  }

  play(source:string, startCallback?:Function, endCallback?:Function){
    if(!this.isPlaying){
      this.audio = new Audio(source);
      this.audio.load();
      this.audio.addEventListener("play", () => {
        this.onStart();
        if(startCallback){
          startCallback();
        }
      });
      this.audio.addEventListener("ended", () => {
        this.onStop();
        if(endCallback){
          console.log('end')
          endCallback();
        }
      });
      this.audio.play();
      return this.audio;
    }
  }

  playJingle(name:string, startCallback?:Function, endCallback?:Function){
    this.play(this.uri + '/jingles/' + name, startCallback, endCallback);
  }

  playSound(name:string, startCallback?:Function, endCallback?:Function){
    this.play(this.uri + '/sounds/' + name, startCallback, endCallback);
  }

  onStart() { this.isPlaying = true; }
  onStop() { this.isPlaying = false; }

  stopSong(){
    if(this.audio){
      this.audio.pause();
      this.audio.currentime = 0;
      this.audio = null;
    }
  }


  /*

  Toof fournit une liste d'audio avec le titre

  */
}
