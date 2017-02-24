import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAreaComponent } from './main-area.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { mainRouting } from './main-area.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { ItemsComponent } from './items/items.component';
import { NewItemCreatorComponent } from './new-item-creator/new-item-creator.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SalesComponent } from './sales/sales.component';
import { SaleDetailComponent } from './sale-detail/sale-detail.component';
import { UserAccountSettingsComponent } from './user-account-settings/user-account-settings.component';
import { PasswordRetrievalComponent } from './password-retrieval/password-retrieval.component';
import { PriceReportsComponent } from './price-reports/price-reports.component';
import { PriceReportDetailComponent } from './price-report-detail/price-report-detail.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TextSearchHitsComponent } from './text-search-hits/text-search-hits.component';
import { HelpRequestFormComponent } from './help-request-form/help-request-form.component';

@NgModule({
  imports: [
    CommonModule,
    mainRouting
  ],
  declarations: [MainAreaComponent,
                  MainHomeComponent,
                  DashboardComponent,
                  SearchComponent,
                  ItemsComponent,
                  NewItemCreatorComponent,
                  ItemDetailComponent,
                  ShoppingCartComponent,
                  CheckoutComponent,
                  OrdersComponent,
                  OrderDetailComponent,
                  SalesComponent,
                  SaleDetailComponent,
                  UserAccountSettingsComponent,
                  PasswordRetrievalComponent,
                  PriceReportsComponent,
                  PriceReportDetailComponent,
                  TransactionHistoryComponent,
                  TextSearchHitsComponent,
                  HelpRequestFormComponent]
})
export class MainAreaModule { }
