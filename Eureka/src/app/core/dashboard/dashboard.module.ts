import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavmenuComponent } from './navmenu/navmenu.component';



@NgModule({
  declarations: [
    LandingComponent,
    NavmenuComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports:[
    LandingComponent
  ]
  
})
export class DashboardModule { }
