import { Component, OnInit,ViewChild,ViewContainerRef,ElementRef} from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {SelectionModel} from '@angular/cdk/collections';
import { ProductService } from '../../service/product.service';
import { BillService } from '../../service/bill.service';
import {FormControl} from "@angular/forms";
import BASE_URL from '../../global';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
})
export class BillAddComponent implements OnInit {
  product = new Array();
  currentBill = new Array();
  newBill = new Array();
  tmpNewBill= new Array();
  billDetail = new Array();
  listBill = new Array();
  base_url : any = BASE_URL;
  stateCtrl: FormControl;
  agent : String = this.cookieService.getObject('user')['original']['id'];
  filteredStates: Observable<any[]>;
  selection = new SelectionModel<Element>(true, []);
  constructor(private ps : ProductService,private bs : BillService,private el: ElementRef,private cookieService: CookieService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.getListProduct();
    this.getListBill();
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => state ? this.filterStates(state) : this.product.slice())
    );
  }
  filterStates(name: string) {
    return this.product.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  getListProduct(){
    this.ps.getProduct().then(
        res => {
          this.product=res;
        },
        err => {
            console.log(err);
        }
    )
  }
  getListBill(){
    this.bs.getBillNew({status : 'new'}).then(
      res => {        
        this.newBill=res;
        this.tmpNewBill=res;
      },
      err => {
          console.log(err);
      }
    )
  }
  getListBillDetail(id){
    this.billDetail = new Array();
    this.bs.getBillDetail({id : id}).then(
      res => {                
        this.billDetail=res;
      },
      err => {
          console.log(err);
      }
    )
  }
  searchProduct($event){
    if($event.keyCode=="13"){
      let id =$event.target.value;
      let condition = "name";
      if(id.length == 1 && Number.isInteger(Number(id))) condition = "id";
      let check = false;
      let check2 = true;
      this.product.forEach(e=>{
        if(e[condition] == id){
          this.currentBill.forEach(e2=>{
            if(e2[condition]==id) {
              check2=false;
              return;
            }
          })
          check= true;
          if(check2&&check) this.currentBill.push({id :e.id,name: e.name,price: e.price,img : e.img,qty : 1})
          return;
        }
      })
      if(!check)  this.toastr.error("Sản phẩm này ko tồn tại",'Error!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      if(!check2)  this.toastr.error("Sản phẩm này đã đc thêm",'Error!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      if(check && check2) this.toastr.success("Thêm sản phẩm thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      $event.target.value = "";
    }
  }
  refreshBill(){
    this.currentBill = new Array();
  }
  changeQTYBill($event,bill){
    if(Number.isInteger(Number($event.target.value))){
      bill.qty=$event.target.value;
    }
  }
  removeBill(bill){
    this.currentBill.forEach((e,key)=>{
      if(bill.id==e.id){
        this.currentBill.splice(key,1);
        this.toastr.success("Xóa sản phẩm thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
        return;
      }
    })
  }
  confirmBill(){
    if(this.currentBill.length != 0){
      $("#myModal2").modal("show");
    }else{
      this.toastr.warning("Không có sản phẩm nào");
    }
  }
  successBill(){
    let data = {
      detail : this.currentBill,
      createBy : this.cookieService.getObject('user')['original']['id'],
      total : 0,
    }
    this.currentBill.forEach(e=>{
      data.total+=Number(e.price);
    })
    this.bs.addBill(data).then(res=>{
      if(res.err==0){
        this.currentBill=new Array();
        this.getListBill();
        this.toastr.success("Thêm hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      }else{
        this.toastr.error(res.err,'Error!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      }
    })
  }
  paymentSuccess(bill){
    let data = {
      id : bill,
      status : 'solved',
      payment : 1
    };
    this.bs.updateBill(data).then(res=>{
      this.toastr.success("Thanh toán thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      this.getListBill();
    })
  }
  paymentDebt(bill,name){
    if(name == null || name == ''){
      return this.toastr.error('Phải nhập tên người nợ','Error!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
    }
    let data = {
      id : bill,
      status : 'solved',
      debt_name: name,

    };
    this.bs.updateBill(data).then(res=>{
      this.toastr.warning("Ghi nợ thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      this.getListBill();
    })
  }
  paymentDestroy(bill){
    let data = {
      id : bill,
      status : 'delete',
    };
    this.bs.updateBill(data).then(res=>{
      this.toastr.warning("Hủy hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      this.getListBill();
    })
  }
  updateStatusPayment(id,payment){
    if(payment == 1) payment = 0;
    else payment = 1
    this.bs.updateBill({payment : payment,id : id,update_by : this.agent}).then(
      res=>{
        this.toastr.success("Cập nhật hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      }
    )
  }
  changeSelectStatus(value){
    this.bs.updateBill({status : value.status,id : value.id,update_by : this.agent}).then(
      res =>{
        this.toastr.success("Cập nhật hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      } 
    )
  }
}
