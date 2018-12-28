import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  daterangepickerOptions = {
    format: 'DD/MM/YYYY',
    showRanges : false,
    ranges: {
			'Hôm nay': [moment(), moment()],
			'Hôm qua': [moment().subtract(1,"days"), moment().subtract(1,"days")],
			'Tuần này': [moment().isoWeekday(1), moment().isoWeekday(7)],
			'Tuần trước': [moment().weekday(-6), moment().weekday(0)],
			'Tháng này': [moment().startOf('month'), moment().endOf('month')],
			'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Năm này': [moment().startOf('year'), moment().endOf('year')],
			'Năm trước': [moment().subtract(1,"year").startOf('year'), moment().subtract(1, 'year').endOf('year')]
    },
  }
  date = new FormControl(new Date());
  constructor() { }
  ngOnInit() {
    console.log(moment());
  }
  dateChange($event){
    console.log($event.value.getDate());
    console.log($event.value.getMonth());
    console.log($event.value.getYear());
    console.log($event);
  }
  // dateChange(){
  //   console.log(moment())
  // }
}
