import { Component, OnInit,ViewChild,ViewContainerRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CustomerService } from '../../service/customer.service';
import { Select2OptionData } from 'ng2-select2';
import BASE_URL from '../../global';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
    options: Select2Options = {
        multiple: true,
        theme: 'classic',
        closeOnSelect: true
    };
    select2Province : Array<Select2OptionData>;
    select2District : Array<Select2OptionData>;
    select2Province2 : Array<Select2OptionData>;
    select2District2 : Array<Select2OptionData>;
    customer : any;
    fakeUrl : any;
    base_url : any = BASE_URL;
    displayedColumns = ['select','name','phone','email','address','district','province','create_at','create_by'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('province') province: any;
    public popoverTitle: string = 'Bạn có chắc muốn xóa ???';
    public popoverMessage: string = 'Xóa khách hàng rất nguy hiểm';
    public showSpanName = true;
    dataSource: MatTableDataSource<any>;
    selection = new SelectionModel<Element>(true, []);
    value = 50;
    model={
        name : '',
        phone : '',
        email : '',
        address : '',
        district : '',
        province : '',
        create_by: this.cookieService.getObject('user')['id'],       
    }
    updateModel={
        name : '',
        phone : '',
        email : '',
        address : '',
        district : '',
        province : '',
        create_by: this.cookieService.getObject('user')['id'],       
    }
    constructor(private cs : CustomerService,private cookieService: CookieService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit() {
        this.getListCustomer();
        this.getListProvince();
    }
    getListCustomer(){
        this.cs.getCustomer().then(
            res => {
                this.customer = res;
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            err => {
            }
        )
    }
    getListProvince(){
        this.cs.getProvince().then(
            res => {
                this.select2Province = res;
                this.select2Province2 = res;
            },
            err => {
            }
        )  
    }
    getListDistrict(){
        this.cs.getDistrict({id : this.model.province}).then(
            res => {
                this.select2District = res;
                this.select2District2 = res;
            },
            err => {
            }
        )
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }
    onSubmit($event){
        this.cs.addCustomer(this.model).then(
            res =>{
                if(res.err == 0){
                    this.model={
                        name : '',
                        phone : '',
                        email : '',
                        address : '',
                        district : '',
                        province : '',
                        create_by: this.cookieService.getObject('user')['id'],       
                    }
                    this.getListCustomer();
                    this.toastr.success("Thêm thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
                }else{
                    this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
                }            
            }
        )
    }
    onSubmit2($event){
        console.log(this.updateModel);
        // this.cs.addCustomer(this.model).then(
        //     res =>{
        //         if(res.err == 0){
        //             this.model={
        //                 name : '',
        //                 phone : '',
        //                 email : '',
        //                 address : '',
        //                 district : '',
        //                 province : '',
        //                 create_by: this.cookieService.getObject('user')['id'],       
        //             }
        //             this.getListCustomer();
        //             this.toastr.success("Thêm thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
        //         }else{
        //             this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
        //         }            
        //     }
        // )
    }
    clickTrash(){
        if(this.selection.selected.length==0){
            return this.toastr.error("Chưa select khách hàng xóa",'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
        }
        let arrId = new Array;
        this.selection.selected.forEach(e=>{
            arrId.push(e.id);
        })
        this.cs.deleteCustomer(arrId).then(res=>{
            this.toastr.warning("Xóa thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
            this.getListCustomer();
        });
    }
    editRow(row){
        $("#myModal").modal("show");
        this.updateModel={
            name : row.name,
            phone : row.phone,
            email : row.email,
            address : row.address,
            district : row.districtid,
            province : row.provinceid,
            create_by: this.cookieService.getObject('user')['id'],       
        }
        
    }
    selectProvinceChange(e){
        this.model.province = e.value
        this.getListDistrict();
    }
    selectDistrictChange(e){
        this.model.district = e.value;
    }
    selectProvinceChange2(e){
        this.updateModel.province = e.value
        this.getListDistrict();
    }
    selectDistrictChange2(e){
        this.updateModel.district = e.value;
    }
}
