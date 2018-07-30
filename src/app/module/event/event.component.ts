import { Component, OnInit,ViewChild,ViewContainerRef,Renderer2,ElementRef} from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { EventService } from '../../service/event.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {DateAdapter, MAT_DATE_FORMATS,NativeDateAdapter} from '@angular/material/core';
import BASE_URL from '../../global';

export class AppDateAdapter extends NativeDateAdapter {
  parse(value: any): any | null {
   if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
     const str = value.split('/');
     const year = Number(str[2]);
     const month = Number(str[1]) - 1;
     const date = Number(str[0]);
     return new Date(year, month, date);
   }
   const timestamp = typeof value === 'number' ? value : Date.parse(value);
   return isNaN(timestamp) ? null :  new Date(timestamp);

 }

  format(date: Date, displayFormat: Object): string {
      if (displayFormat == "input") {
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
      } else {
          return date.toDateString();
      }
  }
  private _to2digit(n: number) {
      return ('00' + n).slice(-2);
  } 
}
export const APP_DATE_FORMATS =
{
  parse: {
      dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
      // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
      dateInput: 'input',
      monthYearLabel: { month: 'short', year: 'numeric', day: 'numeric' },
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
}
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ],
})
export class EventComponent implements OnInit {
  displayedColumns = ['select','name','status', 'startdate','enddate'];
  BASE_URL = BASE_URL;
  @ViewChild('div') div:ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public popoverTitle: string = 'Bạn có chắc muốn xóa ???';
  public popoverMessage: string = 'Xóa tiêu đề sẽ xóa các sự kiện liên quan';
  public showSpanName = true;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<Element>(true, []);
  value = 50;
  model = {
    name : '',
    create_by: this.cookieService.getObject('user')['original']['id'],
    startdate : null,
    enddate : null,
    description : '',
  }
  modelUpdate = {
    id : '',
    name : '',
    update_by: this.cookieService.getObject('user')['original']['id'],
    startdate : null,
    enddate : null,
    description : '',
  }
  constructor(private cookieService: CookieService,private renderer: Renderer2,private es : EventService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getListEvent();
  }
  getListEvent(){
    this.es.getEvent().then(
      res => {
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
    this.model['startdate'] = new Date(this.model.startdate).getTime()/1000;
    this.model['enddate'] = new Date(this.model.enddate).getTime()/1000;
    console.log(this.model['startdate']);
    if(this.model['enddate'] >= this.model['startdate']){
      this.es.addEvent(this.model).then(
        res=>{
          if(res.err == 0){
            this.model = {
              name : '',
              create_by: this.cookieService.getObject('user')['original']['id'],
              startdate : null,
              enddate : null,
              description : '',
            }
            this.getListEvent();
            this.toastr.success("Thêm thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
          }else{
            this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
          }
        }
      );
    }else{
      this.toastr.error("Khoảng thời gian không hợp lý",'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
    }
  
  }
  onSubmit2(){
    this.modelUpdate['startdate'] = new Date(this.modelUpdate.startdate).getTime()/1000;
    this.modelUpdate['enddate'] = new Date(this.modelUpdate.enddate).getTime()/1000;
    if(this.modelUpdate['enddate'] >= this.modelUpdate['startdate']){
      this.es.updateEvent(this.modelUpdate).then(
        res=>{
          if(res.err == 0){
            this.modelUpdate = {
              id : '',
              name : '',
              update_by: this.cookieService.getObject('user')['original']['id'],
              startdate : null,
              enddate : null,
              description : '',
            }
            $("#updateEventModal").modal("hide");
            this.getListEvent();
            this.toastr.success("Thay đổi thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
          }else{
            this.toastr.error(res.err,'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
          }
        }
      );
    }else{
      this.toastr.error("Khoảng thời gian không hợp lý",'Error!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
    }
  
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
  updateStatus(id,status){
    if(status == 1) status = 0;
    else status = 1
    this.es.updateEvent({status : status,id : id,update_by : this.cookieService.getObject('user')['original']['id']}).then(
      res=>{
        this.toastr.success("Cập nhật trạng thái thành công",'Success!',{positionClass : 'toast-bottom-left',animate : 'flyLeft',showCloseButton : true});
      }
    )
  }
  clickTrash(){
    let arrId = new Array;
    this.selection.selected.forEach(e=>{
      arrId.push(e.id);
    })
    this.es.deleteEvent(arrId).then(res=>{
      this.toastr.warning("Xóa thành công",'Success!',{positionClass : 'toast-top-left',animate : 'flyLeft',showCloseButton : true});
      this.getListEvent();
    });
  }
  openModalUpdateEvent(id){
    this.es.getDetailEvent({id : id}).then(
      res => {
        this.modelUpdate = {
          id : id,
          name : res.name,
          update_by: this.cookieService.getObject('user')['original']['id'],
          startdate : new Date(res.startdate*1000),
          enddate : new Date(res.enddate*1000),
          description : '',
        }
        $("#updateEventModal").modal("show");
      }
    )
  }
  addRowEvent(){
    let div2 = document.createElement("div");
        div2.className = 'row';
        this.renderer.setStyle(div2,'margin-bottom','10px');
        div2.innerHTML = `
            <div class="col-md-3">
              <select class="form-control">
                <option value="sale_off"> Khuyến mãi </option>
                <option value="gift"> Quà tặng </option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-control">
                <option value="sale_off"> Phần trăm </option>
                <option value="gift"> Số Lượng </option>
              </select>
            </div>
        `;
        this.renderer.appendChild(this.div.nativeElement,div2);  
        this.renderer.listen(div2,"click",()=>{
        });
  }
}
