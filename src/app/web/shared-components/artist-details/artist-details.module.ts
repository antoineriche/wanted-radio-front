import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDetailsComponent } from './artist-details.component';



@NgModule({
  declarations: [ArtistDetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ArtistDetailsComponent
  ]
})
export class ArtistDetailsModule { }
