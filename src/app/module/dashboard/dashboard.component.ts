import { Component, OnInit,ElementRef } from '@angular/core';
import * as jQuery from 'jquery';
import "datatables.net";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataTable : any;
  constructor(private elementRef: ElementRef) { 
    //this.dataTable=jQuery(this.elementRef.nativeElement);
    //this.dataTable.dataTable();
  }

  ngOnInit() {
  }

}
