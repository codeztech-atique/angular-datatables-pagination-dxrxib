import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PapaParseModule } from "ngx-papaparse";
import { DataTablesModule } from 'angular-datatables';
import { ReadfileService } from './readfile.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule,PapaParseModule, DataTablesModule, HttpModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ReadfileService]
})
export class AppModule { }
