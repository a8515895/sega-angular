import { Component, OnInit,ViewChild,ViewContainerRef} from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProducerService } from '../../service/producer.service';
import BASE_URL from '../../global';
@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {
  producer : any;
  fakeUrl : any;
  base_url : any = BASE_URL;
  displayedColumns = ['select','name'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public popoverTitle: string = 'Bạn có chắc muốn xóa ???';
  public popoverMessage: string = 'Xóa nhà sản xuất rất nguy hiểm';
  public showSpanName = true;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<Element>(true, []);
  value = 50;
  model={
    name : '',
    create_by: this.cookieService.getObject('user')['id'],       
  }
  constructor(private ps : ProducerService,private cookieService: CookieService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getListProducer();
  }
  getListProducer(){
    this.ps.getProducer().then(
        res => {
            this.producer = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
    this.ps.addProducer(this.model).then(
        res =>{
            this.model={
                name : '',
                create_by: this.cookieService.getObject('user')['id'],       
            }
            this.getListProducer();
            if(res.err == 0){
                this.toastr.success("Thêm thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
            }else{
                this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
            }            
        }
    )
  }
  clickTrash(){
      if(this.selection.selected.length==0){
          return this.toastr.error("Chưa select nhà sản xuất xóa",'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
      }
      let arrId = new Array;
      this.selection.selected.forEach(e=>{
        arrId.push(e.id);
      })
      this.ps.deleteProducer(arrId).then(res=>{
        this.toastr.warning("Xóa thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
        this.getListProducer();
      });
  }
  editRow(row){
      
  }

}
