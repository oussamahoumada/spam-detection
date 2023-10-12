import Swal from 'sweetalert2';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MailComponent } from './mail/mail.component';
import { MailContentComponent } from './mail-content/mail-content.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  public mailContentComponent: any = MailContentComponent;
  public rowData: any;

  constructor(private dialog: MatDialog) {}
  ngOnInit() {
    this.rowData = this.data;
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
      field: 'Objet',
      lockVisible: true,
    },
    {
      width: 200,
      field: 'Expediteur',
    },
    {
      width: 800,
      field: 'Mail',
    },
    {
      width: 100,
      field: 'Type',
    },
  ];
  public defaultColDef: ColDef = {
    filter: true,
    sortable: true,
    resizable: true,
    editable: false,
  };

  data = [
    {
      Type: 'MAIL',
      Objet: 'hello',
      Expediteur: 'Jhon@mail.com',
      Mail: 'good morning this mail is empty',
    },
    {
      Type: 'SPAM',
      Objet: 'you win',
      Expediteur: 'cedric@mail.com',
      Mail: 'hello you win 532$',
    },
    {
      Type: 'MAIL',
      Objet: 'meeting',
      Expediteur: 'fredric@mail.com',
      Mail: 'hello will you join me to day to a meeting',
    },
    {
      Type: 'MAIL',
      Objet: 'Say hello',
      Expediteur: 'Jhon@mail.com',
      Mail: 'good morning this mail is empty',
    },
    {
      Type: 'SPAM',
      Objet: 'test',
      Expediteur: 'cedric@mail.com',
      Mail: 'hello surprise you win 10000$',
    },
    {
      Type: 'MAIL',
      Objet: 'meeting',
      Expediteur: 'fredric@mail.com',
      Mail: 'hello will you join me to day to a meeting',
    },
  ];

  gridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      filter: true,
    },
    context: { thisComponent: this },
  };

  getContextMenuItems(params: any): any {
    var context = [
      {
        name: 'remove this mail...',
        action: () => {
          params.context.thisComponent.removeMail(params.node.data);
        },
      },
      {
        name: 'remove all SPAMs...',
        action: () => {
          params.context.thisComponent.removeAllSpams();
        },
      },
      {
        name: 'this is not a SAPM?',
        disabled: params.node.data.Type != 'SPAM',
        action: () => {
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
      this.rowData = this.data.filter((fl) => fl.Type == val.tab.textLabel);
    }
  }

  newMail() {
    this.dialog.open(MailComponent, { width: '800px' });
  }

  public getRowStyle(params: any) {
    if (params.node.data.Type == 'SPAM') {
      return { background: 'red' };
    }
    return { background: 'white' };
  }

  checkMail(mail: any) {
    console.log(mail);
  }

  removeAllSpams() {
    Swal.fire('warning', 'Are you sure you want to delete all spams', 'question');
  }

  removeMail(mail: any) {
    console.log(mail);
  }
}
