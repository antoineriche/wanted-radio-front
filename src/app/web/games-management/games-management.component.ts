import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlebsQuestion } from 'src/app/model/plebs-question';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AudioService } from '../../services/audio.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-games-management',
  templateUrl: './games-management.component.html',
  styleUrls: ['./games-management.component.css']
})
export class GamesManagementComponent implements OnInit {

  private questions: PlebsQuestion[];
  private plebsQuestionForm: FormGroup;
  private plebsCategory: string[];
  private error:string;
  private audio:any;
  
  constructor(private formBuilder:FormBuilder, private gameService: GameService,
    private audioService: AudioService) { 
    this.questions = [];
    this.buildFormControl();
  }

  ngOnInit() {
    this.getGames();
    this.plebsCategory = this.gameService.getAllPlebsCategory();
  }

  buildFormControl(){
    this.plebsQuestionForm = this.formBuilder.group({ 
      pQuestion: new FormControl('', [Validators.required]),
      pCategory: new FormControl([Validators.required])
    });
  }

  private getGames(){
    this.gameService.getGames().subscribe(
      data => {
        console.log(data);
        this.questions = data;
      },
      err =>  this.showError(err)
    );
  }

  private addPlebs(){
    this.error = null;
    let plebs = new PlebsQuestion();
    plebs.question = this.plebsQuestionForm.value.pQuestion;
    plebs.category = this.plebsQuestionForm.value.pCategory;
    plebs.creation = new Date().toString();
    this.gameService.post(plebs).subscribe(
      data => {
        console.log(data);
        this.getGames();
        this.plebsQuestionForm.reset();
      },
      err =>  this.showError(err)
    );
  }

  private playAudio(){
    this.audioService.playSong("toof-coquin.mp3", this.onStartAudio, this.onEndAudio);
  }

  private onStartAudio(){
    console.log('start'); 
  }

  private onEndAudio(){
    console.log('end'); 
  }

  private stopAudio(){
    this.audioService.stopSong();
  }

  private clickOnDelete(id: string){
    this.gameService.deletePlebsQuestion(id).subscribe(
      data => this.getGames(),
      err =>  this.showError(err)
    );
  }

  private clickOnEdit(id: string){
    console.log('edit', id);
  }

  private showError(error){
    console.error(error);
    this.error = error.message;
  }

}
