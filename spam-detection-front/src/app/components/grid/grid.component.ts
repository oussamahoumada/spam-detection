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
    this.rowData = this.data.filter((fl) => fl.Type == 'MAIL');
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
      field: 'Subject',
      lockVisible: true,
    },
    {
      width: 200,
      field: 'Sender',
    },
    {
      width: 800,
      field: 'Mail',
    },
    {
      width: 100,
      hide: true,
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
    { Subject: 'Porsche', Sender: 'Jhon', Mail: 'good morning', Type: 'MAIL' },
    {
      Subject: 'Ford',
      Sender: 'cedric',
      Mail: 'hello this is a mail test',
      Type: 'MAIL',
    },
    {
      Subject: 'Toyota',
      Sender: 'fredric',
      Mail: 'hello will you join me to day to a meeting',
      Type: 'SPAM',
    },
  ];

  gridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      filter: true,
    },
  };

  getContextMenuItems(params: any): any {
    var context = [
      {
        name: 'remove this mail',
        action: () => {
          console.log(params.node.data);
        },
      },
      {
        name: 'remove all spams',
        action: () => {
          console.log('do something');
        },
      },
      'separator',
      'export',
    ];
    return context;
  }

  mailFilter(val: any) {
    this.rowData = this.data.filter((fl) => fl.Type == val.tab.textLabel);
  }

  newMail() {
    this.dialog.open(MailComponent, { width: '800px' });
  }
}
