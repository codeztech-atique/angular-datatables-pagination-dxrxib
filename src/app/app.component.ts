import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
declare let $: any;
// import * as data from './../app/tabledata';
// import { FACTURES } from './../app/tabledata.csv';
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
  constructor(private http: HttpClient, private papa: Papa) {
  }
  ngOnInit() {
    // this.loadDataTable();
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
  previousButtonClickEvent(): void {
    //do previous particular the records like  0 - 100 rows.
    //we are calling to API
  }
  
  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    let orderDetails = {};
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
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
          console.log('Order Details', this.tableData);
        }
      });
      console.log(this.dataTableHeader);
      this.loadDataTable();
      // this.table.clear();
      // this.table.rows.add(this.tableData);
      // this.table.draw();
    }
  }
  loadDataTable() {
    // $('#example').empty();
    this.table.clear();
     this.table = $('#example').DataTable({
      deferRender: true,
			searching: true,
			destroy: true,
			filter: true,
			scrollY: 300,
			scrollCollapse: true,
			scroller: true,
      paging: true,
      lengthChange: false,
			ordering: true,
			order: [[ 1, "desc" ]],
      info: true,
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
 


}
