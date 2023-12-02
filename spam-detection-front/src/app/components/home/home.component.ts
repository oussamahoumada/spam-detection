import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MailService } from 'src/app/services/mail.service';
import { MailComponent } from '../grid/mail/mail.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  public notif_number = 0;

  constructor(
    private dialog: MatDialog,
    private mailService: MailService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {}

  test() {
    this.mailService.setGridClass.emit(true);
  }
  doSerach(ev: any) {
    this.mailService.search.emit(ev.value);
  }
  filterMailList(mailType: any) {
    this.mailService.mailShowFilter.emit(mailType);
  }

  newMail() {
    const clientDialog = this.dialog.open(MailComponent, { width: '800px' });
    clientDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.mailService.addMail(result).subscribe(
          (res) => {
            this.mailService.loadData.emit(true);
            Swal.fire('Success', res, 'success');
          },
          (err) => {
            Swal.fire('Error', err, 'error');
          }
        );
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit() {
    const toggleButton = document.querySelector('.dark-light');

    toggleButton?.addEventListener('click', () => {
      document.getElementById('body')?.classList.toggle('light-mode');
    });

    $(function () {
      $('.menu-link').click(function () {
        $('.menu-link').removeClass('is-active');
        $(this).addClass('is-active');
      });
    });

    $(function () {
      $('.main-header-link').click(function () {
        $('.main-header-link').removeClass('is-active');
        $(this).addClass('is-active');
      });
    });

    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdowns.forEach((c) => c.classList.remove('is-active'));
        dropdown.classList.add('is-active');
      });
    });

    $('.search-bar input')
      .focus(function () {
        $('.header').addClass('wide');
      })
      .blur(function () {
        $('.header').removeClass('wide');
      });

    $(document).click(function (e) {
      var container = $('.status-button');
      var dd = $('.dropdown');
      if (
        !container.is(<any>e.target) &&
        container.has(<any>e.target).length === 0
      ) {
        dd.removeClass('is-active');
      }
    });

    $(function () {
      $('.dropdown').on('click', function (e) {
        $('.content-wrapper').addClass('overlay');
        e.stopPropagation();
      });
      $(document).on('click', function (e) {
        if ($(e.target).is('.dropdown') === false) {
          $('.content-wrapper').removeClass('overlay');
        }
      });
    });

    $(function () {
      $('.status-button:not(.open)').on('click', function (e) {
        $('.overlay-app').addClass('is-active');
      });
      $('.pop-up .close').click(function () {
        $('.overlay-app').removeClass('is-active');
      });
    });

    $('.status-button:not(.open)').click(function () {
      $('.pop-up').addClass('visible');
    });

    $('.pop-up .close').click(function () {
      $('.pop-up').removeClass('visible');
    });
  }
}
