import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveComponent } from './live.component';
import { AudioPlayerModule } from 'src/app/web/shared-components/audio-player/audio-player.module';



@NgModule({
  declarations: [LiveComponent],
  imports: [
    CommonModule,
    AudioPlayerModule
  ],
  exports: [
    LiveComponent
  ]
})
export class LiveModule { }
