import { Component, OnInit } from '@angular/core';
import { VerifyService } from '../../../service/verify.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieBackendService } from 'angular2-cookie/services/cookies.backend.service';
@Component({
    selector: 'Logout',
    template: '',
})

export class LogoutComponent implements OnInit {
    constructor(private _sv : VerifyService,private cookieService: CookieService,private router: Router) { }
    onLogout(){
        this._sv.logout().then(
            res => {
                this.cookieService.removeAll();
                return this.router.navigate(['/login']);
            },
            err => {
                console.log('Lỗi');
            }
        )
    }
    ngOnInit() { 
        this.onLogout();
    }
}