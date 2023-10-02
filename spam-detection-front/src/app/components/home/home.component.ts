import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    mail: new FormControl(null)
  });

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  check() {
    this.sharedService.postMail({ txt: this.form.controls["mail"].value }).subscribe(res => {
      alert(res);
    });
  }


}
