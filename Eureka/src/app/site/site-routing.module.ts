import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Auth0LoginButtonComponent } from '../core/auth/components/auth0-login-button/auth0-login-button.component';
import { Auth0LoginComponent } from '../core/auth/components/auth0-login/auth0-login.component';
import { LoginComponent } from '../core/auth/login/login.component';
import { RegisterComponent } from '../core/auth/register/register.component';
import { UserDetailComponent } from '../core/user/user-detail/user-detail.component';
import { UserProfileComponent } from '../core/user/user-profile/user-profile.component';
import { SiteLandingComponent } from './components/site-landing/site-landing.component';
import { ExpenseAddComponent } from './expense/expense-add/expense-add.component';
import { ExpenseDetailComponent } from './expense/expense-detail/expense-detail.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';

// Import the authentication guard
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { 
    path: '', 
    component: SiteLandingComponent,
    children: [
      { 
        path: 'user', 
        // Protect a route by registering the auth guard in the `canActivate` hook
        canActivate: [AuthGuard],
        children: [
            {path: 'profile', component: UserProfileComponent},
            {path: 'update/:id', component: UserDetailComponent},
            {path: 'update/:id/:new', component: UserDetailComponent}
        ]
      },
      { 
        path: 'auth', 
        children: [
            {path: 'login', component: Auth0LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
      }, 
      { 
        path: 'expense', 
        // Protect a route by registering the auth guard in the `canActivate` hook
        canActivate: [AuthGuard],
        children: [
            {path: 'list/:id', component: ExpenseListComponent},
            {path: 'add', component: ExpenseAddComponent},
            {path: 'update/:id', component: ExpenseDetailComponent}
        ]
      },
    ] 
   
  },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
