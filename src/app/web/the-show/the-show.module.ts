import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { PresentationModule } from './components/presentation/presentation.module';
import { PointsModule } from 'src/app/web/shared-components/points/points.module';
import { LiveModule } from './components/live/live.module';
import { DeathGameModule } from './components/death-game/death-game.module';  
import { DiffusionModule } from './components/diffusion/diffusion.module';
import { PlebsModule } from './components/plebs/plebs.module';
import { QuizModule } from './components/quiz/quiz.module';
import { IntroductionModule } from './components/introduction/introduction.module';
import { DecorticationModule } from './components/decortication/decortication.module';
import { FavoriteModule } from './components/favorite/favorite.module';
import { FreestyleModule } from './components/freestyle/freestyle.module';
import { ProjectModule } from './components/project/project.module';
import { PromotionModule } from './components/promotion/promotion.module';
import { EscapeGameModule } from './components/escape-game/escape-game.module';
import { CazarreModule } from './components/cazarre/cazarre.module';
import { TheShowComponent } from './the-show.component';
import { NotifierModule } from '../shared-components/notifier/notifier.module';


@NgModule({
  declarations: [
    TheShowComponent
  ],
  imports: [
    CommonModule,
    CazarreModule,
    PresentationModule,
    PointsModule,
    NotifierModule,
    DiffusionModule,
    PlebsModule,
    QuizModule,
    FavoriteModule,
    FreestyleModule,
    ProjectModule,
    PromotionModule,
    EscapeGameModule,
    IntroductionModule,
    DecorticationModule,
    LiveModule,
    DeathGameModule,
    MatSidenavModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TheShowModule { }
