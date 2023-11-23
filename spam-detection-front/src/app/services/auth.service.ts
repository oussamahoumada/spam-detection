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
  public mail: any;
  public token: any = null;
  private url = 'http://127.0.0.1:5000/Authentication';

  constructor(
    private route: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  login(body: any): Observable<any> {
    return this.http.post<any>(this.url + '/login', body, {
      headers: corsHeaders,
    });
  }

  logout() {
    this.cookieService.deleteAll();
    this.route.navigate(['login']);
  }

  isLoggedIn() {
    return !!this.cookieService.get('token');
  }

  register(body: any): Observable<any> {
    return this.http.post<any>(this.url + '/register', body, {
      headers: corsHeaders,
    });
  }
}
