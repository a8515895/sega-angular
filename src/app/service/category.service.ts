import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService {    
    constructor(private _http: HttpService) {    
    }
    getCategory(){
        return this._http.get('getListCategory');
    }
    addCategory(data){
        return this._http.post('addCategory',data);
    }
    deleteCategory(data){
        return this._http.delete('deleteCategory',data);
    }
    updateCategory(data){
        return this._http.put('updateCategory',data);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError = (error: any) => {
        return Observable.of(error);
    }
}