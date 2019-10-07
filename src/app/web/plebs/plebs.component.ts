import { Component, OnInit } from '@angular/core';
import { PlebsQuestion } from 'src/app/model/plebs-question';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-plebs',
  templateUrl: './plebs.component.html',
  styleUrls: ['./plebs.component.css']
})
export class PlebsComponent implements OnInit {

  private questions: PlebsQuestion[];
  private error:string;
  private currentQuestion:PlebsQuestion;


  constructor(private gameService: GameService) { 
    this.questions = [];
  }

  ngOnInit() {
    this.getAllQuestions();
  }

  private getAllQuestions(){
    this.gameService.getGames().subscribe(
      data => {
        console.log(data);
        this.questions = data;
      },
      err =>  this.showError(err)
    );
  }

  private showError(error){
    console.error(error);
    this.error = error.message;
  }

  private getRandomQuestion(){
    let index = Math.floor(Math.random() * Math.floor(this.questions.length));
    this.currentQuestion = this.questions[index];
  }

}
