import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionAddComponent } from '../permission/permission-add/permission-add.component';
import { PermissionDetailComponent } from '../permission/permission-detail/permission-detail.component';
import { PermissionListComponent } from '../permission/permission-list/permission-list.component';
import { RolAddComponent } from '../rol/rol-add/rol-add.component';
import { RolDetailComponent } from '../rol/rol-detail/rol-detail.component';
import { RolListComponent } from '../rol/rol-list/rol-list.component';
import { SetPasswordComponent } from '../user/components/set-password/set-password.component';
import { UserAddComponent } from '../user/user-add/user-add.component';
import { UserDetailComponent } from '../user/user-detail/user-detail.component';
import { UserListComponent } from '../user/user-list/user-list.component';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { LandingComponent } from './landing/landing.component';

// Import the authentication guard
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { 
    path: 'dashboard', 
    // Protect a route by registering the auth guard in the `canActivate` hook
    canActivate: [AuthGuard],
    component: LandingComponent,
    children: [
      { 
        path: 'rol', 
        children: [
            {path: 'list', component: RolListComponent},
            {path: 'add', component: RolAddComponent},
            {path: 'update/:id', component: RolDetailComponent}
        ]
      },
      { 
        path: 'permission', 
        children: [
            {path: 'list', component: PermissionListComponent},
            {path: 'add', component: PermissionAddComponent},
            {path: 'update/:id', component: PermissionDetailComponent}
        ]
      },
      { 
        path: 'user', 
        children: [
            {path: 'list', component: UserListComponent},
            {path: 'add', component: UserAddComponent},
            {path: 'setpwd/:id', component: SetPasswordComponent},
            {path: 'update/:id', component: UserDetailComponent},
            {path: 'profile/:id', component: UserProfileComponent}
        ]
      },
    ] 
   
  },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
