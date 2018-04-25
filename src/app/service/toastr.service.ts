import { Injectable,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Injectable()
export class ToastrService  {   
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef){
        this.toastr.setRootViewContainerRef(vcr);
    }
    show(msg,title,type="success"){
        this.toastr[type]('You are awesome!', 'Success!', {positionClass : 'toast-bottom-right',animate : 'flyRight'});
    }
}