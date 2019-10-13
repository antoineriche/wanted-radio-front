import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GuestFileInfo } from 'src/app/model/guest-file-info';
import { ArtistDetails, RapperDetails, BeatBoxerDetails } from 'src/app/model/artist-details';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  private uri = 'http://localhost:9090/theshow/guests';

  constructor(private http: HttpClient) { }

  getGuestFiles(): Observable<GuestFileInfo[]> {
    return <Observable<GuestFileInfo[]>> this.http.get(this.uri);
  }

  getRappers(): Observable<RapperDetails[]> {
    return <Observable<RapperDetails[]>> this.http.get(this.uri+"/rappers");
  }

  getBeatBoxers(): Observable<BeatBoxerDetails[]> {
    return <Observable<BeatBoxerDetails[]>> this.http.get(this.uri+"/beatboxers");
  }

  getGuestInfo(fileId: string): Observable<ArtistDetails> {
    return <Observable<ArtistDetails>> this.http.get(this.uri+"/"+fileId);
  }
}
