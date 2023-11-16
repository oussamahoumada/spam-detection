import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

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
              localStorage.setItem('token', res.token);
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
