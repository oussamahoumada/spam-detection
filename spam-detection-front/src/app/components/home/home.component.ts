import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MailService } from 'src/app/services/mail.service';
import { MailComponent } from '../grid/mail/mail.component';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private mailService: MailService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/glass_script.js';
    this.elementRef.nativeElement.appendChild(s);
  }

  filterMailList(mailType: any) {
    this.mailService.mailShowFilter.emit(mailType);
  }

  newMail() {
    const clientDialog = this.dialog.open(MailComponent, { width: '800px' });
    clientDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.mailService.addMail(result).subscribe((res) => {
          this.mailService.loadData.emit(true);
          Swal.fire('Success', res, 'success');
        },
          (err) => {
            Swal.fire('Error', err, 'error');
        });
      }
    });
  }

  doSerach(ev: any) {
    this.mailService.search.emit(ev.value)
  }
}
