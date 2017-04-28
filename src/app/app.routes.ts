import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';
import { HomeComponent }               from './home/home.component';
import { RegistrationComponent }       from './registration/registration.component';
import { PasswordRetrievalComponent } from './registration/password-retrieval/password-retrieval.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'retrieve-password', component: PasswordRetrievalComponent},
    { path: 'main-area', loadChildren: './main-area/main-area.module#MainAreaModule'},
    { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule' },
    { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
