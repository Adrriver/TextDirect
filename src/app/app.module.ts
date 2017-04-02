import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//non-core components and routing
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing, appRoutingProviders } from './app.routes';
import { RegistrationComponent } from './registration/registration.component';
import { CreditFormComponent } from './registration/credit-form/credit-form.component';
import { AuthGuardService } from './main-area/auth-guard.service';

//non-core services
import { AuthGuardAdminService } from './administration/auth-guard-admin.service';
import { CurrentActivityService } from './current-activity.service';
import { CustomerRequestsService } from './customer-requests.service';
import { OrderSubmissionService } from './order-submission.service';
import { PriceReportService } from './price-report.service';
import { SearchService } from './search.service';
import { SessionService } from './session.service';
import { TransactionHistoryService } from './transaction-history.service';
import { ChildServiceService } from './child-service.service';
//Angular2 Material
import { MaterialModule } from '@angular/material';
//HammerJS
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    CreditFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [appRoutingProviders,
              AuthGuardService,
              AuthGuardAdminService,
              CurrentActivityService,
              CustomerRequestsService,
              OrderSubmissionService,
              PriceReportService,
              SearchService,
              SessionService,
              TransactionHistoryService,
              ChildServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
