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
  total_bill_today : Number;
  total_impport_today : Number;
  total_bill_month : Number;
  isLoadingChartToday : boolean = true;
  isLoadingChartMonth : boolean = true;
  chartToday : any;  
  chartMonth : any; 
  numBill : number;
  numImport : number;
  constructor(private elementRef: ElementRef,private ds : DashboardService,private cookie : CookieService,private ps : ProductService,private bs : BillService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.getDoanhThuToday();
    this.getDoanhThuMonth();
  }
  timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }
  getDoanhThuToday(){
    this.ds.getDoanhThuToday().then(res=>{
      let total = new Array;
      let categories = new Array;
      this.numImport = res.numImport;
      this.numBill = res.numBill;
      this.total_impport_today = res.import_today;
      
      Object.keys(res.bill).forEach((e)=>{
        categories.push(`${e} giờ`);
        total.push(Number(res.bill[e])-Number(res.import[e]));
      })
      this.total_bill_today = res.doanhthu_today;
      this.total_bill_month = res.doanhthu_month;
      this.chartToday = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: null
        },
        xAxis: {
          categories: categories
        },    
        yAxis: {
          title: null,
        },
        credits: {
          enabled: false
        },
        legend : {
          enabled : false,
        },
        series: [
          {
            name : "Giờ",
            data: total,
          }
        ]
      });
      this.isLoadingChartToday = false;
    })
  }
  getDoanhThuMonth(){
    this.ds.getDoanhThuMonth().then(res=>{
      let total = new Array;
      let categories = new Array;
      Object.keys(res.bill).forEach((e)=>{
        categories.push(`Ngày ${e}`);
        total.push(Number(res.bill[e])-Number(res.import[e]));
      })
      this.chartMonth = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: null
        },
        xAxis: {
          categories: categories
        },    
        yAxis: {
          title: null,
        },
        credits: {
          enabled: false
        },
        legend : {
          enabled : false,
        },
        series: [
          {
            name : "Ngày trong tháng",
            data: total,
          }
        ]
      });
      this.isLoadingChartMonth = false;

    })
  }
}