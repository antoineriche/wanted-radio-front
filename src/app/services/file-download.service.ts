import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient) { }

  downloadFIle(url): Observable<Blob> {
    // console.log(url)
    // url = 'https://cors-anywhere.herokuapp.com/' + url;
    // console.log(url)
    return <Observable<Blob>> this.http.get(url, { reportProgress: true, responseType: "blob" })
  }

  // downloadFile(url:string){

  //   downloadFile(): Observable<HttpResponse<Blob>>{		
  //     return this.http.get('http://localhost:8080/employees/download', { responseType: ResponseContentType.Blob });
  //    }


  //   // const blob = new Blob([], {type : 'audio/webm'});
  //   // const url = window.URL.createObjectURL(blob);
  //   console.log('download: ' + url);
  //   url = 'https://cors-anywhere.herokuapp.com/' + url;
  //   this.http.get(url, { responseType: 'blob' }).pipe(
  //     map(res => {
  //       console.log(res);
  //       return {
  //         data: res,
  //         body: 'ok'
  //       }},
  //       err => console.log(err)
  //       )
  //     ).subscribe(result => {
  //       console.log(result);
  //       let file: any = result.data;
  //       file.lastModifiedDate = new Date();
  //       file.name = "audio.mp3";

  //       const fd = new FormData();
  //       fd.append('image', file, file.name);

  //       this.http.post('http://localhost:4200/assets', fd)
  //         .subscribe(res => {
  //           console.log(res);
  //         });
  //     });
  // }

  /*

downloadFile(): Observable<HttpResponse<Blob>>{		
		return this.http.get('http://localhost:8080/employees/download', { responseType: ResponseContentType.Blob });
   }
  */
}
