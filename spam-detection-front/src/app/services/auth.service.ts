import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { corsHeaders } from 'src/app/helpers/corsValidation';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://127.0.0.1:5000/Authentication';
  public token: any = null;
  public mail: any;

  constructor(
    private route: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}
  login(mail: string, pass: string): Observable<any> {
    return this.http.get<any>(this.url + '/login/' + mail + '/' + pass, {
      headers: corsHeaders,
    });
  }

  logout() {
    //localStorage.clear();
    this.cookieService.deleteAll();
    this.route.navigate(['login']);
  }

  isLoggedIn() {
    return !!this.cookieService.get('token');
    //return !!localStorage.getItem('token');
  }
}
