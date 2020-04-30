import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Papa } from 'ngx-papaparse';
import { ReadfileService } from './readfile.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
declare let $: any;



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
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  

  constructor(private http: HttpClient, private papa: Papa, private readfile: ReadfileService) {
  }
  ngOnInit(): void  {
    var that = this;
    this.dtOptions = {
      // pagingType: 'full_numbers',
      // pageLength: 10,
      scrollY: 400,
			scrollCollapse: true,
			scroller: true,
      paging: false,
      lengthChange: false,
			ordering: true,
			order: [[ 1, "desc" ]],
      info: true,
      autoWidth: false,
      ajax: {
          url: "/assets/data.csv",
          method: "GET",
          dataType: 'text',
          crossDomain: true, 
          dataSrc: function ( json ) {
            that.papa.parse(json, {
            skipEmptyLines: true,
            header: true,
            complete: (results) => {
                that.tableData = results.data;
                var tableHeader = [];
            }
          });
          
          return that.tableData;
        }
      },
      columns: [{ data: 'restaurantID' }, { data: 'restaurantName'}, { data: 'cuisines' }, { data: 'averageCostfortwo' }, { data: 'currency' }, { data: 'hasTablebooking' }, { data: 'hasOnlinedelivery' }, { data: 'aggregaterating' }, { data: 'ratingcolor' }, { data: 'ratingtext' }, { data: 'votes' }]
    };
  }



}
