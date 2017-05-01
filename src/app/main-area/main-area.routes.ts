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
        { path: 'main-home', component: MainHomeComponent, canActivateChild: [AuthGuardService] },
        { path: 'checkout', component: CheckoutComponent, canActivateChild: [AuthGuardService] },
        { path: 'dashboard', component: DashboardComponent, canActivateChild: [AuthGuardService] },
        { path: 'help', component: HelpRequestFormComponent, canActivateChild: [AuthGuardService] },
        { path: 'itemDetail/:itemId', component: ItemDetailComponent, canActivateChild: [AuthGuardService]},
        { path: 'item-creator', component: NewItemCreatorComponent, canActivateChild: [AuthGuardService] },
        { path: 'orderDetail/:orderId', component: OrderDetailComponent, canActivateChild: [AuthGuardService] },
        { path: 'priceRepDetail/:id', component: PriceReportDetailComponent, canActivateChild: [AuthGuardService] },
        { path: 'saleDetail/:saleId', component: SaleDetailComponent, canActivateChild: [AuthGuardService] },
        { path: 'search', component: SearchComponent, canActivateChild: [AuthGuardService] },
        { path: 'cart', component: ShoppingCartComponent, canActivateChild: [AuthGuardService] },
        { path: 'transaction-history', component: TransactionHistoryComponent, canActivateChild: [AuthGuardService] },
        { path: 'user-account-settings', component: UserAccountSettingsComponent, canActivateChild: [AuthGuardService] },
        { path: 'my-items', component: MyItemsComponent, canActivateChild: [AuthGuardService] }
    ]
  }
];
export const mainRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);
