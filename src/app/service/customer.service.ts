import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomerService {    
    constructor(private _http: HttpService) {    
    }
    getCustomer(){
        return this._http.get('getListCustomer');
    }
    getDetailCustomer(data){
        return this._http.get('getDetailCustomer',data);
    }
    getProvince(){
        return this._http.get('getListProvince');
    }
    getDistrict(data){
        return this._http.get('getListDistrict',data);
    }
    addCustomer(data){
        return this._http.post('addCustomer',data);
    }
    deleteCustomer(data){
        return this._http.delete('deleteCustomer',data);
    }
    updateCustomer(data){
        return this._http.put('updateCustomer',data);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError = (error: any) => {
        return Observable.of(error);
    }
}