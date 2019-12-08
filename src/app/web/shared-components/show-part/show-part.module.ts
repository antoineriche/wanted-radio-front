import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPartComponent } from './show-part.component';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { CountDownService } from 'src/app/services/count-down.service';



@NgModule({
  declarations: [ShowPartComponent],
  imports: [
    CommonModule,
    ProgressBarModule,
  ],
  exports: [
    // ShowPartComponent
  ]
})
export class ShowPartModule { }
