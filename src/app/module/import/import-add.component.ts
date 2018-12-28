import { Component, OnInit,ViewContainerRef,ElementRef} from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {SelectionModel} from '@angular/cdk/collections';
import { FunctionService } from '../../service/function.service';
import { ProductService } from '../../service/product.service';
import { ProviderService } from '../../service/provider.service';
import { AdminService } from '../../service/admin.service';
import { ImportService } from '../../service/import.service';
import {FormControl} from "@angular/forms";
import BASE_URL from '../../global';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
@Component({
    selector: 'app-import-add',
    templateUrl: './import-add.component.html',
})
export class ImportAddComponent implements OnInit {
  options: Select2Options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: true
  };
  test = 4;
  im = {
    id : '',
    name : '',
    phone : '',
    type : 'home',
    priority : 4+'',
    province : '79',
    assign : this.cookieService.getObject('user')['original']['id'] + '',
  }
  isLoadingProduct : boolean = true;
  selectKH = 0;
  totalPrice = 0;
  province = new Array();
  district = new Array();
  product = new Array();
  provider = new Array();
  admin = new Array();
  currentImport = new Array();
  newBill = new Array();
  tmpNewBill= new Array();
  importDetail = new Array();
  listBill = new Array();
  addType = 0;
  base_url : any = BASE_URL;
  agent : String = this.cookieService.getObject('user')['original']['id'];
  level : String = this.cookieService.getObject('user')['original']['level'];
  selection = new SelectionModel<Element>(true, []);
  constructor(private prs : ProviderService,private fs : FunctionService,private ps : ProductService,private ads : AdminService,private ims : ImportService,private el: ElementRef,private cookieService: CookieService,public toastr: ToastsManager, vcr: ViewContainerRef) {    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    $("#myModal2").removeAttr("tabindex");
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => state ? this.filterStates(state) : this.product.slice())
    );

    return Promise.all([
      this.getListProduct(),
      this.getListProvider(),
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
          this.currentImport.forEach(e2=>{
            if(e2[condition]==id) {
              check2=false;
              return;
            }
          })
          check= true;
          if(check2&&check) this.currentImport.push({id :e.id,name: e.name,price: e.price,img : e.img,qty : 1})
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
        this.currentImport.forEach(e2=>{
          if(e2['id']==id) {
            check2=false;
            return;
          }
        })
        check= true;
        if(check2&&check) this.currentImport.push({id :e.id,name: e.name,price: e.price,img : e.img,qty : 1})
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
  getListProvider(){
    this.prs.getProvider().then(
      res=>{
        this.provider = res;
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
  refreshBill(){
    this.currentImport = new Array();
  }
  changeQTYImport($event,imp){
    if(Number.isInteger(Number($event.target.value))){
      imp.qty=$event.target.value;
    }
  }
  removeImport(imp){
    this.currentImport.forEach((e,key)=>{
      if(imp.id==e.id){
        this.currentImport.splice(key,1);
        this.toastr.success("Xóa sản phẩm thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
        return;
      }
    })
  }
  confirmBill(){
    if(this.currentImport.length != 0){
      $("#myModal2").modal("show");
      this.totalPrice=0;
      if(this.currentImport.length != 0){
        this.currentImport.forEach(e=>{
          this.totalPrice+=Number(e.price)*Number(e.qty);
        })
      }
    }else{
      this.toastr.warning("Không có sản phẩm nào");
    }
  }
  successBill(){
    if(this.currentImport.length != 0){
      if(this.im.name != '' && this.im.phone != '' && this.im.type !=''){
        let data = {
          name : this.im.name,
          phone : this.im.phone,
          type : this.im.type,
          detail : this.currentImport,
          province : this.im.province,
          assign : this.im.assign,
          createBy : this.cookieService.getObject('user')['original']['id'],
          total : this.totalPrice,
        }
        this.ims.addImport(data).then(res=>{
          if(res.err==0){
            this.currentImport=new Array();
            this.im = {
              id : '',
              name : '',
              phone : '',
              type : 'home',
              priority : 4+'',
              province : '79',
              assign : this.cookieService.getObject('user')['original']['id'] + '',
            }
            this.totalPrice=0;
            $("#myModal2").modal("hide");
            this.selectKH = 0;
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
    this.ims.updateImport(data).then(res=>{
      this.toastr.success("Thanh toán thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
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
    this.ims.updateImport(data).then(res=>{
      this.toastr.warning("Ghi nợ thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
    })
  }
  paymentDestroy(bill){
    let data = {
      id : bill,
      status : 'delete',
    };
    this.ims.updateImport(data).then(res=>{
      this.toastr.warning("Hủy hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
    })
  }
  updateStatusPayment(id,payment){
    if(payment == 1) payment = 0;
    else payment = 1
    this.ims.updateImport({payment : payment,id : id,update_by : this.agent}).then(
      res=>{
        this.toastr.success("Cập nhật hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      }
    )
  }
  changeSelectStatus(value){
    this.ims.updateImport({status : value.status,id : value.id,update_by : this.agent}).then(
      res =>{
        this.toastr.success("Cập nhật hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      } 
    )
  }
  getListDetailProvider(){
    let id = this.selectKH;
    console.log(this.selectKH);
    if(!this.fs.empty(id)){
      this.prs.getDetailProvider({id : id}).then(
        res => {
          this.im = {
            id : res.id,
            name : res.name,
            phone : res.phone,
            type : 'home',
            priority : 4+'',
            province : res.provinceid,
            assign : this.cookieService.getObject('user')['original']['id'] + '',
          }
        }
      )
    }else{
      this.im = {
        id : '',
        name : '',
        phone : '',
        type : 'home',
        priority : 4+'',
        province : '79',
        assign : this.cookieService.getObject('user')['original']['id'] + '',
      }
    }
  }
  getListProvince(){
    this.prs.getProvince().then(
        res => {
          this.province = res;
        },
        err => {
        }
    )  
  }
}
