import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { PlebsQuestion } from 'src/app/model/plebs-question';
import { PlebQuestionModule } from '../shared-components/pleb-question/pleb-question.module';

@Component({
  selector: 'app-games-management',
  templateUrl: './games-management.component.html',
  styleUrls: ['./games-management.component.css']
})
export class GamesManagementComponent implements OnInit {

  private questions: PlebsQuestion[];
  
  constructor(private gameService: GameService) { 
    this.questions = [];
  }

  ngOnInit() {
    this.getGames();
  }

  private getGames(){
    this.gameService.getGames().subscribe(
      data => {
        console.log(data);
        this.questions = data;
      },
      err =>  console.error(err)
    );
  }

  private addPlebs(){
    let plebs = new PlebsQuestion();
    plebs.question = "test to be updated";
    plebs.creation = "unknown";
    plebs.category = "unknown";
    this.gameService.post(plebs).subscribe(
      data => {
        console.log(data);
        this.getGames();
      },
      err => console.log(err)
    );
  }

  private clickOnDelete(q: PlebsQuestion){
    console.log('delete', q);
  }

  private clickOnEdit(q: PlebsQuestion){
    console.log('edit', q);
  }

}
