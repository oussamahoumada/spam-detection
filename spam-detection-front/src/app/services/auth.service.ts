import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://127.0.0.1:5000/Authentication';

  constructor(private route: Router, private http: HttpClient) {}
  login(mail: string, pass: string): Observable<any> {
    return this.http.get<any>(this.url + "/login/" + mail + "/" + pass);
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
