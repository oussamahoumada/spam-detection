import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { corsHeaders } from 'src/app/helpers/corsValidation';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}
  private readonly url = 'http://localhost:5000/Mail/';

  getMails(mail: string): Observable<any> {
    return this.http.get(this.url + mail);
  }

  addMail(body: any): Observable<any> {
    return this.http.post(this.url, body, {
      headers: corsHeaders,
    });
  }
}
