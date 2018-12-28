import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DashboardService {    
    constructor(private _http: HttpService) {    
    }
    getDoanhThuMonth(){
        return this._http.get('getDoanhThuMonth');
    }
    getDoanhThuToday(){
        return this._http.get('getDoanhThuToday');
    }
}