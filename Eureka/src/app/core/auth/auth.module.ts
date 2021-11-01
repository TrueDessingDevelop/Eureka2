import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthModule as Auth0 } from '@auth0/auth0-angular';

import { Auth0LoginButtonComponent } from './components/auth0-login-button/auth0-login-button.component';
import { Auth0LoginComponent } from './components/auth0-login/auth0-login.component';
import { Auth0LogoutButtonComponent } from './components/auth0-logout-button/auth0-logout-button.component';

// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Auth0LoginComponent,
    Auth0LoginButtonComponent,
    Auth0LogoutButtonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    Auth0.forRoot({
      domain: 'dev-truedessing.eu.auth0.com',
      clientId: '3o2ibIGy48PIxjuuVnM4U9zsEnOJTbm5',

      // Request this audience at user authentication time
      audience: 'dev-truedessing.eu.auth0.com/api/v2/',

      // Request this scope at user authentication time
      scope: 'read:current_user',

      // Specify configuration for the interceptor              
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
            uri: 'https://dev-truedessing.eu.auth0.com/api/v2/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'https://dev-truedessing.eu.auth0.com/api/v2/',

              // The attached token should have these scopes
              scope: 'read:current_user'
            }
          }
        ]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    Auth0LoginComponent,
    Auth0LoginButtonComponent,
    Auth0LogoutButtonComponent
  ],providers:[  { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }]
})
export class AuthModule { }
