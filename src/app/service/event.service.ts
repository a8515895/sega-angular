import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EventService {    
    constructor(private _http: HttpService) {    
    }
    getEvent(){
        return this._http.get('getListEvent');
    }
    getDetailEvent(data){
        return this._http.get('getDetailEvent',data);
    }
    addEvent(data){
        return this._http.post('addEvent',data);
    }
    deleteEvent(data){
        return this._http.delete('deleteEvent',data);
    }
    updateEvent(data){
        return this._http.put('updateEvent',data);
    }
}