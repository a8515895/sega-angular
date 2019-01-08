import { Injectable } from '@angular/core';
@Injectable()
export class FunctionService {  
    empty(data){
        if(typeof data == 'object'){
            if(data == null || data == '') return true;
            if(Object.keys(data).length == 0) return true;
        }else{
            if(data == null || data == '') return true;
        }    
        return false;
    }
    number_format( number, decimals?, dec_point?, thousands_sep? ) {                             
        var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
        var d = dec_point == undefined ? "," : dec_point;
        var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
        var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;                                
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - Number(i)).toFixed(c).slice(2) : "");
	}
}