import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// LAYOUT
import { ProductComponent} from './module/product/product.component';
import { ChatComponent} from './module/chat/chat.component';
import { CustomerComponent} from './module/customer/customer.component';
import { ProviderComponent} from './module/provider/provider.component';
import { DashboardComponent} from './module/dashboard/dashboard.component';
import { LoginComponent} from './module/verify/login/login.component';
import { LogoutComponent} from './module/verify/logout/logout.component';
import { NotFoundComponent } from './module/NotFound.component';
import { LayoutComponent} from './layout/layout.component';
import { AdminComponent } from './module/admin/admin.component';
import { CategoryComponent } from './module/category/category.component';
import { EventComponent } from './module/event/event.component';
import { BillComponent } from './module/bill/bill.component';
import { BillAddComponent } from './module/bill/bill-add.component';
import { ImportComponent } from './module/import/import.component';
import { ImportAddComponent } from './module/import/import-add.component';
import { ReportComponent } from './module/report/report.component';
import { ProducerComponent } from './module/producer/producer.component';
import { TestComponent} from './test.component';
import {Auth} from './auth.guard';
import { ifLogin } from './ifLogin.guard';
const routes: Routes = [
    {
        path: '',
        canActivate: [Auth],
        component: LayoutComponent,
        children: [            
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
            { path: 'admin', component: AdminComponent, pathMatch: 'full'},
            { path: 'product', component: ProductComponent, pathMatch: 'full'},
            { path: 'producer', component: ProducerComponent, pathMatch: 'full'},
            { path: 'category', component: CategoryComponent, pathMatch: 'full'},
            { path: 'customer', component: CustomerComponent, pathMatch: 'full'},
            { path: 'provider', component: ProviderComponent, pathMatch: 'full'},
            { path: 'event', component: EventComponent, pathMatch: 'full'},
            { path: 'bill', children: [
                { path: 'add', component: BillAddComponent, pathMatch: 'full'},
                { path: 'list', component: BillComponent, pathMatch: 'full'},
            ]},
            { path: 'import', children: [
                { path: 'add', component: ImportAddComponent, pathMatch: 'full'},
                { path: 'list', component: ImportComponent, pathMatch: 'full'},
            ]},
            { path: 'report', component: ReportComponent, pathMatch: 'full'},
            { path: 'chat', component: ChatComponent, pathMatch: 'full'},
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