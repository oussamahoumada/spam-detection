import Swal from 'sweetalert2';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MailService } from 'src/app/services/mail.service';
import { MailContentComponent } from './mail-content/mail-content.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  public data: any;
  public rowData: any;
  public mailContentComponent: any = MailContentComponent;
  public class_grid = 'ag-theme-alpine';

  constructor(
    private mailService: MailService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.loadData();

    this.mailService.loadData.subscribe((res: any) => {
      this.loadData();
    });

    this.mailService.search.subscribe((res: any) => {
      this.rowData = this.data.filter(
        (fl: any) =>
          fl.type.includes(res) ||
          fl.sujet.includes(res) ||
          fl.sender.includes(res) ||
          fl.content.includes(res) ||
          fl.reciever.includes(res)
      );
    });

    this.mailService.mailShowFilter.subscribe((res: any) => {
      switch (res) {
        case 'ALL':
          this.rowData = this.data;
          break;
        case 'spams':
          this.rowData = this.data.filter((fl: any) => fl.type == 'spam');
          break;
        case 'notification':
          this.rowData = this.data.filter((fl: any) => fl.type == 'mail');
          break;
        case 'sended':
          this.rowData = this.data.filter(
            (fl: any) => fl.sender == this.cookieService.get('mail')
          );
          break;
        case 'recieved':
          this.rowData = this.data.filter(
            (fl: any) => fl.reciever == this.cookieService.get('mail')
          );
          break;
        default:
          this.rowData = this.data.filter((fl: any) => fl.type == 'spam');
          break;
      }
    });

    this.mailService.setGridClass.subscribe((res) => {
      this.class_grid =
        this.class_grid == 'ag-theme-alpine-dark'
          ? 'ag-theme-alpine'
          : 'ag-theme-alpine-dark';
    });
  }
  loadData() {
    this.mailService
      .getMails(this.cookieService.get('mail'))
      .subscribe((res) => {
        this.rowData = res;
        this.data = res;
      });
  }
  columnDefs: ColDef[] = [
    {
      width: 110,
      rowDrag: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      headerCheckboxSelectionFilteredOnly: true,
    },
    {
      width: 200,
      field: 'sujet',
      lockVisible: true,
      headerName: 'Sujet',
    },
    {
      width: 200,
      field: 'sender',
      headerName: 'Sender',
    },
    {
      width: 200,
      field: 'reciever',
      headerName: 'Reciever',
    },
    {
      width: 800,
      field: 'content',
      headerName: 'Content',
    },
    {
      width: 100,
      field: 'type',
      headerName: 'Type',
    },
    {
      width: 100,
      field: 'created_at',
      headerName: 'Created At',
    },
    {
      width: 100,
      field: 'idMail',
      headerName: 'Mail id',
    },
  ];
  public defaultColDef: ColDef = {
    filter: true,
    sortable: true,
    resizable: true,
    editable: false,
  };

  gridOptions = {
    defaultColDef: {
      flex: 1,
      filter: true,
      minWidth: 100,
    },
    context: { thisComponent: this },
  };

  getContextMenuItems(params: any): any {
    var context = [
      {
        name: 'remove this mail...',
        action: () => {
          if (params.node.data != null && params.node.data != undefined)
            params.context.thisComponent.removeMail([params.node.data.idMail]);
        },
      },
      {
        name: 'remove all SPAMs...',
        action: () => {
          if (params.node.data != null && params.node.data != undefined)
            params.context.thisComponent.removeAllSpams();
        },
      },
      {
        name: 'this is not a SAPM?',
        disabled: params.node.data.type != 'spam',
        action: () => {
          if (params.node.data != null && params.node.data != undefined)
            params.context.thisComponent.checkMail(params.node.data);
        },
      },
      'separator',
      'export',
    ];
    return context;
  }

  mailFilter(val: any) {
    if (val.tab.textLabel == 'ALL') {
      this.rowData = this.data;
    } else {
      this.rowData = this.data.filter(
        (fl: any) => fl.type == String(val.tab.textLabel).toLocaleLowerCase()
      );
    }
  }

  public getRowStyle(params: any) {
    if (params.node.data.type == 'spam') {
      return { background: 'red' };
    }
    return { background: 'white' };
  }

  checkMail(mail: any) {
    this.mailService.updateMail(mail.idMail).subscribe(
      (res) => {
        this.loadData();
        Swal.fire('Success', res, 'success');
      },
      (err) => {
        Swal.fire('Error', err, 'error');
      }
    );
  }

  removeAllSpams() {
    this.mailService.deleteAllSpams().subscribe(
      (res) => {
        this.loadData();
        Swal.fire('Success', res, 'success');
      },
      (err) => {
        Swal.fire('Error', err, 'error');
      }
    );
  }

  removeMail(ids: any) {
    this.mailService.deleteMails(ids).subscribe(
      (res) => {
        this.loadData();
        Swal.fire('Success', res, 'success');
      },
      (err) => {
        Swal.fire('Error', err, 'error');
      }
    );
  }
}
