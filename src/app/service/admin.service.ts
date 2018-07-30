import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminService {    
    constructor(private _http: HttpService) {    
    }
    getAdmin(){
        return this._http.get('getListAdmin');
    }
    getDetailAdmin(data){
        return this._http.get('getDetailAdmin',data);
    }
    getProvince(){
        return this._http.get('getListProvince');
    }
    getDistrict(data){
        return this._http.get('getListDistrict',data);
    }
    addAdmin(data){
        return this._http.post('addAdmin',data);
    }
    deleteAdmin(data){
        return this._http.delete('deleteAdmin',data);
    }
    updateAdmin(data){
        return this._http.put('updateAdmin',data);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError = (error: any) => {
        return Observable.of(error);
    }
}