import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteNavbarComponent } from './components/site-navbar/site-navbar.component';
import { SiteLandingComponent } from './components/site-landing/site-landing.component';
import { SiteRoutingModule } from './site-routing.module';
import { CoreModule } from '../core/core.module';
import { AuthModule } from '@auth0/auth0-angular';



@NgModule({
  declarations: [
    SiteNavbarComponent,
    SiteLandingComponent,
    
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    CoreModule
  ],
  exports:[
    SiteNavbarComponent,
    SiteLandingComponent
  ]
})
export class SiteModule { }
