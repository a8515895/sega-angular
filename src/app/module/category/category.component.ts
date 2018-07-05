import { Component, OnInit,ViewChild,ViewContainerRef} from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CategoryService } from '../../service/category.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DialogService } from '../../service/dialog.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns = ['select','id', 'name','parent_name', 'icon'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public popoverTitle: string = 'Bạn có chắc muốn xóa ???';
  public popoverMessage: string = 'Xóa tiêu đề sẽ xóa các sản phẩm liên quan';
  public showSpanName = true;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<Element>(true, []);
  value = 50;
  model = {
    parent : 0,
    name : '',
    create_by: this.cookieService.getObject('user')['original']['id'],
    icon : ''
  }
  listAllCategoryParent = new Array();
  constructor(private cookieService: CookieService,private cs : CategoryService,public toastr: ToastsManager, vcr: ViewContainerRef,public confirm:DialogService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {    
    this.getListCategory();
  }
  getListCategory(){
    this.listAllCategoryParent = new Array();
    this.cs.getCategory().then(
      res => {
        res.forEach(e => {
          if(e.parent == 0){
            this.listAllCategoryParent.push(e);
          }
        });
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
          console.log(err);
      }
    ) 

  }
  onSubmit(){
    this.cs.addCategory(this.model).then(
      res=>{
        if(res.err == 0){
          this.model = {
            parent : 0,
            name : '',
            create_by: this.cookieService.getObject('user')['original']['id'],
            icon : ''
          }
          this.getListCategory();
          this.toastr.success("Thêm thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
        }else{
          this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
        }
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
  clickTrash(){
    let arrId = new Array;
    this.selection.selected.forEach(e=>{
      arrId.push(e.id);
    })
    this.cs.deleteCategory(arrId).then(res=>{
      this.toastr.warning("Xóa thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
      this.getListCategory();
    });
  }
  toggleEdit($event,data,type){
    console.log($event);
    if($event.type == "click"){
      let span = $event.currentTarget.children[0];
      let input = $event.currentTarget.children[1];
      if(input.classList.contains('hide')){
        input.classList.remove('hide');
        span.classList.add('hide');
      }
    }else{
      if($event.keyCode == 13){
        let input = $event.target.value;
        if(type == 'name') data['name'] = input;
        data['update_by']=this.cookieService.getObject('user')['original']['id'];
        this.cs.updateCategory(data).then(res=>{
          if(res.err == 0){
            this.getListCategory();
            this.toastr.success("Update thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
          }else{
            this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
          }
        })
        
      }
    }
  }

}
