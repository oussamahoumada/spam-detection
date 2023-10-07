import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
})
export class MailComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    objet: new FormControl(null),
    mailContent: new FormControl(null),
    receiver: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private sharedService: SharedService) {}
  ngOnInit() {}

  check() {
    this.sharedService
      .postMail({ txt: this.form.controls['mailContent'].value })
      .subscribe((res) => {
        alert(res);
      });
  }
}
