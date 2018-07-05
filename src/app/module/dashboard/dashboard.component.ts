import { Component, OnInit,ElementRef,ViewContainerRef,EventEmitter } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProductService } from '../../service/product.service';
import { BillService } from '../../service/bill.service';
import { DashboardService } from '../../service/dashboard.service';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  total_bill : Number;
  chart : any;  
  constructor(private elementRef: ElementRef,private ds : DashboardService,private cookie : CookieService,private ps : ProductService,private bs : BillService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getDoanhThu();
    this.createChart();
  }
 
  timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  getDoanhThu(){
    this.ds.getDoanhThu().then(res=>{
      let total = new Array;
      Object.keys(res.bill).forEach((e)=>{
        total.push(Number(res.bill[e])-Number(res.import[e]));
      })
      this.chart = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: null
        },
        xAxis: {
          categories: Object.keys(res.bill)
        },    
        yAxis: {
          title: null,
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name : "Ngày trong tháng",
            data: total,
          }
        ]
      });
    })
  }
  createChart(){

  }
}