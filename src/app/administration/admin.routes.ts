import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdministrationComponent
    }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);