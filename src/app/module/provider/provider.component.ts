import { Component, OnInit,ViewChild,ViewContainerRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProviderService } from '../../service/provider.service';
import BASE_URL from '../../global';
@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
})
export class ProviderComponent implements OnInit {
    options: Select2Options = {
        multiple: true,
        theme: 'classic',
        closeOnSelect: true
    };
    province : any;
    district : any;
    provinceUpdate : any;
    districtUpdate : any;
    provider : any;
    fakeUrl : any;
    base_url : any = BASE_URL;
    displayedColumns = ['select','name','phone','email','address','district','province','create_at','create_by'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
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
        district : '001',
        province : '01',
        create_by: this.cookieService.getObject('user')['original']['id'],       
    }
    updateModel={
        name : '',
        phone : '',
        email : '',
        address : '',
        district : '',
        province : '001',
        update_by: this.cookieService.getObject('user')['original']['id'],       
    }
    constructor(private cs : ProviderService,private cookieService: CookieService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit() {
        $(".selectProvince").select2({width :  "100%"});
        $(".selectDistrict").select2({width :  "100%"});

        return Promise.all([
            this.getListProvider(),
            this.getListProvince(),
            this.getListDistrict()
        ]);
        
        
        
    }
    getListProvider(){
        this.cs.getProvider().then(
            res => {
                this.provider = res;
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
                this.province = res;
                this.provinceUpdate = res;
            },
            err => {
            }
        )  
    }
    getListDistrict(id?,update?:boolean){
        if(id == null || id == '') id = this.model.province
        this.cs.getDistrict({id : id}).then(
            res => {
                if(!update)this.district = res;
                else {
                    this.districtUpdate = res;
                    console.log("District",this.districtUpdate);
                }
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
        this.cs.addProvider(this.model).then(
            res =>{
                if(res.err == 0){
                    this.model={
                        name : '',
                        phone : '',
                        email : '',
                        address : '',
                        district : '',
                        province : '',
                        create_by: this.cookieService.getObject('user')['original']['id'],       
                    }
                    this.getListProvider();
                    this.toastr.success("Thêm thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
                }else{
                    this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
                }            
            }
        )
    }
    onSubmit2($event){
        console.log(this.updateModel);
        // this.cs.addProvider(this.model).then(
        //     res =>{
        //         if(res.err == 0){
        //             this.model={
        //                 name : '',
        //                 phone : '',
        //                 email : '',
        //                 address : '',
        //                 district : '',
        //                 province : '',
        //                 create_by: this.cookieService.getObject('user')['original']['id'],       
        //             }
        //             this.getListProvider();
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
        this.cs.deleteProvider(arrId).then(res=>{
            this.toastr.warning("Xóa thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
            this.getListProvider();
        });
    }
    editRow(row){  
        this.updateModel={
            name : row.name,
            phone : row.phone,
            email : row.email,
            address : row.address,
            district : row.districtid,
            province : row.provinceid,
            update_by: this.cookieService.getObject('user')['original']['id'],       
        }
        console.log(row.provinceid);
        $("#myModal").modal('show');  
        $(".selectProvinceUpdate").select2({width :  "100%"});
    }
}
