import { Component, OnInit } from '@angular/core';
import { SoundService } from '../services/sound.service';
import { AudioPart } from 'src/app/model/audio-part';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  private sounds: AudioPart[];

  constructor(private soundService: SoundService) { }

  ngOnInit() {
    this.sounds = this.soundService.getPresentationSounds();
  }

  private playSound(sound:AudioPart){
    this.soundService.playSound(sound);
  }


}
