import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as Auth0} from '@auth0/auth0-angular';
import { isEmpty } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { User } from 'src/app/core/user/model/user';
import { ApiUserService } from 'src/app/core/user/services/api-user.service';

@Component({
  selector: 'site-landing',
  templateUrl: './site-landing.component.html',
  styleUrls: ['./site-landing.component.css']
})
export class SiteLandingComponent implements OnInit {
  
  

  isAuth0:Boolean = false;
  isLoged:Boolean = false;
  constructor(private router: Router,
    private ngZone: NgZone,
    private apiUser: ApiUserService,
    public auth0: Auth0,private auth: AuthService){}
  
  ngOnInit() {
    this.auth0.user$.subscribe(user=>{
      if(user){
        this.isAuth0 = true;
        this.isLoged = true;
        this.apiUser.GetByEmail(user.email).subscribe(x=>{
          
          if(Object.keys(x).length === 0){
            console.log("No existe usuario en nuestra base de datos");
            let newUser:User =new User();
            newUser.newUserByAuth0(user.name,user.email);
            this.apiUser.Add(newUser).subscribe(data=>{
              this.apiUser.GetByEmail(user.email).subscribe(x=>{
                newUser = x[0];
               
                this.ngZone.run(() => this.router.navigateByUrl('user/update/'+ newUser._id+"/new"));
              });
              
            });
            
          }
          
        });
      }
    });
   }

}
