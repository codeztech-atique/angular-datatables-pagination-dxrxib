import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Papa } from 'ngx-papaparse';
import { ReadfileService } from './readfile.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
declare let $: any;


class Person {
  restaurantID: number;
  restaurantName: string;
  cuisines:string;
  averageCostfortwo: number;
  currency: string;
  hasTablebooking: string;
  hasOnlinedelivery: string;
  aggregaterating: string;
  ratingcolor: string;
  ratingtext: string;
  votes: number
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  csvData: any[] = [];
  headerRow: any[] = [];
  tableData = [];
  dataTableHeader = [];
  table: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject = new Subject();
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  tableData = [];
  

  constructor(private http: HttpClient, private papa: Papa, private readfile: ReadfileService) {
  }
  ngOnInit(): void  {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ajax: (dataTablesParameters: any, callback) => {
        this.readfile.getData().subscribe(data => {
              this.papa.parse(data, {
              skipEmptyLines: true,
              header: true,
              complete: (results) => {
                  console.log(results);
                  this.tableData = results.data;
                  var tableHeader = [];
                  Object.keys(this.tableData[0])
                    .forEach(function eachKey(key) {
                      tableHeader.push(key);
                  })
                  this.dataTableHeader = tableHeader;
                  console.log(this.tableData.length, this.tableData.length);
                  this.dtTrigger.next();
                  console.log('Order Details', this.tableData);
              }
           });
        })
      },
      columns: [{ data: 'restaurantID' }, { data: 'restaurantName'}, { data: 'cuisines' }, { data: 'averageCostfortwo' }, { data: 'currency' }, { data: 'hasTablebooking' }, { data: 'hasOnlinedelivery' }, { data: 'aggregaterating' }, { data: 'ratingcolor' }, { data: 'ratingtext' }, { data: 'votes' }]
    };
  }


  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log('Button in the row clicked.');
  }

  wholeRowClick(): void {
    console.log('Whole row clicked.');
  }

  nextButtonClickEvent(): void {
    console.log('next clicked')
  }
  
  

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
