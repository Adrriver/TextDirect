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
import { PriceReportsComponent } from './price-reports/price-reports.component';
import { PriceReportDetailComponent } from './price-report-detail/price-report-detail.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TextSearchHitsComponent } from './text-search-hits/text-search-hits.component';
import { HelpRequestFormComponent } from './help-request-form/help-request-form.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { ItemCompetitorsComponent } from './new-item-creator/item-competitors/item-competitors.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import { FormFeedbackMainDirective } from './form-feedback-main.directive';
import { PaginationComponent } from './search/pagination/pagination.component';
import {SessionService} from '../session.service';
import {AppComponent} from "../app.component";


@NgModule({
  imports: [
    CommonModule,
    mainRouting,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule.forRoot()
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
                  PriceReportsComponent,
                  PriceReportDetailComponent,
                  TransactionHistoryComponent,
                  TextSearchHitsComponent,
                  HelpRequestFormComponent,
                  MyItemsComponent,
                  ItemCompetitorsComponent,
                  FormFeedbackMainDirective,
                  PaginationComponent]
})
export class MainAreaModule { }
