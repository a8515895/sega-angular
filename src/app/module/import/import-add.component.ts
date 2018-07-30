import { Component, OnInit,ViewChild,ViewContainerRef,ElementRef} from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {SelectionModel} from '@angular/cdk/collections';
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
    kh = {
        id : '',
        name : '',
        phone : '',
        type : 'home',
        address : '',
        email : '',
        priority : 4+'',
        province : '',
        district : '',
        assign : this.cookieService.getObject('user')['original']['id'] + '',
    }
    totalPrice = 0;
    province = new Array();
    district = new Array();
    product = new Array();
    customer = new Array();
    admin = new Array();
    currentImport = new Array();
    newImport = new Array();
    tmpNewImport= new Array();
    importDetail = new Array();
    listImport = new Array();
    base_url : any = BASE_URL;
    agent : String = this.cookieService.getObject('user')['original']['id'];
    level : String = this.cookieService.getObject('user')['original']['level'];
    selection = new SelectionModel<Element>(true, []);
    constructor(private ps : ProductService,private ads : AdminService,private cs : ProviderService,private bs : ImportService,private el: ElementRef,private cookieService: CookieService,public toastr: ToastsManager, vcr: ViewContainerRef) {
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
        this.getListImport(),
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
            }
        )
    }
    getListImport(){
        this.bs.getImportNew({status : 'new'}).then(
        res => {        
            this.newImport=res;
            this.tmpNewImport=res;
        },
        err => {
        }
        )
    }
    getListProvider(){
        this.cs.getProvider().then(
        res=>{
            this.customer = res;
            if(res.length > 0)
            this.getListDetailProvider(res[0].id);
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
    getListImportDetail(id){
        this.importDetail = new Array();
        this.bs.getImportDetail({id : id}).then(
        res => {                
            this.importDetail=res;
        },
        err => {
        }
        )
    }
    refreshImport(){
        this.currentImport = new Array();
    }
    changeQTYImport($event,im){
        if(Number.isInteger(Number($event.target.value))){
        im.qty=$event.target.value;
        }
    }
    removeImport(im){
        this.currentImport.forEach((e,key)=>{
        if(im.id==e.id){
            this.currentImport.splice(key,1);
            this.toastr.success("Xóa sản phẩm thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
            return;
        }
        })
    }
    confirmImport(){
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
    successImport(){
        if(this.currentImport.length != 0){
        if(this.kh.name != '' && this.kh.phone != '' && this.kh.type !=''){
            let data = {
            name : this.kh.name,
            phone : this.kh.phone,
            type : this.kh.type,
            detail : this.currentImport,
            requester : this.kh.id,
            province : this.kh.province,
            district : this.kh.district,
            address : this.kh.address,
            email : this.kh.email,
            assign : this.kh.assign,
            createBy : this.cookieService.getObject('user')['original']['id'],
            total : this.totalPrice,
            }
            this.bs.addImport(data).then(res=>{
            if(res.err==0){
                this.currentImport=new Array();
                this.kh = {
                id : '',
                name : '',
                phone : '',
                type : '',
                province : '',
                district : '',
                address : '',
                email : '',
                priority : 4+'',
                assign : this.cookieService.getObject('user')['original']['id'] + '',
                }
                this.totalPrice=0;
                $("#myModal2").modal("hide");
                this.getListImport();
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
    paymentSuccess(im){
        let data = {
        id : im,
        status : 'solved',
        payment : 1
        };
        this.bs.updateImport(data).then(res=>{
        this.toastr.success("Thanh toán thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
        this.getListImport();
        })
    }
    paymentDebt(im,name){
        if(name == null || name == ''){
        return this.toastr.error('Phải nhập tên người nợ','Error!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
        }
        let data = {
        id : im,
        status : 'solved',
        debt_name: name,

        };
        this.bs.updateImport(data).then(res=>{
        this.toastr.warning("Ghi nợ thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
        this.getListImport();
        })
    }
    paymentDestroy(im){
        let data = {
        id : im,
        status : 'delete',
        };
        this.bs.updateImport(data).then(res=>{
        this.toastr.warning("Hủy hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
        this.getListImport();
        })
    }
    updateStatusPayment(id,payment){
        if(payment == 1) payment = 0;
        else payment = 1
        this.bs.updateImport({payment : payment,id : id,update_by : this.agent}).then(
        res=>{
            this.toastr.success("Cập nhật hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
        }
        )
    }
    changeSelectStatus(value){
        this.bs.updateImport({status : value.status,id : value.id,update_by : this.agent}).then(
        res =>{
            this.toastr.success("Cập nhật hóa đơn thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
        } 
        )
    }
    getListDetailProvider(id){
        this.cs.getDetailProvider({id : id}).then(
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
            district : res.districtid,
            assign : this.cookieService.getObject('user')['original']['id'] + '',
            }
            console.log("Province",this.kh.province);
            if(this.kh.province != ''){
            console.log("Province2",this.kh.province);
            this.getListDistrict();
            }
        }
        )
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
    getListDistrict(){
        console.log("District",this.kh.province)
        let id = this.kh.province == "" ? "01" : this.kh.province;
        console.log("District2",id)
        this.cs.getDistrict({id : id}).then(
            res => {
                this.district = res;
                this.kh.district = res[0].id;
                console.log("District3",this.kh.district)
            },
            err => {
            }
        )
    }
}
