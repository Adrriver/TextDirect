import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAreaComponent } from './main-area.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { mainRouting } from './main-area.routes';

@NgModule({
  imports: [
    CommonModule,
    mainRouting
  ],
  declarations: [MainAreaComponent, MainHomeComponent]
})
export class MainAreaModule { }
