import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-mail-content',
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.css'],
})
export class MailContentComponent implements ICellRendererAngularComp {
  public Mail = '';
  public Type = '';
  public Sender = '';
  public Subject = '';
  private params!: ICellRendererParams;

  constructor() {}

  refresh(prms: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  agInit(params: ICellRendererParams) {
    this.params = params;
    this.Type = params.node.data.Type;
    this.Mail = params.node.data.Mail;
    this.Subject = params.node.data.Objet;
    this.Sender = params.node.data.Expediteur;
  }
}
