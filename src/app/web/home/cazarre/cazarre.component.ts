import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-cazarre',
  templateUrl: './cazarre.component.html',
  styleUrls: ['./cazarre.component.css']
})
export class CazarreComponent implements OnInit {

  @Input() readonly audios: any;
  
  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  private playAudio(audio:any){
    console.log(audio)
    this.audioService.playCazaToofSong(audio.source);
  }

  private startAudio(){
    console.log('play');
  }

  private endAudio(){
    console.log('end');
  }


}
