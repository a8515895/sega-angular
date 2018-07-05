import { Component, OnInit,Renderer2,ElementRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Socket } from 'ng-socket-io';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as jQuery from 'jquery';
import BASE_URL from '../global';
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
  isShowBill : boolean = false;
  BASE_URL = BASE_URL;
  name : String;
  avartar : String = this.BASE_URL+'/public/img/avartar/'+this.cookie.getObject('user')['original']['avartar'];
  privilege = {
    admin : true,
    bill : true,
    category : true,
    product : true,
    producer : true,
    dashboard : true,
    import : true,
    report : true,
    chat : true,
    event : true,
  }
  constructor(private cookie : CookieService,private socket: Socket,private router: Router) { }
  ngOnInit() {
    this.NODE_init();
    this.NODE_rejoin();
    this.name=this.cookie.getObject('user')['original']['name'];
    let audio = new Audio("../../assets/mess.mp3");
    this.socket.on("customer_send_message",()=>{
      audio.play();
    });
    this.socket.on("has_login",()=>{
      return this.router.navigate(['/logout']);
    });
    setInterval(()=>{this.NODE_is_seen()},5000)
    this.socket.on("is_seen",function(data){
      if(data.room == 'total'){
        if(data.not_seen != 0)$("#total-not-seen").addClass("not-seen").html(data.not_seen)
        else $("#total-not-seen").removeClass("not-seen").html(data.not_seen)
      }
    })
    if(Number(this.cookie.get('level')) != 0){
      this.privilege.admin=false;
      this.privilege.category=false;
      this.privilege.product=false;
      this.privilege.producer=false;
      this.privilege.dashboard=false;
      this.privilege.import=false;
      this.privilege.report=false;
    }
  }
  NODE_init(){  
    this.socket.emit("init",{avartar : this.cookie.getObject('user')['original']['avartar'],name : this.cookie.getObject('user')['original']['name'],email : this.cookie.getObject('user')['original']['email'],level : 'admin'});
  }
  NODE_rejoin(){
    this.socket.emit("rejoin",{email : this.cookie.getObject('user')['original']['email']});
  }
  NODE_is_seen(){
    this.socket.emit("is_seen",{total : true})
  }

  onHideDropdown(){
    this.isShowDropdown = false;    
  }
  onShowDropdown($event: Event){
    $event.preventDefault();
    $event.stopPropagation();
    this.isShowDropdown = true;
  }
  mouseEnterBill(){
    this.isShowBill = true;
  }
  mouseLeaveBill(){
    this.isShowBill = false;
  }
}
