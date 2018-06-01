import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { VerifyService } from '../../../service/verify.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieBackendService } from 'angular2-cookie/services/cookies.backend.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'Login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model : any = {
        username : '',
        password : ''
    }
    disable = false;
    constructor(vcr: ViewContainerRef,private _sv : VerifyService,private cookieService: CookieService,private route: ActivatedRoute,private router: Router,public toastr: ToastsManager) {
        this.toastr.setRootViewContainerRef(vcr);
     }
    onSubmit(){
        this.disable = true;
        this._sv.login(this.model).then(
            res => {  
                this.disable = false;
                console.log(res);
                if(res.status){
                    this.cookieService.putObject('user',res.user);
                    this.cookieService.put('isLogin',res.access_token);   
                    this.cookieService.put('level',res.level);   
                    return this.router.navigate(['/']);
                }
                this.toastr.error("Đăng nhập thất bại, sai tên đăng nhập","Error!");
            },
            err => {
                console.log(err);
            }
        )
    }
    ngOnInit() {
        if(this.cookieService.get('isLogin')){
            return this.router.navigate(['/login']);
        }
     }
}