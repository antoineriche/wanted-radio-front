import { Component, OnInit, Input } from '@angular/core';
import { RapperDetails, BeatBoxerDetails } from 'src/app/model/artist-details';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent {

  @Input() private readonly artist: RapperDetails|BeatBoxerDetails;

  constructor() { }

  isThereAProject(): boolean {
    return this.artist.artistDetails.project.name !== '';
  }

  areThereGamesToAvoid(): boolean {
    return this.artist.artistDetails.gameInfo.toAvoid.length > 0;
  }

  areThereLinks(): boolean {
    return this.artist.artistDetails.project.links.length > 0
      && this.artist.artistDetails.project.links[0] !== '';
  }

}
