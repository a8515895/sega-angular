import { Injectable } from '@angular/core';
@Injectable()
export class FunctionService {  
    empty(data){
        if(typeof data == 'object'){
            if(Object.keys(data).length == 0) return true;
        }else{
            if(data == null || data == '') return true;
        }    
        return false;
    }
}