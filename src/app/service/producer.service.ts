import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProducerService {    
    constructor(private _http: HttpService) {    
    }
    getProducer(){
        return this._http.get('getListProducer');
    }
    addProducer(data){
        return this._http.post('addProducer',data);
    }
    deleteProducer(data){
        return this._http.delete('deleteProducer',data);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError = (error: any) => {
        return Observable.of(error);
    }
}