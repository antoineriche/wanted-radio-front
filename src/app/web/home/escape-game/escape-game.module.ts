import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscapeGameComponent } from './escape-game.component';



@NgModule({
  declarations: [EscapeGameComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EscapeGameComponent
  ]
})
export class EscapeGameModule { }
