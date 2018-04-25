import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// LAYOUT
//
import { ProductComponent} from './module/product/product.component';
import { DashboardComponent} from './module/dashboard/dashboard.component';
import { LoginComponent} from './module/verify/login/login.component';
import { LogoutComponent} from './module/verify/logout/logout.component';
import { NotFoundComponent } from './module/NotFound.component';
import { LayoutComponent} from './layout/layout.component';
import { AdminComponent } from './module/admin/admin.component';
import { CategoryComponent } from './module/category/category.component';
import { BillComponent } from './module/bill/bill.component';
import { TestComponent} from './test.component';
import {Auth} from './auth.guard';
import { ifLogin } from './ifLogin.guard';
const routes: Routes = [
    {
        path: '',
        canActivate: [Auth],
        component: LayoutComponent,
        children: [
            { path: '', component: DashboardComponent, pathMatch: 'full'},
            { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
            { path: 'admin', component: AdminComponent, pathMatch: 'full'},
            { path: 'product', component: ProductComponent, pathMatch: 'full'},
            { path: 'category', component: CategoryComponent, pathMatch: 'full'},
            { path: 'bill', component: BillComponent, pathMatch: 'full'},
        ]
        
    },
    {
        path: 'test',
        component: TestComponent,
    },
    {
        path: 'login',
        canActivate: [ifLogin],
        component: LoginComponent,
    },
    {
        path: 'logout',
        component: LogoutComponent,
    },    
    {
        path: "**",
        canActivate: [Auth],
        component: NotFoundComponent
    },
];
@NgModule(
    {
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
        // declarations: [NotFoundComponent, Error500Component]
    }
)

export class AppRoutingModule { } 