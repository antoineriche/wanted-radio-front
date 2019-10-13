import { Component, OnInit } from '@angular/core';
import { GuestsService } from 'src/app/services/guests.service';
import { GuestFileInfo } from 'src/app/model/guest-file-info';
import { RapperDetails, BeatBoxerDetails } from 'src/app/model/artist-details';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-pick-an-artist',
  templateUrl: './pick-an-artist.component.html',
  styleUrls: ['./pick-an-artist.component.css']
})
export class PickAnArtistComponent implements OnInit {

  private rappers: RapperDetails[];
  private beatBoxers: BeatBoxerDetails[];
  private currentArtist: RapperDetails|BeatBoxerDetails;

  constructor(private guestsService: GuestsService, private router: Router,
    private notifierService: NotifierService) { }

  ngOnInit() {
    this.getRappers();
    this.getBeatBoxers();  
  }

  seeDetails(artist:RapperDetails|BeatBoxerDetails){
    this.currentArtist = artist;
    console.log(artist);
  }

  getRappers(){
    this.guestsService.getBeatBoxers().subscribe(
      data => this.beatBoxers = data,
      err => this.notifierService.showAPIError(err)
    );
  }

  getBeatBoxers(){
    this.guestsService.getRappers().subscribe(
      data => this.rappers = data,
      err => this.notifierService.showAPIError(err)
    );
  }

  startShow(){
    if (this.currentArtist != null) {
      let artistName = this.currentArtist.artistDetails.artistName;
      this.router.navigate(['the-show/', artistName]);
    } else {
      this.notifierService.showError("Artist details is null");
    }
  }
}