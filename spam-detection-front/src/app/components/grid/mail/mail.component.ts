import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef } from '@angular/material/dialog';
import { getCurrentDate } from 'src/app/helpers/dateFormatter';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
})
export class MailComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    sender: new FormControl(null),
    created_at: new FormControl(null),
    sujet: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
    reciever: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(
    public dialogRef: MatDialogRef<MailComponent>,
    private cookieService: CookieService
  ) {}
  ngOnInit() {
    this.form.controls['created_at'].setValue(getCurrentDate());
    this.form.controls['sender'].setValue(this.cookieService.get('mail'));
  }

  check() {
    if (this.form.valid) this.dialogRef.close(this.form.value);
    else Swal.fire('Warning', 'All fields are required', 'warning');
  }
}
