import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class Auth implements CanActivate {
    constructor(private cookie : CookieService,private router : Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
        return this.checkLogin();
    }
    checkLogin() : boolean{
        if(this.cookie.get('isLogin') == null){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}