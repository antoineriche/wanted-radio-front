import { Component, OnInit, Input } from '@angular/core';
import { AudioPart } from 'src/app/model/audio-part';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-diffusion',
  templateUrl: './diffusion.component.html',
  styleUrls: ['./diffusion.component.css']
})
export class DiffusionComponent implements OnInit {

  @Input() readonly song: AudioPart;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  private playAudio(audio:any){
    this.audioService.playSongToPlay(audio.source);
  }

}
