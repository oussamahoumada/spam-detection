import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { corsHeaders } from 'src/app/helpers/corsValidation';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}
  private readonly url = 'http://localhost:5000/Mail/';
  public search: EventEmitter<any> = new EventEmitter();
  public loadData: EventEmitter<boolean> = new EventEmitter();
  public mailShowFilter: EventEmitter<any> = new EventEmitter();
  public setGridClass: EventEmitter<any> = new EventEmitter();

  getMails(mail: string): Observable<any> {
    return this.http.get(this.url + mail);
  }

  addMail(body: any): Observable<any> {
    return this.http.post(this.url, body, {
      headers: corsHeaders,
    });
  }

  deleteMails(ids: any): Observable<any> {
    let body: any = [];
    ids.forEach((element: any) => {
      body.push({ id: element });
    });
    return this.http.post(
      this.url + 'delete',
      { ids: body },
      {
        headers: corsHeaders,
      }
    );
  }

  updateMail(id: any, type: any): Observable<any> {
    return this.http.put(
      this.url,
      { idMail: id, type: type },
      {
        headers: corsHeaders,
      }
    );
  }

  deleteAllSpams(): Observable<any> {
    return this.http.get(this.url + 'delete_all_spams', {
      headers: corsHeaders,
    });
  }
}
