import { Injectable } from '@angular/core';
import * as moment from "moment"
@Injectable()
export class DatetimeService { 
    getTime(date?){
        let d,m,y;
        switch(date){
            case "today" :
                d = moment().get('date').toString().length == 1 ? "0"+moment().get('date') : moment().get('date');
                m =  (moment().get('month')+1).toString().length == 1 ? "0"+(moment().get('month')+1) : moment().get('month')+1;
                y = moment().get('year');
            break;
            case "yesterday" :
                d = moment().subtract(1,"days").get('date').toString().length == 1 ? "0"+moment().subtract(1,"days").get('date') : moment().get('date');
                m =  (moment().subtract(1,"days").get('month')+1).toString().length == 1 ? "0"+(moment().subtract(1,"days").get('month')+1) : moment().subtract(1,"days").get('month')+1;
                y = moment().subtract(1,"days").get('year');
            break;
            case "first_month" :
                d = "01";
                m =  (moment().get('month')+1).toString().length == 1 ? "0"+(moment().get('month')+1) : moment().get('month')+1;
                y = moment().get('year');
            break;
            case "last_month" :
                d = moment().endOf('month').get('date');
                m =  (moment().get('month')+1).toString().length == 1 ? "0"+(moment().get('month')+1) : moment().get('month')+1;
                y = moment().get('year');
            break;
            case "first_previous_month" :
                d = "01";
                m =  (moment().subtract(1, 'month').get('month')+1).toString().length == 1 ? "0"+(moment().subtract(1, 'month').get('month')+1) : moment().subtract(1, 'month').get('month')+1;
                y = moment().subtract(1, 'month').get('year');
            break;
            case "last_previous_month" :
                d = moment().subtract(1, 'month').endOf('month').get('date');
                m =  (moment().subtract(1, 'month').get('month')+1).toString().length == 1 ? "0"+(moment().subtract(1, 'month').get('month')+1) : moment().subtract(1, 'month').get('month')+1;
                y = moment().subtract(1, 'month').get('year');
            break;
            case "first_week" :
                d = moment().isoWeekday(1).get('date').toString().length == 1 ? "0"+moment().isoWeekday(1).get('date') : moment().isoWeekday(1).get('date');
                m = (moment().isoWeekday(1).get('month')+1).toString().length == 1 ? "0"+(moment().isoWeekday(1).get('month')+1) : (moment().isoWeekday(1).get('month')+1);
                y = moment().isoWeekday(1).get('year');
            break;
            case "last_week" :
                d = moment().isoWeekday(7).get('date').toString().length == 1 ? "0"+moment().isoWeekday(7).get('date') : moment().isoWeekday(7).get('date');
                m = (moment().isoWeekday(7).get('month')+1).toString().length == 1 ? "0"+(moment().isoWeekday(7).get('month')+1) : (moment().isoWeekday(7).get('month')+1);
                y = moment().isoWeekday(7).get('year');
            break;
            case "first_previous_week" :
                d = moment().isoWeekday(-6).get('date').toString().length == 1 ? "0"+moment().isoWeekday(-6).get('date') : moment().isoWeekday(-6).get('date');
                m = (moment().isoWeekday(-6).get('month')+1).toString().length == 1 ? "0"+(moment().isoWeekday(-6).get('month')+1) : (moment().isoWeekday(-6).get('month')+1);
                y = moment().isoWeekday(-6).get('year');
            break;
            case "last_previous_week" :
                d = moment().isoWeekday(0).get('date').toString().length == 1 ? "0"+moment().isoWeekday(0).get('date') : moment().isoWeekday(0).get('date');
                m = (moment().isoWeekday(0).get('month')+1).toString().length == 1 ? "0"+(moment().isoWeekday(0).get('month')+1) : (moment().isoWeekday(0).get('month')+1);
                y = moment().isoWeekday(0).get('year');
            break;
            case "first_year" :
                d = "01";
                m = "01";
                y = moment().get('year');
            break;
            case "last_year" :
                d = "31";
                m = "12";
                y = moment().get('year');
            break;
            case "first_previous_year" :
                d = "01";
                m = "01";
                y = moment().subtract(1,'year').get('year');
            break;
            case "last_previous_year" :
                d = "31";
                m = "12";
                y = moment().subtract(1,'year').get('year');
            break;
            default:
                d = moment().get('date').toString().length == 1 ? "0"+moment().get('date') : moment().get('date');
                m =  moment().get('month').toString().length == 1 ? "0"+(moment().get('month')+1) : moment().get('month')+1;
                y = moment().get('year');
            break;
        }
        return d+"/"+m+"/"+y;
    }
}