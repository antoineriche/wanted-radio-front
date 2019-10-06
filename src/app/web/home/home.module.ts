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


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CazarreModule,
    PresentationModule,
    PointsModule,
    LiveModule,
    DeathGameModule,
    MatSidenavModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
