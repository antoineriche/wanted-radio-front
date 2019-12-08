import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GuestFileInfo } from 'src/app/model/guest-file-info';
import { ArtistDetails, RapperDetails, BeatBoxerDetails } from 'src/app/model/artist-details';
import { Media } from '../model/media';
import { ArtistType } from '../model/artist-type';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  private uri = 'http://localhost:9090/theshow/guests';

  constructor(private http: HttpClient) { }

  getGuestFiles(): Observable<GuestFileInfo[]> {
    return <Observable<GuestFileInfo[]>> this.http.get(this.uri);
  }

  getArtistWithName(artistName: string, artistType: ArtistType): Observable<RapperDetails|BeatBoxerDetails> {
    if(artistType == ArtistType.Beatboxer) {
      return <Observable<BeatBoxerDetails>> this.getBeatBoxerWithName(artistName);
    } else if (artistType == ArtistType.Rapper) {
      return <Observable<RapperDetails>> this.getRapperWithName(artistName);
    }
  }

  getRappers(): Observable<RapperDetails[]> {
    return <Observable<RapperDetails[]>> this.http.get(this.uri+"/rappers");
  }

  getRapperWithName(artistName: string): Observable<RapperDetails> {
    return <Observable<RapperDetails>> this.http.get(this.uri+"/rappers/" + artistName);
  }

  getFSong(artistName: string): Observable<any> {
    return this.http.get(this.uri+"/rappers/" + artistName+"/f-song");
  }

  getBeatBoxers(): Observable<BeatBoxerDetails[]> {
    return <Observable<BeatBoxerDetails[]>> this.http.get(this.uri+"/beatboxers");
  }

  getBeatBoxerWithName(artistName: string): Observable<BeatBoxerDetails> {
    return <Observable<BeatBoxerDetails>> this.http.get(this.uri+"/beatboxers/" + artistName);
  }

  getGuestInfo(fileId: string): Observable<ArtistDetails> {
    return <Observable<ArtistDetails>> this.http.get(this.uri+"/"+fileId);
  }

  getSongUrl(artistName: string, artistType: ArtistType, mediaType: number){
    if(artistType == ArtistType.Rapper) {
      return this.uri +  '/rappers/' + artistName + '/songs/' + mediaType;
    } else if(artistType == ArtistType.Beatboxer) {
      return this.uri +  '/beatboxers/' + artistName + '/songs/' + mediaType;
    }
  }

  uploadFile(file: any, fileName: string): Observable<any>{
    let body = new FormData();
    body.append("file", file);
    body.append("file-name", fileName);
    return <Observable<any>> this.http.post("http://localhost:9090/theshow/test7", body);
  }
}
