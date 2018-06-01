import { Component, OnInit,ElementRef,ViewContainerRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProductService } from '../../service/product.service';
import { BillService } from '../../service/bill.service';
import { DashboardService } from '../../service/dashboard.service';
import { Chart } from 'angular-highcharts';
import * as jQuery from 'jquery';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  total_bill : Number;
  constructor(private elementRef: ElementRef,private ds : DashboardService,private cookie : CookieService,private ps : ProductService,private bs : BillService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getDashBoard();
  }
  getDashBoard(){
    this.ds.getDashboard().then(res=>{
      this.total_bill=res.total_bill;
    })
  }
}