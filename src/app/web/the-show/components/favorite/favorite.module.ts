import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';



@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FavoriteComponent
  ]
})
export class FavoriteModule { }
