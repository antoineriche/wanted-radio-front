import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrepareShowComponent } from './prepare-show.component';
import { ReactiveFormsModule } from "@angular/forms";




@NgModule({
  declarations: [PrepareShowComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PrepareShowModule { }
