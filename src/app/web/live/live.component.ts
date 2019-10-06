import { Component, OnInit } from '@angular/core';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent {

  constructor(private soundService: SoundService) { }

  playLetsGoSound(){
    this.soundService.playSoundWithName("vas-y.mp3");
  }

}
