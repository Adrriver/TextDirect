import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { CustomerServiceRequestDetailComponent } from './customer-service-request-detail/customer-service-request-detail.component';
import { UserAccountDetailComponent } from './user-account-detail/user-account-detail.component';
import { AuthGuardAdminService } from './auth-guard-admin.service';
import { AuthGuardService } from '../main-area/auth-guard.service';

const adminRoutes: Routes = [
    { path: '', component: AdministrationComponent, canActivate: [AuthGuardService, AuthGuardAdminService] },
    { path: 'detail/:id', component: CustomerServiceRequestDetailComponent, canActivate: [AuthGuardService, AuthGuardAdminService] },
    { path: 'detail/:id', component: UserAccountDetailComponent, canActivate: [AuthGuardService, AuthGuardAdminService] }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);
