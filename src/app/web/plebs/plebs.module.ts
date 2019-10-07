import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlebsComponent } from './plebs.component';
import { PlebQuestionModule } from '../shared-components/pleb-question/pleb-question.module';



@NgModule({
  declarations: [PlebsComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    PlebsComponent
  ]
})
export class PlebsModule { }
