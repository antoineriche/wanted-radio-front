import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlebQuestionComponent } from './pleb-question.component';
import { MatIcon, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [PlebQuestionComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    PlebQuestionComponent
  ]
})
export class PlebQuestionModule { }
