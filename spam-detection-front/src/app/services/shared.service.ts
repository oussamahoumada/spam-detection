import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private corsHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.corsHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'withCredentials' : 'true'
    });
   }

  postMail(body: any):Observable<any> {
    return this.http.post('http://127.0.0.1:5005/postMeth', body);
  }

  private readonly fontURL = "assets/fonts.json";
  getFonts():Observable<any> {
    return this.http.get(this.fontURL);
  }

}
