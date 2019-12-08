import { Component, OnInit, ViewChild } from '@angular/core';
import { GuestsService } from 'src/app/services/guests.service';
import { RapperDetails, BeatBoxerDetails } from 'src/app/model/artist-details';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

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
    private notifierService: NotifierService) {
  }

  private file: any;

  private fileChange(event: any){
    // Instantiate an object to read the file content
    let reader = new FileReader();
    // when the load event is fired and the file not empty
    if(event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      this.file = event.target.files[0];
      console.log('file', this.file);
  }
}


//TODO: prepare a show
  
  
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
      this.router.navigate(['the-show/', 
        this.currentArtist.artistDetails.artistType, 
        this.currentArtist.artistDetails.artistName]);
    } else {
      this.notifierService.showError("Artist details is null");
    }
  }

}