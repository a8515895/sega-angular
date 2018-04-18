import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './app.routing';
import {MatButtonModule,MatCheckboxModule,MatFormFieldModule,MatInputModule,MatAutocompleteModule } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
//PLUGIN
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Select2Module } from 'ng2-select2';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';


//COMPONENT
import { LayoutComponent} from './layout/layout.component';
import { ProductComponent} from './module/product/product.component';
import { LoginComponent} from './module/verify/login/login.component';
import { LogoutComponent} from './module/verify/logout/logout.component';
import { NotFoundComponent } from './module/NotFound.component';
import { TestComponent} from './test.component';
// DYNAMIC COMPONENT
import { Dialog} from './dynamic/dialog/Dialog.component';
// COMPOTENT SERVICE
import { ProductService } from './service/product.service';
import { VerifyService } from './service/verify.service';
import { DialogService } from './service/dialog.service';

// AUTH SERVICE
import { Auth } from './auth.guard';
import { ifLogin } from './ifLogin.guard';

import { HttpService } from './service/http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DashboardComponent } from './module/dashboard/dashboard.component';
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
  ],
  imports: [
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    Select2Module,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    NoopAnimationsModule,
    AngularFontAwesomeModule,
    FormsModule,
    MatRadioModule,
    NguiAutoCompleteModule,
    ReactiveFormsModule,
    BrowserModule,
    // NgbModule.forRoot(),
    
  ],
  entryComponents: [Dialog],
  providers: [ProductService,VerifyService,CookieService,HttpService,Auth,ifLogin,DialogService],
  bootstrap: [AppComponent],
  exports: [MatButtonModule, MatCheckboxModule]
})
export class AppModule { }
