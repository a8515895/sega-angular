import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Injectable()
export class ifLogin implements CanActivate {
    constructor(private cookie : CookieService,private router : Router,private _location: Location) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
        return this.checkLogin();
    }
    checkLogin() : boolean{
        if(this.cookie.get('isLogin') != null){
            this._location.back();
            return false;
        }
        return true;
    }
}