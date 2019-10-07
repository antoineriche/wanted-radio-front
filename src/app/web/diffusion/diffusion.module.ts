import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiffusionComponent } from './diffusion.component';



@NgModule({
  declarations: [DiffusionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DiffusionComponent
  ]
})
export class DiffusionModule { }
