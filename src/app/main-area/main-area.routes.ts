import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAreaComponent } from './main-area.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpRequestFormComponent } from './help-request-form/help-request-form.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { NewItemCreatorComponent } from './new-item-creator/new-item-creator.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PasswordRetrievalComponent } from './password-retrieval/password-retrieval.component';
import { PriceReportDetailComponent } from './price-report-detail/price-report-detail.component';
import { SaleDetailComponent } from './sale-detail/sale-detail.component';
import { SearchComponent } from './search/search.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { UserAccountSettingsComponent } from './user-account-settings/user-account-settings.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { AuthGuardService } from './auth-guard.service';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainAreaComponent,
    canActivate: [AuthGuardService],
    children: [
        { path: 'main-home', component: MainHomeComponent },
        { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
        { path: 'help', component: HelpRequestFormComponent, canActivate: [AuthGuardService] },
        { path: 'detail/:id', component: ItemDetailComponent, canActivate: [AuthGuardService]},
        { path: 'item-creator', component: NewItemCreatorComponent, canActivate: [AuthGuardService] },
        { path: 'detail/:id', component: OrderDetailComponent, canActivate: [AuthGuardService] }, 
        { path: 'retrieve-password', component: PasswordRetrievalComponent, canActivate: [AuthGuardService] },
        { path: 'detail/:id', component: PriceReportDetailComponent, canActivate: [AuthGuardService] }, 
        { path: 'detail/:id', component: SaleDetailComponent, canActivate: [AuthGuardService] }, 
        { path: 'search', component: SearchComponent, canActivate: [AuthGuardService] },
        { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuardService] },
        { path: 'transaction-history', component: TransactionHistoryComponent, canActivate: [AuthGuardService] },
        { path: 'user-account-settings', component: UserAccountSettingsComponent, canActivate: [AuthGuardService] },
        { path: 'my-items', component: MyItemsComponent, canActivate: [AuthGuardService] }
    ]
  }
];
export const mainRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);