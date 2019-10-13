import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlebsComponent } from './plebs.component';



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
