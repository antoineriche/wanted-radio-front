import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GuestFileInfo } from 'src/app/model/guest-file-info';
import { ArtistDetails } from 'src/app/model/artist-details';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  private uri = 'http://localhost:9090/theshow/guests';

  constructor(private http: HttpClient) { }

  getGuestFiles(): Observable<GuestFileInfo[]> {
    return <Observable<GuestFileInfo[]>> this.http.get(this.uri);
  }

  getGuestInfo(fileId: string): Observable<ArtistDetails> {
    return <Observable<ArtistDetails>> this.http.get(this.uri+"/"+fileId);
  }
}
