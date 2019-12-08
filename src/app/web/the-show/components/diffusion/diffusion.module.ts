import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiffusionComponent } from './diffusion.component';
import { AudioPlayerModule } from 'src/app/web/shared-components/audio-player/audio-player.module';



@NgModule({
  declarations: [DiffusionComponent],
  imports: [
    CommonModule,
    AudioPlayerModule
  ],
  exports: [
    DiffusionComponent
  ]
})
export class DiffusionModule { }
