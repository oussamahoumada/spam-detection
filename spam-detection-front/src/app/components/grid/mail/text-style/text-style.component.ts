import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-text-style',
  templateUrl: './text-style.component.html',
  styleUrls: ['./text-style.component.css']
})
export class TextStyleComponent implements OnInit {

  public colors: any = [];
  public fontStyles: any = [];
  public fonFamilies: any = [];
  public fontWeights: any = [];

  public form: FormGroup = new FormGroup({
    mail: new FormControl(null),
    color: new FormControl(null),
    font_style: new FormControl(null),
    font_family: new FormControl(null),
    font_weight: new FormControl(null),
  });

  constructor(private sharedService: SharedService) {
    this.sharedService.getFonts().subscribe(res => {
      this.colors = res.colors;
      this.fontStyles = res.fontStyles;
      this.fonFamilies = res.fontFamilies;
      this.fontWeights = res.fontWeights;
    });
  }

  ngOnInit() {}

  setMailStyle() {
    let mailStyle: any = document.getElementById("textarea");
    if (mailStyle.value != "") {
      for (let control in this.form.controls) {
        let fontName = control.replace("_", "-");
        mailStyle.style[fontName] = this.form.controls[control].value;
        console.log(this.form.controls[control].value)
      }
    }
  }

  open() {
    console.log((<HTMLSelectElement>document.getElementById("demo")))
  }
}
