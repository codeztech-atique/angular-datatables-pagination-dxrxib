import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
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
  constructor(private http: HttpClient, private papa: Papa) {
  }
  ngOnInit() {
    let table = $('#example').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
            this.nextButtonClickEvent();
          });
      }
    });
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
  ConvertCSVtoJSON() {
    // console.log(JSON.stringify(this.test));
    // let csvData = '"Hello","World!"';
    // this.papa.parse(csvData, {
    //   complete: (results) => {
    //     console.log('Parsed  : ', results.data[0][1]);
    //     // console.log(results.data.length);
    //   }
    // });
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
                console.log(key);
                tableHeader.push(key);
          })
          console.log('Parsed: k', results.data);
          this.dataTableHeader = tableHeader;
          console.log('Table Header', this.dataTableHeader);
          console.log('Order Details', this.tableData);
        }
      });
    }
  }

 


}
