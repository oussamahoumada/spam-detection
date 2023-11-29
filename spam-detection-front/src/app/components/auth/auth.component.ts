import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public hide = true;

  public loginForm: FormGroup = new FormGroup({
    passWord: new FormControl(null, [Validators.required]),
    mailAdress: new FormControl(null, [Validators.required, Validators.email]),
  });

  public registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    passWord: new FormControl(null, [Validators.required]),
    dateNaissance: new FormControl(null, [Validators.required]),
    mailAdress: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.authService.logout();
  }

  doAuthentication() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res: any) => {
          if (res) {
            this.cookieService.set('token', res.token);
            this.cookieService.set(
              'mail',
              this.loginForm.controls['mailAdress'].value
            );
            this.router.navigate(['home']);
          } else {
            Swal.fire('Login', 'mail/passWord incorrect', 'warning');
          }
        },
        (err: any) => {
          Swal.fire('Login', err, 'error');
        }
      );
    } else {
      Swal.fire('Login', 'all fields are required', 'warning');
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (res: any) => {
          if (res) {
            Swal.fire('Registration', 'Registration successed', 'success');
          } else {
            Swal.fire('Registration', 'mail/passWord incorrect', 'warning');
          }
        },
        (err: any) => {
          Swal.fire('Registration', err, 'error');
        }
      );
    } else {
      Swal.fire('Registration', 'all fields are required', 'warning');
    }
  }
}
