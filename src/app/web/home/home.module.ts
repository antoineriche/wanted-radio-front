import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatSidenavModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { CazarreModule } from '../cazarre/cazarre.module';
import { PresentationModule } from '../presentation/presentation.module';
import { PointsModule } from 'src/app/web/shared-components/points/points.module';
import { LiveModule } from '../live/live.module';
import { DeathGameModule } from '../death-game/death-game.module';
import { DiffusionModule } from '../diffusion/diffusion.module';
import { PlebsModule } from '../plebs/plebs.module';
import { QuizModule } from './quiz/quiz.module';
import { IntroductionModule } from './introduction/introduction.module';
import { DecorticationModule } from './decortication/decortication.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FreestyleModule } from './freestyle/freestyle.module';
import { ProjectModule } from './project/project.module';
import { PromotionModule } from './promotion/promotion.module';
import { EscapeGameModule } from './escape-game/escape-game.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CazarreModule,
    PresentationModule,
    PointsModule,
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
export class HomeModule { }
