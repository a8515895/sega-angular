import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {    
    constructor(private _http: HttpService) {    
    }
    getProduct(){
        return this._http.get('getListProduct');
    }
    addProduct(data){
        return this._http.post('addProduct',data);
    }
    deleteProduct(data){
        return this._http.delete('deleteProduct',data);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError = (error: any) => {
        return Observable.of(error);
    }
}