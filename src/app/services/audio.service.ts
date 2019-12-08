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

  playSongWithURL(url:string, startCallback?:Function, endCallback?:Function){
    this.play(url, null, null);
  }

  playSongWithAudio(audio:any, startCallback?:Function, endCallback?:Function){
    this.play(audio);
  }

  pause(){
    if(this.audio && this.isPlaying){
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  resume(audio: any, currentTime: number){
    if(!this.isPlaying){
      this.audio = new Audio(audio.source);
      this.audio.currentTime = parseFloat(''+currentTime/1000);
      this.audio.play();
      this.isPlaying = true;
    }
  }

  loadMedia(audio: any, onLoadedCallback?:Function){
    this.audio = new Audio(audio.source);
    this.audio.load();
    this.audio.addEventListener('loadedmetadata', () => {
      if(onLoadedCallback){
        onLoadedCallback(this.audio.duration);
      }
   });
  }

  play(source:string, startCallback?:Function, endCallback?:Function, onLoadedCallback?:Function){
    if(!this.isPlaying){
      
      this.audio = new Audio(source);
      // this.audio = new Audio(this.uri + source);
      
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
    }
  }

  playJingle(name:string, startCallback?:Function, endCallback?:Function){
    this.play(this.uri + '/jingles/' + name, startCallback, endCallback);
  }

  playSound(name:string, startCallback?:Function, endCallback?:Function){
    this.play(this.uri + '/sounds/' + name, startCallback, endCallback);
  }

  onStart() { this.isPlaying = true; }
  onStop() { 
    this.isPlaying = false;
    this.audio = null;
  }

  stopSong(){
    if(this.audio){
      this.audio.pause();
      this.onStop();
    }
  }

  resetTime(){
    this.audio.currentTime = 0;
  }

  canPlay(): boolean {
    return !this.isPlaying;
  }

  play2(song){
    console.log(song)
    this.audio = new Audio(song);
    this.audio.load();
    this.audio.play();
  }



  /*

  Toof fournit une liste d'audio avec le titre

  */
}
