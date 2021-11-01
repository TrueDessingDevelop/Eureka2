import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolListComponent } from './rol-list/rol-list.component';
import { RolAddComponent } from './rol-add/rol-add.component';
import { RolDetailComponent } from './rol-detail/rol-detail.component';
import { RolRoutingModule } from './rol-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RolListComponent,
    RolAddComponent,
    RolDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RolRoutingModule,

  ],
  exports:[
    RolListComponent,
    RolAddComponent,
    RolDetailComponent
  ]
})
export class RolModule { }
