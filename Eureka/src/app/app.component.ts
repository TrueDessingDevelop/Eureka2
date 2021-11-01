import { Component, Input,OnInit } from '@angular/core';
import { concatMap, tap, pluck } from 'rxjs/operators';

// Import the HttpClient for making API requests
import { HttpClient } from '@angular/common/http';

import { AuthService as Auth0Service} from '@auth0/auth0-angular';
import { AuthInterceptorService } from './core/auth/services/auth.interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eureka';
  isAuth0:Boolean = false;
  metadata:any = {};

  constructor(public auth0: Auth0Service,private http: HttpClient){}
  
  ngOnInit() {
    this.auth0.user$.pipe(
      concatMap((user) => 
         
        // Use HttpClient to make the call
        this.http.get(
          encodeURI(`https://dev-truedessing.eu.auth0.com/api/v2/users/${user}`)
        )
        
        ),
      pluck('user_metadata'),
      tap((meta) => (this.metadata = meta))
    ).subscribe(user=>{
      if(user){
        this.isAuth0 = true;
        console.log(this.metadata);
      }
    });
   }

   
}
