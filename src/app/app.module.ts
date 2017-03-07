import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//non-core components and routing
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing, appRoutingProviders } from './app.routes';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuardService } from './main-area/auth-guard.service';
import { AuthGuardAdminService } from './administration/auth-guard-admin.service';

//non-core services
import { CurrentActivityService } from './current-activity.service';
import { CustomerRequestsService } from './customer-requests.service';
import { OrderSubmissionService } from './order-submission.service';
import { PriceReportService } from './price-report.service';
import { SearchService } from './search.service';
import { SessionService } from './session.service';
import { TransactionHistoryService } from './transaction-history.service';
import { UserService } from './user.service';
//Angular2 Material
import { MaterialModule} from '@angular/material';
//HammerJS
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
              UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
