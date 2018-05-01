import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
@Component({
  selector: 'app-layout',
  host: {
      '(document:click)': 'onHideDropdown()',
  },
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isShowDropdown : boolean = false;
  name : String;
  privilege = {
    admin : true,
    bill : true,
    category : true,
    product : true,
    dashboard : true,
  }
  constructor(private cookieService : CookieService) { }
  ngOnInit() {
    this.name=this.cookieService.getObject('user')['original']['name'];
    if(Number(this.cookieService.get('level')) != 0){
      this.privilege.admin=false;
      this.privilege.category=false;
      this.privilege.product=false;
      this.privilege.dashboard=false;
    }
  }
  onHideDropdown(){
    this.isShowDropdown = false;    
  }
  onShowDropdown($event: Event){
    $event.preventDefault();
    $event.stopPropagation();
    this.isShowDropdown = true;
  }

}
