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
    mail: new FormControl(null),
    color: new FormControl(null),
    font_style: new FormControl(null),
    font_family: new FormControl(null),
    font_weight: new FormControl(null),
  });

  public colors: any = [];
  public fontStyles: any = [];
  public fonFamilies: any = [];
  public fontWeights: any = [];

  constructor(private sharedService: SharedService) {
    this.sharedService.getFonts().subscribe(res => {
      this.colors = res.colors;
      this.fontStyles = res.fontStyles;
      this.fonFamilies = res.fontFamilies;
      this.fontWeights = res.fontWeights;
    });
  }

  ngOnInit(): void { }

  check() {
    this.sharedService.postMail({ txt: this.form.controls["mail"].value }).subscribe(res => {
      console.log(res);
    });
  }

  setMailStyle() {
    if (this.form.controls['mail'].value != null) {
      for (let control in this.form.controls) {
        if (this.form.controls[control].value != null && control!= "mail") {
          let fontName = control.replace("_", "-");
        }
      }
    }
  }
}
