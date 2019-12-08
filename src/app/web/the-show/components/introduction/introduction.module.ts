import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction.component';
import { AudioPlayerModule } from 'src/app/web/shared-components/audio-player/audio-player.module';
import { ShowPartModule } from 'src/app/web/shared-components/show-part/show-part.module';
import { ProgressBarModule } from 'src/app/web/shared-components/progress-bar/progress-bar.module';



@NgModule({
  declarations: [IntroductionComponent],
  imports: [
    CommonModule,
    AudioPlayerModule,
    ProgressBarModule,
    ShowPartModule
  ],
  exports: [
    IntroductionComponent
  ]
})
export class IntroductionModule { }
