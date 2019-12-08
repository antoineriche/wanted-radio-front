import { Component, OnInit, Input } from '@angular/core';
import { RapperDetails, BeatBoxerDetails } from 'src/app/model/artist-details';
import { FileDownloadService } from 'src/app/services/file-download.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent {

  @Input() private readonly artist: RapperDetails|BeatBoxerDetails;

  constructor(private fileDownloadService: FileDownloadService) { }

  isThereAProject(): boolean {
    return this.artist.artistDetails.project.name !== '';
  }

  areThereGamesToAvoid(): boolean {
    return this.artist.artistDetails.gameInfo.toAvoid.length > 0;
  }

  areThereLinksForProject(): boolean {
    return this.artist.artistDetails.project.links.length > 0
      && this.artist.artistDetails.project.links[0] !== '';
  }

  prepareArtistFile(){
    this.fileDownloadService.downloadFIle(this.artist.artistDetails.favoriteSong.downloadURL)
    .subscribe(
      res => {
        let blob = new Blob([res], { type: 'text/html' });
//        window.location.href = blobUrl;
        FileSaver.saveAs(blob, 'test');
//        window.open(blobUrl);
        console.log(res);
      },
      err => console.log(err)
      );
  }

}
