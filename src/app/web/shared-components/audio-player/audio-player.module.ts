import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './audio-player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';

@NgModule({
  declarations: [AudioPlayerComponent],
  imports: [
    CommonModule,
    ProgressBarModule,
    FontAwesomeModule,
  ],
  exports: [
    AudioPlayerComponent
  ]
})
export class AudioPlayerModule {
}
