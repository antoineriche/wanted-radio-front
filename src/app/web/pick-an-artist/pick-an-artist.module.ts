import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickAnArtistComponent } from './pick-an-artist.component';
import { ArtistDetailsModule } from '../shared-components/artist-details/artist-details.module';



@NgModule({
  declarations: [PickAnArtistComponent],
  imports: [
    CommonModule,
    ArtistDetailsModule
  ]
})
export class PickAnArtistModule { }
