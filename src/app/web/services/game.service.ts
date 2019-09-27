import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PlebsQuestion } from 'src/app/model/plebs-question';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private uri = 'http://localhost:9090/theshow/games/plebs';

  constructor(private http: HttpClient) { }

  getGames(): Observable<PlebsQuestion[]> {
    return <Observable<PlebsQuestion[]>> this.http.get(this.uri);
  }

  post(plebsQuestion: PlebsQuestion): Observable<HttpResponse<Object>> {
    return <Observable<HttpResponse<Object>>> this.http.post(this.uri, plebsQuestion.question);
  }
}
