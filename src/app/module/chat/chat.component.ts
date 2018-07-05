import { Component, OnInit,ElementRef,ViewContainerRef,ViewChild,Renderer2 } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProductService } from '../../service/product.service';
import { BillService } from '../../service/bill.service';
import { Socket } from 'ng-socket-io';
import * as jQuery from 'jquery';
import BASE_URL from '../../global';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  avartar : string = this.cookie.getObject('user')['original']['avartar'];
  @ViewChild('listCustomer') ul:ElementRef;
  @ViewChild('displayMess') div:ElementRef;
  product : any = new Array();
  BASE_URL = BASE_URL;
  constructor(private socket: Socket,private renderer: Renderer2,private elementRef: ElementRef,private cookie : CookieService,private ps : ProductService,private bs : BillService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    console.log(this.cookie.getObject('user')['original']);
    

  }
  ngOnInit() {  
    this.NODE_customer_send_message();
    this.NODE_agent_send_message();
    this.NODE_customer_leave();
    this.NODE_is_seen();
    this.socket.emit("list_room",{email : this.cookie.getObject('user')['original']['email']});
    this.socket.on("list_room",(data)=>{
      data.forEach((e)=>{
        let li2 = document.createElement("li");
        li2.className = 'list-user';
        li2.setAttribute('room',e.name);
        li2.innerHTML = `
          <div class="media">
            <div class="media-left" style="position : relative">
              <a href="javascript:void(0)">
                <img class="media-object" src="${this.BASE_URL}/public/img/avartar/no-avartar.png" alt="...">
              </a>
              <span class="number-chat-not-seen"></span>
            </div>
            <div class="media-body">
              <h4 class="media-heading">Khách Lạ</h4>
              <p class="last-chat"></p>
            </div>
          </div>
        `;
        li2.onclick = this.chooseUser;
        this.renderer.appendChild(this.ul.nativeElement,li2);  
        this.renderer.listen(li2,"click",()=>{
          this.socket.emit("is_seen",{status : true,room : e.name,email : this.cookie.getObject('user')['original']['email']});
        });
        let li3 = document.createElement("div");
        li3.className = 'closeUser';
        li3.innerHTML = `<i class="fa fa-times"></i>`;
        li3.setAttribute('room',e.name);
        li3.onclick = this.deleteRoom;
        this.renderer.appendChild(li2,li3);
        this.div.nativeElement.insertAdjacentHTML('beforeend',`<div style="display : none" class="contentChat w100 h100" room="${e.name}"></div>`);
        let divMess = '';
        e.message.forEach((e)=>{
          if(e.target == 'customer'){
            divMess += `
            <div class="row" style="margin : 10px 0;">
              <div class="col-md-12">
                <div class="media mess-receive">
                  <div class="media-left">
                    <a href="javascript:void(0)">
                      <img class="media-object img-circle" src="${this.BASE_URL}/public/img/avartar/no-avartar.png" alt="...">
                    </a>
                  </div>
                  <div class="media-body chat-body">
                    <h4 class="media-heading">Guest</h4>
                    <p>${e.message}</p>
                  </div>
                </div>
              </div>
            </div>
            `;
          }else{
            divMess += `
            <div class="row" style="margin : 10px 0;">
              <div class="col-md-12">
                <div class="media mess-reply">
                  <div class="media-left pull-right">
                    <a href="javascript:void(0)">
                      <img class="media-object img-circle" src="${BASE_URL}/public/img/avartar/${this.avartar}" alt="...">
                    </a>
                  </div>
                  <div class="media-body chat-body">
                    <h4 class="media-heading">${this.cookie.getObject('user')['original']['name']}</h4>
                    <p>${e.message}</p>
                  </div>
                </div>
              </div>
            </div>
            `;
          }
        })
        $(`.contentChat[room='${e.name}']`).html(divMess);
        let li=this.ul.nativeElement.children;
        let contentChat=this.div.nativeElement.children;
        if(li.length == 1){
          li[0].classList.add('activeChat');
          contentChat[0].classList.add('activeChat');
        }
      })
    });
  }
  NODE_customer_send_message(){
    this.socket.on("customer_send_message",(data)=>{
      if(data.first == true){
        if(jQuery(`.list-user[room='${data.room}']`).length){
          jQuery(`.list-user[room='${data.room}']`).removeClass("disable-user");
          jQuery(`.contentChat[room='${data.room}']`).removeClass("disable-user");
          return;
        }
        let li2 = document.createElement("li");
        li2.className = 'list-user';
        li2.setAttribute('room',data.room);
        li2.innerHTML = `
          <div class="media">
            <div class="media-left" style="position : relative">
              <a href="javascript:void(0)">
                <img class="media-object" src="${this.BASE_URL}/public/img/avartar/no-avartar.png" alt="...">
              </a>
              <span class="number-chat-not-seen" ></span>
            </div>
            <div class="media-body">
              <h4 class="media-heading">Khách Lạ</h4>
              <p class="last-chat"></p>
            </div>
          </div>
        `;
        li2.onclick = this.chooseUser;
        this.renderer.appendChild(this.ul.nativeElement,li2);  
        this.renderer.listen(li2,"click",()=>{
          this.socket.emit("is_seen",{status : true,room : data.room,email : this.cookie.getObject('user')['original']['email']});
        });
        let li3 = document.createElement("div");
        li3.className = 'closeUser';
        li3.innerHTML = `<i class="fa fa-times"></i>`;
        li3.setAttribute('room',data.room);
        li3.onclick = this.deleteRoom;
        this.renderer.appendChild(li2,li3);

        this.div.nativeElement.insertAdjacentHTML('beforeend',`<div style="display : none" class="contentChat w100 h100" room="${data.room}"></div>`);
        let li=this.ul.nativeElement.children;
        let contentChat=this.div.nativeElement.children;
        if(li.length == 1){
          li[0].classList.add('activeChat');
          contentChat[0].classList.add('activeChat');
        }
      }else{
        jQuery(`.list-user[room='${data.room}'] .last-chat`).html(data.data);
        if(!jQuery(`.list-user[room='${data.room}']`).hasClass('activeChat')){
          this.socket.emit("is_seen",{status : false,room : data.room,email : this.cookie.getObject('user')['original']['email']});
        }
        let contentChat=this.div.nativeElement.children;
        Object.keys(contentChat).forEach(e => {
          if(contentChat[e].attributes.room.value == data.room){
            contentChat[e].insertAdjacentHTML('beforeend',`
              <div class="row" style="margin : 10px 0;">
                <div class="col-md-12">
                  <div class="media mess-receive">
                    <div class="media-left">
                      <a href="javascript:void(0)">
                        <img class="media-object img-circle" src="${this.BASE_URL}/public/img/avartar/no-avartar.png" alt="...">
                      </a>
                    </div>
                    <div class="media-body chat-body">
                      <h4 class="media-heading">Guest</h4>
                      <p>${data.data}</p>
                    </div>
                  </div>
                </div>
              </div>
            `);
            return;
          }
        })
      }
    });
  }
  NODE_agent_send_message(){
    this.socket.on("agent_send_message",(data)=>{
      let contentChat=this.div.nativeElement.children;
      Object.keys(contentChat).forEach(e => {
        if(contentChat[e].classList.contains('activeChat')){
          contentChat[e].insertAdjacentHTML('beforeend',
            `
              <div class="row" style="margin : 10px 0;">
                <div class="col-md-12">
                  <div class="media mess-reply">
                    <div class="media-left pull-right">
                      <a href="javascript:void(0)">
                        <img class="media-object img-circle" src="${BASE_URL}/public/img/avartar/${this.avartar}" alt="...">
                      </a>
                    </div>
                    <div class="media-body chat-body">
                      <h4 class="media-heading">${this.cookie.getObject('user')['original']['name']}</h4>
                      <p>${data.data}</p>
                    </div>
                  </div>
                </div>
              </div>
            `
          );
          return;
        }
      });
      this.div
    })
  }
  NODE_customer_leave(){
    this.socket.on('customer_leave',function(data){
      jQuery(`.contentChat[room='${data.room}']`).addClass('disable-user'); 
      jQuery(`.list-user[room='${data.room}']`).addClass('disable-user');
      console.log("Socket list room",data.test); 
      console.log("Socket Socket",data.test2);
    })
  }
  NODE_is_seen(){
    this.socket.on('is_seen',function(data){
      if(data.room != 'total'){
        if(data.not_seen > 0){
          jQuery(`.list-user[room='${data.room}'] .number-chat-not-seen`).addClass('not-seen').html(data.not_seen);
        }else{
          jQuery(`.list-user[room='${data.room}'] .number-chat-not-seen`).removeClass('not-seen').html(data.not_seen);
        }
      }
    })
  }
  deleteRoom(event){
    let room = event.currentTarget.attributes.room.value;
    jQuery(`.contentChat[room='${room}']`).remove(); 
    jQuery(`.list-user[room='${room}']`).remove(); 
  }
  sendMessage(message,room){
    this.socket.emit("agent_send_message",{room:room,data:message,agent : {avartar : this.cookie.getObject('user')['original']['avartar'],name : this.cookie.getObject('user')['original']['name']}});
  }
  chooseUser(event){
    if(!event.currentTarget.classList.contains('activeChat')){
      jQuery('.list-user').removeClass('activeChat');  
      jQuery('.contentChat').removeClass('activeChat');  
      let room = event.currentTarget.attributes.room.value;
      jQuery(`.contentChat[room='${room}']`).addClass('activeChat'); 
      jQuery(`.list-user[room='${room}']`).addClass('activeChat'); 
      
    }
  }
  enterInput(event){
    if(event.keyCode == 13){
      let li=this.ul.nativeElement.children;
      Object.keys(li).forEach(e => {
        if(li[e].classList.contains('activeChat')){
          let val = event.target.value;
          this.sendMessage(val,li[e].attributes.room.value);
          return;
        }
      });
      event.preventDefault();
      event.target.value='';
      return false;
    }
  }
}
