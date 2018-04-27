import { Component, OnInit,ViewChild,ViewContainerRef} from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DialogService } from '../../service/dialog.service';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import {FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import * as jQuery from 'jquery';
import BASE_URL from '../../global';
@Component({
    selector: 'product',
    templateUrl: 'product.component.html'
})

export class ProductComponent implements OnInit {
    product : any;
    fakeUrl : any;
    base_url : any = BASE_URL;
    displayedColumns = ['select','id','img', 'name','category', 'price'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public popoverTitle: string = 'Bạn có chắc muốn xóa ???';
    public popoverMessage: string = 'Xóa sản phẩm rất nguy hiểm';
    public showSpanName = true;
    dataSource: MatTableDataSource<any>;
    selection = new SelectionModel<Element>(true, []);
    value = 50;
    listCategory = new Array();
    model={
        category : '',
        name : '',
        price : '',
        create_by: this.cookieService.getObject('user')['original']['id'],
        img: {
            name : "",
            value : "",
            type : ""
        },        
    }
    
    constructor(private ps : ProductService,private cs : CategoryService,private cookieService: CookieService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit() { 
        this.getListProduct();
        this.getListCategory();
    }
    getListProduct(){
        this.ps.getProduct().then(
            res => {
                this.product = res;
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            err => {
                console.log(err);
            }
        )
    }
    getListCategory(){
        this.cs.getCategory().then(
            res=>{
                this.listCategory = res;
            }
        );
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
    readUrl(event:any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            let file = event.target.files[0];
            if(file.type=="image/png" || file.type=="image/jpg" || file.type=="image/jpeg"){
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = (event:any) => {
                this.fakeUrl = event.target.result;
                this.model.img.value=reader.result.split(',')[1];
                this.model.img.name = file.name;
                this.model.img.type = file.type;
                }
            }else{
                this.toastr.error("Chỉ chọn file hình",'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
            }      
        }
    }
    onSubmit($event){
        if(this.model.img.value != ""){
            this.ps.addProduct(this.model).then(
                res =>{
                    this.model={
                        category : '',
                        name : '',
                        price : '',
                        create_by: this.cookieService.getObject('user')['original']['id'],
                        img: {
                            name : "",
                            value : "",
                            type : ""
                        },        
                    }
                    this.fakeUrl = "";
                    this.getListProduct();
                    if(res.err == 0){
                        this.toastr.success("Thêm thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
                    }else{
                        this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
                    }            
                }
            )
        }else{
            this.toastr.error("Thiếu hình sản phẩm",'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
        }

    }
    clickTrash(){
        if(this.selection.selected.length==0){
            return this.toastr.error("Chưa select sản phẩm xóa",'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
        }
        let arrId = new Array;
        this.selection.selected.forEach(e=>{
          arrId.push(e.id);
        })
        this.ps.deleteProduct(arrId).then(res=>{
          this.toastr.warning("Xóa thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
          this.getListProduct();
        });
    }
    editRow(row){
        console.log(row);
    }
}