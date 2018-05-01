import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, RequestOptions } from '@angular/http';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './app.routing';
import {MatButtonModule,MatCheckboxModule,MatFormFieldModule,MatInputModule,MatAutocompleteModule,MatPaginatorModule  } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
//PLUGIN
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ChartModule,HIGHCHARTS_MODULES } from 'angular-highcharts';
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
// DIRECTIVE
import {OnlyNumber} from './directive/OnlyNumber.directive';
import {Confirm} from './directive/Confirm.directive';

// DYNAMIC COMPONENT
import { Dialog} from './dynamic/dialog/Dialog.component';
// COMPONENT SERVICE
import { ProductService } from './service/product.service';
import { BillService } from './service/bill.service';
import { CategoryService } from './service/category.service';
import { VerifyService } from './service/verify.service';
import { DialogService } from './service/dialog.service';
import { DashboardService } from './service/dashboard.service';
// AUTH SERVICE
import { Auth } from './auth.guard';
import { ifLogin } from './ifLogin.guard';

import { HttpService } from './service/http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

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
    MatSortModule,
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
    // NgbModule.forRoot(),
    
  ],
  entryComponents: [Dialog],
  providers: [DashboardService,ProductService,VerifyService,CookieService,HttpService,Auth,ifLogin,DialogService,CategoryService,BillService],
  bootstrap: [AppComponent],
  exports: [MatButtonModule, MatCheckboxModule]
})
export class AppModule { }
