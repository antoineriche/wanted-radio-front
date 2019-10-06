import { Injectable } from '@angular/core';
import { AudioService } from './audio.service';
import { AudioPart } from '../../model/audio-part';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class JingleService {

  constructor(private audioService: AudioService) { }

  public getAllJingles(): AudioPart[]{
    let jingles = [];
    jingles.push(this.makeJingle("Couplet décalé", "couplet-decale.mp3"));
    jingles.push(this.makeJingle("Beatbox Macron", "beatbox-macron.mp3"));
    jingles.push(this.makeJingle("Beatbox Johnny", "beatbox-johnny.mp3"));
    jingles.push(this.makeJingle("Beatbox Shamallow", "beatbox-shamallow.mp3"));
    jingles.push(this.makeJingle("Beatbox surprise", "beatbox-surprise.mp3"));
    jingles.push(this.makeJingle("Shamallow la boulette", "rap-shamallow-la-boulette.mp3"));
    jingles.push(this.makeJingle("Teletubies", "rap-teletubies.mp3"));
    jingles.push(this.makeJingle("Rap Surprise", "rap-surprise.mp3"));
    jingles.push(this.makeJingle("Shamallow Tchoin", "rap-shamallow-tchoin.mp3"));
    jingles.push(this.makeJingle("Shamallow NTM", "rap-shamallow-ntm.mp3"));
    return jingles;
  }

  public playJingle(jingle: AudioPart){
    this.audioService.playJingle(jingle.source);
  }

  public makeJingle(title:string, source:string):AudioPart {
    let audio = new AudioPart();
    audio.source = source;
    audio.title = title;
    return audio;
  }

}
