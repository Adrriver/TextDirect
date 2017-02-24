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

const mainRoutes: Routes = [
  {
    path: '',
    component: MainAreaComponent,
    children: [
        { path: 'main-home', component: MainHomeComponent },
        { path: 'checkout', component: CheckoutComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'help', component: HelpRequestFormComponent },
        { path: 'detail/:id', component: ItemDetailComponent },
        { path: 'item-creator', component: NewItemCreatorComponent },
        { path: 'detail/:id', component: OrderDetailComponent }, 
        { path: 'retrieve-password', component: PasswordRetrievalComponent },
        { path: 'detail/:id', component: PriceReportDetailComponent }, 
        { path: 'detail/:id', component: SaleDetailComponent }, 
        { path: 'search', component: SearchComponent },
        { path: 'cart', component: ShoppingCartComponent },
        { path: 'transaction-history', component: TransactionHistoryComponent },
        { path: 'user-account-settings', component: UserAccountSettingsComponent },
    ]
  }
];
export const mainRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);