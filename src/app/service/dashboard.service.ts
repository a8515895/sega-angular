import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service';
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