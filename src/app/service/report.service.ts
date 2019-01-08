import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service';

@Injectable()
export class ReportService {    
    constructor(private _http: HttpService) {    
    }
    getDoanhThu(data){
        return this._http.get('report/getDoanhThu',data);
    }
    getBill(data){
        return this._http.get('report/getBill',data);
    }
    getImport(data){
        return this._http.get('report/getImport',data);
    }
    getProduct(data){
        return this._http.get('report/getProduct',data);
    }
}