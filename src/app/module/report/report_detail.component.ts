import { Component, OnInit,Input } from '@angular/core';
import { Subject }    from 'rxjs';
@Component({
    selector: 'reportDetail',
    templateUrl: 'report_detail.component.html'
})

export class ReportDetailComponent implements OnInit {
    @Input() parentSubject:Subject<any>;
    constructor() { }
    ngOnInit() {
        this.parentSubject.subscribe(event => {
            console.log(event);
        });
     }
}