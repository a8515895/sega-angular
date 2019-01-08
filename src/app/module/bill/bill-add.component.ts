import { Component, OnInit,ViewChild,ViewContainerRef,ElementRef} from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {SelectionModel} from '@angular/cdk/collections';
import { FunctionService } from '../../service/function.service';
import { ProductService } from '../../service/product.service';
import { CustomerService } from '../../service/customer.service';
import { AdminService } from '../../service/admin.service';
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
  test = 4;
  kh = {
    id : '',
    name : '',
    phone : '',
    type : 'home',
    address : '',
    email : '',
    priority : 4+'',
    province : '79',
    assign : this.cookieService.getObject('user')['id'] + '',
  }
  isLoadingProduct : boolean = true;
  isLoadingKH  : boolean = false;
  isLoadingBill : boolean = true;
  isLoadingAddProcess : boolean = false;
  selectKH = 0;
  totalPrice = 0;
  province = new Array();
  district = new Array();
  product = new Array();
  customer = new Array();
  admin = new Array();
  currentBill = new Array();
  newBill = new Array();
  tmpNewBill= new Array();
  billDetail = new Array();
  listBill = new Array();
  addType = 0;
  base_url : any = BASE_URL;
  agent : String = this.cookieService.getObject('user')['id'];
  level : String = this.cookieService.getObject('user')['level'];
  selection = new SelectionModel<Element>(true, []);
  constructor(private fs : FunctionService,private ps : ProductService,private ads : AdminService,private cs : CustomerService,private bs : BillService,private el: ElementRef,private cookieService: CookieService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    $(".selectTest").select2({width :  "100%"});
    $(".selectTest2").select2({width :  "100%"});
    $("#myModal2").removeAttr("tabindex");
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => state ? this.filterStates(state) : this.product.slice())
    );
    return Promise.all([
      this.getListProduct(),
      this.getListBill(),
      this.getListCustomer(),
      this.getListAdmin(),
      this.getListProvince(),
    ]);

  }
  // AUTOCOMPLETE PRODUCT
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  searchProduct($event){
    if($event.keyCode=="13"){
      let id =$event.target.value;
      let condition = "name";
      if(Number.isInteger(Number(id))) condition = "id";
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
  clickAddProduct(pro){
    let check = false;
    let check2 = true;
    let id = pro.id;
    this.product.forEach(e=>{
      if(e['id'] == id){
        this.currentBill.forEach(e2=>{
          if(e2['id']==id) {
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
  }  
  filterStates(name: string) {
    return this.product.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  getListProduct(){
    this.ps.getProduct().then(
        res => {
          this.product=res;
          this.isLoadingProduct = false;
        },
        err => {
        }
    )
  }
  getListBill(){
    this.bs.getBillNew({status : 'new'}).then(
      res => {        
        this.newBill=res;
        this.tmpNewBill=res;
        this.isLoadingBill = false;
      },
      err => {
      }
    )
  }
  getListCustomer(){
    this.cs.getCustomer().then(
      res=>{
        this.customer = res;
      }
    )
  }
  getListAdmin(){
    this.ads.getAdmin().then(
      res=>{
        this.admin = res;
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
      }
    )
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
      this.totalPrice=0;
      if(this.currentBill.length != 0){
        this.currentBill.forEach(e=>{
          this.totalPrice+=Number(e.price)*Number(e.qty);
        })
      }
    }else{
      this.toastr.warning("Không có sản phẩm nào");
    }
  }
  successBill(){
    if(this.currentBill.length != 0){
      if(this.kh.name != '' && this.kh.phone != '' && this.kh.type !=''){
        this.isLoadingAddProcess = true;
        let data = {
          name : this.kh.name,
          phone : this.kh.phone,
          type : this.kh.type,
          detail : this.currentBill,
          requester : this.kh.id,
          province : this.kh.province,
          address : this.kh.address,
          email : this.kh.email,
          assign : this.kh.assign,
          createBy : this.cookieService.getObject('user')['id'],
          total : this.totalPrice,
        }
        this.bs.addBill(data).then(res=>{
          if(res.err==0){
            this.currentBill=new Array();
            this.kh = {
              id : '',
              name : '',
              phone : '',
              type : 'home',
              address : '',
              email : '',
              priority : 4+'',
              province : '79',
              assign : this.cookieService.getObject('user')['id'] + '',
            }
            this.totalPrice=0;
            this.isLoadingAddProcess = false;
            $("#myModal2").modal("hide");
            this.selectKH = 0;
            this.getListBill();
            this.toastr.success("Thêm hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
          }else{
            this.toastr.error(res.err,'Error!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
          }
        })
      }else{
        this.toastr.warning("Thiếu các thông tin cần thiết");
      }
    }else{
      this.toastr.warning("Không có sản phẩm nào");
    }

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
  getListDetailCustomer(){
    let id = this.selectKH;
    this.isLoadingKH = true;
    if(!this.fs.empty(id)){
      this.cs.getDetailCustomer({id : id}).then(
        res => {
          this.kh = {
            id : res.id,
            name : res.name,
            phone : res.phone,
            address : res.address,
            email : res.email,
            type : 'home',
            priority : 4+'',
            province : res.provinceid,
            assign : this.cookieService.getObject('user')['id'] + '',
          }
          this.isLoadingKH = false
        }
      )
    }else{
      this.kh = {
        id : '',
        name : '',
        phone : '',
        type : 'home',
        address : '',
        email : '',
        priority : 4+'',
        province : '79',
        assign : this.cookieService.getObject('user')['id'] + '',
      }
    }
  }
  getListProvince(){
    this.cs.getProvince().then(
        res => {
          this.province = res;
        },
        err => {
        }
    )  
  }
}
