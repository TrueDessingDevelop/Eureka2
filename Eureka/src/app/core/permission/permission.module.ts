import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionDetailComponent } from './permission-detail/permission-detail.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PermissionListComponent,
    PermissionAddComponent,
    PermissionDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PermissionRoutingModule
  ],
  exports:[
    PermissionListComponent,
    PermissionAddComponent,
    PermissionDetailComponent
  ]
})
export class PermissionModule { }
