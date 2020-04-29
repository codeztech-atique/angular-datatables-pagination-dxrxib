import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { ReadfileService } from './readfile.service';
declare let $: any;

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
  constructor(private http: HttpClient, private papa: Papa, private readfile: ReadfileService) {
  }
  ngOnInit() {
    this.loadDataTable();
    this.readfile.getData()
      .subscribe(data => {
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
          console.log('Order Details', this.tableData);
        }
      });
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
  
  handleFileSelect(evt) {
    
    var reader = new FileReader();
    // reader.readAsText(file);
    // let orderDetails = {};
    // reader.onload = (event: any) => {
    //   var csv = event.target.result; // Content of CSV file
      
    //   console.log(this.dataTableHeader);
      
    //   // this.table.clear();
    //   // this.table.rows.add(this.tableData);
    //   // this.table.draw();
    // }
    this.loadDataTable();
  }
  loadDataTable() {
    // $('#example').empty();
    // this.table.clear();
     this.table = $('#example').DataTable({
      searching: true,
			filter: true,
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
 


}
