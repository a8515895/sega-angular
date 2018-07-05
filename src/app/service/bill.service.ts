import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BillService {    
    constructor(private _http: HttpService) {    
    }
    getBill(){
        return this._http.get('getListAllBill');
    }
    getBillDetail(data){
        return this._http.get('getListBillDetail',data);
    }
    getBillNew(data){
        return this._http.get('getListBill',data);
    }
    addBill(data){
        return this._http.post('addBill',data);
    }
    updateBill(data){
        return this._http.put('updateBill',data);
    }
    deleteBill(data){
        return this._http.delete('deleteBill',data);
    }
}