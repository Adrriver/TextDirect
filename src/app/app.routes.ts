import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';
import { HomeComponent }               from './home/home.component';
import { RegistrationComponent }       from './registration/registration.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'main-area', loadChildren: './main-area/main-area.module#MainAreaModule' },    
    { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule' },
    { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);