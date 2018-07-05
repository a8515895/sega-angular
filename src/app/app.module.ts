import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './app.routing';
import {MatNativeDateModule,MatButtonModule,MatCheckboxModule,MatFormFieldModule,MatInputModule,MatAutocompleteModule,MatPaginatorModule  } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
//PLUGIN
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ChartModule } from 'angular-highcharts';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'https://sega-group.com:3000', options: {secure: true} };
//COMPONENT
import { LayoutComponent} from './layout/layout.component';
import { ProductComponent} from './module/product/product.component';
import { LoginComponent} from './module/verify/login/login.component';
import { LogoutComponent} from './module/verify/logout/logout.component';
import { NotFoundComponent } from './module/NotFound.component'
import { TestComponent} from './test.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { AdminComponent } from './module/admin/admin.component';
import { CategoryComponent } from './module/category/category.component';
import { BillComponent } from './module/bill/bill.component';
import { BillAddComponent } from './module/bill/bill-add.component';
import { ReportComponent } from './module/report/report.component';
import { ImportComponent } from './module/import/import.component';
import { ChatComponent } from './module/chat/chat.component';
import { ProducerComponent } from './module/producer/producer.component';

// DIRECTIVE
import {OnlyNumber} from './directive/OnlyNumber.directive';
import {Confirm} from './directive/Confirm.directive';

// DYNAMIC COMPONENT
import { Dialog} from './dynamic/dialog/Dialog.component';
// COMPONENT SERVICE
import { ProductService } from './service/product.service';
import { ProducerService } from './service/producer.service';
import { BillService } from './service/bill.service';
import { CategoryService } from './service/category.service';
import { VerifyService } from './service/verify.service';
import { DialogService } from './service/dialog.service';
import { DashboardService } from './service/dashboard.service';
import { ImportService } from './service/import.service';
import { ReportService } from './service/report.service';
import { EventService } from './service/event.service';
// AUTH SERVICE
import { Auth } from './auth.guard';
import { ifLogin } from './ifLogin.guard';

import { HttpService } from './service/http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { EventComponent } from './module/event/event.component';


@NgModule({
  declarations: [
    OnlyNumber,
    Confirm,
    LayoutComponent,
    AppComponent,
    ProductComponent,
    Dialog,
    NotFoundComponent,
    LoginComponent,
    LogoutComponent,
    LayoutComponent,
    TestComponent,
    DashboardComponent,
    AdminComponent,
    CategoryComponent,
    BillComponent,
    BillAddComponent,
    ReportComponent,
    ImportComponent,
    ChatComponent,
    ProducerComponent,
    EventComponent,
  ],
  imports: [
    HttpModule,
    ChartModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule ,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    AngularFontAwesomeModule,
    FormsModule,
    MatRadioModule,
    NguiAutoCompleteModule,
    ReactiveFormsModule,
    BrowserModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    ToastModule.forRoot(),
    SocketIoModule.forRoot(config) 
    // NgbModule.forRoot(),
    
  ],
  entryComponents: [Dialog],
  providers: [EventService,ImportService,ProducerService,ReportService,DashboardService,ProductService,VerifyService,CookieService,HttpService,Auth,ifLogin,DialogService,CategoryService,BillService
  ],
  bootstrap: [AppComponent],
  exports: [MatButtonModule, MatCheckboxModule,MatDatepickerModule]
})
export class AppModule { }
