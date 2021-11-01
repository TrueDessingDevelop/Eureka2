import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { RolModule } from './rol/rol.module';
import { PermissionModule } from './permission/permission.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    RolModule,
    PermissionModule,
    DashboardModule,
    UserModule 
  ],exports:[
    DashboardModule,
    UserModule,
    PermissionModule,
    RolModule,
    AuthModule
  ]
})
export class CoreModule { }
