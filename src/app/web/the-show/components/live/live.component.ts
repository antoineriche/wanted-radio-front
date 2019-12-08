import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SoundService } from '../../../../services/sound.service';
import { AudioPart } from 'src/app/model/audio-part';
import { AudioService } from '../../../../services/audio.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnDestroy {

  @Input() readonly song: AudioPart;

  constructor(private soundService: SoundService, private audioService: AudioService) { }

  playLetsGoSound(){
    this.soundService.playSoundWithName("vas-y.mp3");
  }

  ngOnDestroy(): void {
    if(!this.audioService.canPlay()){
      this.audioService.stopSong();
    }
  }

}
