import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { Select2Module } from 'ng2-select2';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
//COMPONENT
import { LayoutComponent} from './layout/layout.component';
import { ProductComponent} from './module/product/product.component';
import { LoginComponent} from './module/verify/login/login.component';
import { LogoutComponent} from './module/verify/logout/logout.component';
import { NotFoundComponent } from './module/NotFound.component';

import { TestComponent} from './test.component';
// DYNAMIC COMPONENT
import { Dialog} from './dynamic/dialog/Dialog.component';
// COMPONENT SERVICE
import { ProductService } from './service/product.service';
import { CategoryService } from './service/category.service';
import { VerifyService } from './service/verify.service';
import { DialogService } from './service/dialog.service';
// AUTH SERVICE
import { Auth } from './auth.guard';
import { ifLogin } from './ifLogin.guard';

import { HttpService } from './service/http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { AdminComponent } from './module/admin/admin.component';
import { CategoryComponent } from './module/category/category.component';
import { BillComponent } from './module/bill/bill.component';
@NgModule({
  declarations: [
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
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule ,
    Select2Module,
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
  providers: [ProductService,VerifyService,CookieService,HttpService,Auth,ifLogin,DialogService,CategoryService],
  bootstrap: [AppComponent],
  exports: [MatButtonModule, MatCheckboxModule]
})
export class AppModule { }
