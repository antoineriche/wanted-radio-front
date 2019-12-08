import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AudioPart } from 'src/app/model/audio-part';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-diffusion',
  templateUrl: './diffusion.component.html',
  styleUrls: ['./diffusion.component.css']
})
export class DiffusionComponent implements OnInit, OnDestroy {
  
  @Input() readonly song: AudioPart;

  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    if(!this.audioService.canPlay()){
      this.audioService.stopSong();
    }
  }

}
