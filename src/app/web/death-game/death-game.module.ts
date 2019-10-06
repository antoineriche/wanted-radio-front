import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeathGameComponent } from './death-game.component';



@NgModule({
  declarations: [DeathGameComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DeathGameComponent
  ]
})
export class DeathGameModule { }
