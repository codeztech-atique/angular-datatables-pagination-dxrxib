import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { ReadfileService } from './readfile.service';
import { DataTableDirective } from 'angular-datatables';
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
  votes: number;
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
export class AppComponent {
  csvData: any[] = [];
  headerRow: any[] = [];
  tableData = [];
  dataTableHeader = [];
  table: any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  persons: Person[];
  constructor(private http: HttpClient, private papa: Papa, private readfile: ReadfileService) {
  }
  ngOnInit(): void  {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      serverSide: true,
      processing: true,
      searching: true,
			destroy: true,
			filter: true,
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
                  callback({
                    recordsTotal: this.tableData.length,
                    recordsFiltered: this.tableData.length,
                    data: []
                  });
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
  

  loadDataTable() {
    // $('#example').empty();
    // this.table.clear();
     this.table = $('#example').DataTable({
      searching: true,
			filter: true,
      responsive: true,
      processing: true,
			scrollY: 300,
			scrollCollapse: true,
			scroller: true,
      paging: false,
      ordering: true,
			order: [[ 1, "desc" ]],
      autoWidth: false,
			sDom: 'lfrtip',
      // drawCallback: () => {
      //   $('.paginate_button.next').on('click', () => {
      //       this.nextButtonClickEvent();
      //     });
      // }
    });
    this.table.draw();
  }
 

  ngAfterViewInit(): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      console.info("foobar");
      dtInstance.columns.adjust()
         .responsive.recalc();
    });
  }
}
