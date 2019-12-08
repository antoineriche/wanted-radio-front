import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PlebsQuestion } from 'src/app/model/plebs-question';
import { PlebsQuestionCategory } from 'src/app/model/plebs-question-category';
import { AudioService } from './audio.service';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private uri = 'http://localhost:9090/theshow/games/plebs';

  constructor(private http: HttpClient, private audioService: AudioService) { }

  getGames(): Observable<PlebsQuestion[]> {
    return <Observable<PlebsQuestion[]>> this.http.get(this.uri);
  }

  post(plebsQuestion: PlebsQuestion): Observable<HttpResponse<Object>> {
    console.log(plebsQuestion);
    return <Observable<HttpResponse<Object>>> this.http.post(this.uri, plebsQuestion);
  }

  deletePlebsQuestion(id: string){
    return <Observable<any>> this.http.delete(this.uri+"/"+id);
  }

  getAllPlebsCategory():string[]{
    return Object.keys(PlebsQuestionCategory).map(key => PlebsQuestionCategory[key])
  }

  getSongTest(){
    return <Observable<Blob>> this.http.get('http://localhost:9090/theshow/test6', 
    { responseType: 'blob' });
  }

  playSongWithURL(){
      this.audioService.playSongWithURL('http://localhost:9090/theshow/test6', null, null);
  }

  playSongWithAudio(audio: any){
    this.audioService.playSongWithAudio(audio, null, null);
  }
}
