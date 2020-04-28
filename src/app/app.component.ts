import { Component } from '@angular/core';
declare let $: any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  constructor(private http: HttpClient) {
    // this.parseCSV();
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
    //do next particular records like  101 - 200 rows.
    //we are calling to api

    console.log('next clicked')
  }
  previousButtonClickEvent(): void {
    //do previous particular the records like  0 - 100 rows.
    //we are calling to API
  }
  // parseCSV() {
  //   this.http.get('./src/app/data/tabledata.csv', {responseType: 'json'})
  //   .subscribe(
  //       data => {
  //           console.log(data);
  //       },
  //       error => {
  //           console.log(error);
  //       }
  //   );
  // }


}
