import { Component, OnInit,Input } from '@angular/core';
import { Subject }    from 'rxjs';
import {FormControl} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { AppDateAdapter, APP_DATE_FORMATS} from '../../date.adapter';
import { ReportService }     from '../../service/report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [
    ReportService,
    {
      provide: DateAdapter, useClass: MomentDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ],
})
export class ReportComponent implements OnInit {
  date = new FormControl(moment([2017, 0, 1]));
  parentSubject:Subject<any> = new Subject();
  constructor() { }
  ngOnInit() {
  }
  dateChange($event){
    this.parentSubject.next($event.targetElement.value);
  }
}
