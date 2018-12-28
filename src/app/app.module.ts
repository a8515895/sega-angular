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
import {MatTooltipModule} from '@angular/material/tooltip';

//PLUGIN
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ChartModule } from 'angular-highcharts';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { Select2Module } from 'ng2-select2';
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
import { ImportAddComponent } from './module/import/import-add.component';
import { ChatComponent } from './module/chat/chat.component';
import { CustomerComponent } from './module/customer/customer.component';
import { ProviderComponent } from './module/provider/provider.component';
import { ProducerComponent } from './module/producer/producer.component';
import { EventComponent } from './module/event/event.component';

// DIRECTIVE
import {OnlyNumber} from './directive/OnlyNumber.directive';
import {Confirm} from './directive/Confirm.directive';

// DYNAMIC COMPONENT
// COMPONENT SERVICE
import { ProductService } from './service/product.service';
import { ProviderService } from './service/provider.service';
import { AdminService } from './service/admin.service';
import { ProducerService } from './service/producer.service';
import { BillService } from './service/bill.service';
import { CategoryService } from './service/category.service';
import { CustomerService } from './service/customer.service';
import { VerifyService } from './service/verify.service';
import { DashboardService } from './service/dashboard.service';
import { ImportService } from './service/import.service';
import { ReportService } from './service/report.service';
import { EventService } from './service/event.service';
import { FunctionService } from './service/function.service';
// AUTH SERVICE
import { Auth } from './auth.guard';
import { ifLogin } from './ifLogin.guard';
import { HttpService } from './service/http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

export function cookieServiceFactory() {
  return new CookieService();
}
@NgModule({
  declarations: [
    OnlyNumber,
    Confirm,
    LayoutComponent,
    AppComponent,
    ProductComponent,
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
    ProviderComponent,
    CustomerComponent,
    EventComponent,
    ImportAddComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
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
    MatTooltipModule,
    NoopAnimationsModule,
    AngularFontAwesomeModule,
    Select2Module,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    ToastModule.forRoot(),
    SocketIoModule.forRoot(config) 
    // NgbModule.forRoot(),
    
    
  ],
  entryComponents: [],
  providers: [
    EventService,
    ProviderService,
    AdminService,
    ImportService,
    CustomerService,
    ProducerService,
    ReportService,
    DashboardService,
    ProductService,
    VerifyService,
    CookieService,
    HttpService,
    FunctionService,
    Auth,
    ifLogin,
    CategoryService,
    BillService,
    { provide: CookieService, useFactory: cookieServiceFactory },
  ],
  bootstrap: [AppComponent],
  exports: [MatButtonModule, MatCheckboxModule,MatDatepickerModule]
})
export class AppModule { }
