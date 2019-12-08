import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickAnArtistComponent } from './pick-an-artist.component';
import { ArtistDetailsModule } from '../shared-components/artist-details/artist-details.module';
import { ReactiveFormsModule } from "@angular/forms";
import { FilePickerModule } from '../shared-components/file-picker/file-picker.module';



@NgModule({
  declarations: [PickAnArtistComponent],
  imports: [
    CommonModule,
    ArtistDetailsModule,
    ReactiveFormsModule,
    FilePickerModule
  ]
})
export class PickAnArtistModule { }
