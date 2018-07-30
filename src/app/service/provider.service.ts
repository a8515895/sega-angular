import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProviderService {    
    constructor(private _http: HttpService) {    
    }
    getProvider(){
        return this._http.get('getListProvider');
    }
    getDetailProvider(data){
        return this._http.get('getDetailProvider',data);
    }
    getProvince(){
        return this._http.get('getListProvince');
    }
    getDistrict(data){
        return this._http.get('getListDistrict',data);
    }
    addProvider(data){
        return this._http.post('addProvider',data);
    }
    deleteProvider(data){
        return this._http.delete('deleteProvider',data);
    }
    updateProvider(data){
        return this._http.put('updateProvider',data);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError = (error: any) => {
        return Observable.of(error);
    }
}