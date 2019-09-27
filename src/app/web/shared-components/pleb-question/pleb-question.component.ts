import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlebsQuestion } from 'src/app/model/plebs-question';

@Component({
  selector: 'app-pleb-question',
  templateUrl: './pleb-question.component.html',
//  styleUrls: ['./pleb-question.component.css']
})
export class PlebQuestionComponent implements OnInit {

  @Input()  plebsQuestion:  PlebsQuestion;
  @Output() onEdit:         EventEmitter<PlebsQuestion> = new EventEmitter();
  @Output() onDelete:       EventEmitter<PlebsQuestion> = new EventEmitter();
  
  constructor() { }

  clickOnDelete(plebsQuestion: PlebsQuestion): void {
    this.onDelete.emit(plebsQuestion);
  }

  clickOnEdit(plebsQuestion: PlebsQuestion): void {
    this.onEdit.emit(plebsQuestion);
  }

  ngOnInit() {
  }

}
