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
  public loginForm: FormGroup = new FormGroup({
    pass: new FormControl(null, [Validators.required]),
    mail: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  doAuthentication() {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.controls['mail'].value,
          this.loginForm.controls['pass'].value
        )
        .subscribe(
          (res: any) => {
            if (res) {
              //localStorage.setItem('token', res.token);
              this.cookieService.set('token', res.token);
              this.cookieService.set(
                'mail',
                this.loginForm.controls['mail'].value
              );
              this.router.navigate(['home']);
            } else {
              Swal.fire('warning', 'mail/passWord incorrect', 'warning');
            }
          },
          () => {
            Swal.fire('error', 'Somethng wints wrong', 'error');
          }
        );
    } else {
      Swal.fire('warning', 'all fields are required', 'warning');
    }
  }
}
