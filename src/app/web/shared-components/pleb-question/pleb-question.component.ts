import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlebsQuestion } from 'src/app/model/plebs-question';

@Component({
  selector: 'app-pleb-question',
  templateUrl: './pleb-question.component.html',
//  styleUrls: ['./pleb-question.component.css']
})
export class PlebQuestionComponent implements OnInit {

  @Input()  plebsQuestion:  PlebsQuestion;
  @Output() onEdit:         EventEmitter<string> = new EventEmitter();
  @Output() onDelete:       EventEmitter<string> = new EventEmitter();
  
  constructor() { }

  clickOnDelete(id: string): void {
    this.onDelete.emit(id);
  }

  clickOnEdit(id: string): void {
    this.onEdit.emit(id);
  }

  ngOnInit() {
  }

}
