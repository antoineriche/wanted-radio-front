import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveComponent } from './live.component';



@NgModule({
  declarations: [LiveComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LiveComponent
  ]
})
export class LiveModule { }
