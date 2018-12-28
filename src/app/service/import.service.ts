import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ImportService {    
    constructor(private _http: HttpService) {    
    }
    getImport(){
        return this._http.get('getListAllImport');
    }
    getImportDetail(data){
        return this._http.get('getListImportDetail',data);
    }
    getImportNew(data){
        return this._http.get('getListImport',data);
    }
    addImport(data){
        return this._http.post('addImport',data);
    }
    updateImport(data){
        return this._http.put('updateImport',data);
    }
    deleteImport(data){
        return this._http.delete('deleteImport',data);
    }
}