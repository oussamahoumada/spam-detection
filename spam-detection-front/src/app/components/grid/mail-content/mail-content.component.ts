import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-mail-content',
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.css'],
})
export class MailContentComponent implements ICellRendererAngularComp {
  public Content = '';
  public Type = '';
  public Sender = '';
  public Subject = '';
  public Reciever = '';
  public CreatedAt = '';

  private params!: ICellRendererParams;

  constructor() {}

  refresh(prms: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  agInit(params: ICellRendererParams) {
    this.params = params;
    this.Type = params.node.data.type;
    this.Content = params.node.data.content;
    this.Subject = params.node.data.sujet;
    this.Sender = params.node.data.sender;
    this.Reciever = params.node.data.reciever;
    this.CreatedAt = params.node.data.created_at;
  }
}
