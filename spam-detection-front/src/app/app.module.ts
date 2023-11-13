import 'ag-grid-enterprise';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GridComponent } from './components/grid/grid.component';
import { MailComponent } from './components/grid/mail/mail.component';
import { TextStyleComponent } from './components/grid/mail/text-style/text-style.component';
import { MailContentComponent } from './components/grid/mail-content/mail-content.component';

//Modules
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GridComponent,
    MailComponent,
    TextStyleComponent,
    MailContentComponent,
    AuthComponent,
  ],
  imports: [
    FormsModule,
    AgGridModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
