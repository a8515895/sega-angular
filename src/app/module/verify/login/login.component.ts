import { Component, OnInit } from '@angular/core';
import { VerifyService } from '../../../service/verify.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieBackendService } from 'angular2-cookie/services/cookies.backend.service';
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
    constructor(private _sv : VerifyService,private cookieService: CookieService,private route: ActivatedRoute,private router: Router) { }
    onSubmit(){
        this._sv.login(this.model).then(
            res => {  
                console.log(res);
                if(res.status){
                    this.cookieService.putObject('user',res.user);
                    this.cookieService.put('isLogin',res.access_token);   
                    return this.router.navigate(['/']);
                }
                console.log('fail');
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