import { Component, OnInit,ViewChild,ViewContainerRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CustomerService } from '../../service/customer.service';
import { Select2OptionData } from 'ng2-select2';
import BASE_URL from '../../global';
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
    options: Select2Options = {
        multiple: true,
        theme: 'classic',
        closeOnSelect: true
    };
    select2Province : Array<Select2OptionData>;
    select2Province2 : Array<Select2OptionData>;
    customer : any;
    fakeUrl : any;
    base_url : any = BASE_URL;
    displayedColumns = ['select','name','phone','email','address','district','province','create_at','create_by'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('province') province: any;
    public popoverTitle: string = 'Bạn có chắc muốn xóa ???';
    public popoverMessage: string = 'Xóa admin rất nguy hiểm';
    public showSpanName = true;
    dataSource: MatTableDataSource<any>;
    selection = new SelectionModel<Element>(true, []);
    value = 50;
    model={
        username : '',
        name : '',
        phone : '',
        email : '',
        address : '',
        password : '',
        avartar :  {
            name : "",
            value : "",
            type : ""
        },   
        status : 1,
        province : '',
        create_by: this.cookieService.getObject('user')['original']['id'],       
    }
    updateModel={
        username : '',
        name : '',
        phone : '',
        email : '',
        address : '',
        password : '',
        avartar :  {
            name : "",
            value : "",
            type : ""
        },   
        status : 1,
        province : '',
        create_by: this.cookieService.getObject('user')['original']['id'],         
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
                console.log(res);
                this.select2Province = res;
                this.select2Province2 = res;
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
                        username : '',
                        name : '',
                        phone : '',
                        email : '',
                        address : '',
                        password : '',
                        avartar :  {
                            name : "",
                            value : "",
                            type : ""
                        },   
                        status : 1,
                        province : '',
                        create_by: this.cookieService.getObject('user')['original']['id'],       
                    }
                    this.getListCustomer();
                    this.toastr.success("Thêm thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
                }else{
                    this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
                }            
            }
        )
    }
    clickTrash(){
        if(this.selection.selected.length==0){
            return this.toastr.error("Chưa select admin cần xóa",'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
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
            username : row.username,
            password : row.password,
            name : row.name,
            phone : row.phone,
            email : row.email,
            address : row.address,
            province : row.provinceid,
            status : 1,
            avartar :  {
                name : "",
                value : "",
                type : ""
            }, 
            create_by: this.cookieService.getObject('user')['original']['id'],       
        }
        console.log(row);
    }
    readUrl(event:any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            let file = event.target.files[0];
            if(file.type=="image/png" || file.type=="image/jpg" || file.type=="image/jpeg"){
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = (event:any) => {
                this.fakeUrl = event.target.result;
                this.model.avartar.value=reader.result.split(',')[1];
                this.model.avartar.name = file.name;
                this.model.avartar.type = file.type;
                }
            }else{
                this.toastr.error("Chỉ chọn file hình",'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
            }      
        }
    }
}
