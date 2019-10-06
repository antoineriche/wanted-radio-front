import { Component, OnInit } from '@angular/core';
import { AudioPart } from 'src/app/model/audio-part';
import { AudioService } from '../services/audio.service';
import { SoundService } from '../services/sound.service';
import { JingleService } from '../services/jingle.service';

@Component({
  selector: 'app-death-game',
  templateUrl: './death-game.component.html',
  styleUrls: ['./death-game.component.css']
})
export class DeathGameComponent implements OnInit {

  deathAudios: AudioPart[];

  constructor(private jingleService: JingleService) { }

  playAudio(audio:AudioPart){
    console.log(audio)
    this.jingleService.playJingle(audio);
  }

  ngOnInit(){
    this.deathAudios = this.jingleService.getAllJingles();
    console.log(this.deathAudios);
  }
}
