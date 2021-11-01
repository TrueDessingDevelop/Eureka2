import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserAddComponent,
    UserDetailComponent,
    SetPasswordComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  exports:[
    UserListComponent,
    UserAddComponent,
    UserDetailComponent,
    SetPasswordComponent,
    UserProfileComponent
  ]
})
export class UserModule { }
