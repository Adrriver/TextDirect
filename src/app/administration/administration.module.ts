import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration/administration.component';
import { CustomerServiceRequestsComponent } from './customer-service-requests/customer-service-requests.component';
import { CustomerServiceRequestDetailComponent } from './customer-service-request-detail/customer-service-request-detail.component';
import { UserAccountDetailComponent } from './user-account-detail/user-account-detail.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { adminRouting } from './admin.routes';

@NgModule({
  imports: [
      CommonModule,
      adminRouting
  ],
  declarations: [AdministrationComponent,
                CustomerServiceRequestsComponent,
                CustomerServiceRequestDetailComponent,
                UserAccountDetailComponent,
                UserAccountsComponent],
})
export class AdministrationModule { }
