import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAreaComponent } from './main-area.component';
import { MainHomeComponent } from './main-home/main-home.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainAreaComponent,
    children: [
      {
        path: 'main-home',
        component: MainHomeComponent
      }
    ]
  }
];
export const mainRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);