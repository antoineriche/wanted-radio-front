import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from './presentation.component';



@NgModule({
  declarations: [PresentationComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PresentationComponent
  ]
})
export class PresentationModule { }
