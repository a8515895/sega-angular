import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Subject }    from 'rxjs';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS} from '../../date.adapter';
import { ReportService }     from '../../service/report.service';
import { DatetimeService }     from '../../service/datetime.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [
    ReportService,
    DatetimeService,
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ],
})
export class ReportComponent implements OnInit {
  date : any;
  href : any = "product";
  time : any = this.dt.getTime()+"_"+this.dt.getTime();
  @ViewChild("input1") input1 : ElementRef;
  @ViewChild("input2") input2 : ElementRef;
  parentSubject:Subject<any> = new Subject();
  constructor(private rs : ReportService,private dt : DatetimeService) { }
  ngOnInit() {
    this.input1.nativeElement.value = this.dt.getTime();
    this.input2.nativeElement.value = this.dt.getTime();
    setTimeout(()=>{
      this.getReport(this.href,this.time);
    },3000)
    
  }
  dateChange($event){
    this.time = this.input1.nativeElement.value+"_"+this.input2.nativeElement.value
    this.getReport(this.href,this.time);
  }
  getTime(time,$event){
    $(".btn-choose-date").removeClass("active");
    $($event.toElement).addClass("active");
    switch(time){
      case "today" :
        this.input1.nativeElement.value = this.dt.getTime();
        this.input2.nativeElement.value = this.dt.getTime();
      break;
      case "yesterday" :
        this.input1.nativeElement.value = this.dt.getTime("yesterday");
        this.input2.nativeElement.value = this.dt.getTime("yesterday");
      break;
      case "week" :
        this.input1.nativeElement.value = this.dt.getTime("first_week");
        this.input2.nativeElement.value = this.dt.getTime("last_week");
      break;
      case "previous_week" :
        this.input1.nativeElement.value = this.dt.getTime("first_previous_week");
        this.input2.nativeElement.value = this.dt.getTime("last_previous_week");
      break;
      case "month" :
        this.input1.nativeElement.value = this.dt.getTime("first_month");
        this.input2.nativeElement.value = this.dt.getTime("last_month");
      break;
      case "previous_month" :
        this.input1.nativeElement.value = this.dt.getTime("first_previous_month");
        this.input2.nativeElement.value = this.dt.getTime("last_previous_month");
      break;
      case "year" :
        this.input1.nativeElement.value = this.dt.getTime("first_year");
        this.input2.nativeElement.value = this.dt.getTime("last_year");
      break;
      case "previous_year" :
        this.input1.nativeElement.value = this.dt.getTime("first_previous_year");
        this.input2.nativeElement.value = this.dt.getTime("last_previous_year");
      break;
    }
    this.time = this.input1.nativeElement.value+"_"+this.input2.nativeElement.value
    this.getReport(this.href,this.time);
  }
  getHref(href,$event){
    this.href = href;
    $(".bill-tab").removeClass("active");
    $($event.toElement).addClass("active");
    this.parentSubject.next({href : this.href,time : this.time});
  }
  getReport(href,time){
    this.parentSubject.next({href : href,time : time});
  }
}
