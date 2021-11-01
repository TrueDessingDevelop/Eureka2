import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService as Auth0} from '@auth0/auth0-angular';

import { User } from 'src/app/core/user/model/user';
import { Session } from '../../model/session';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'auth0-login',
  templateUrl: './auth0-login.component.html',
  styleUrls: ['./auth0-login.component.css']
})
export class Auth0LoginComponent implements OnInit {

  form: FormGroup;
  msg:string ="";
  session:Session ={token:'',user:new User()};

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private auth: AuthService,
    private auth0: Auth0,
    private apiStorage:StorageService

  ) {
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  google(){
  
    this.auth0.buildAuthorizeUrl({  connection: 'google-oauth2'}).subscribe(x=>{
      window.location.assign(x)
    });
  }

  onSubmit(): any {
    this.auth.login(this.form.value)
      .subscribe((res) => {
        if(res['msg']){
          this.msg = res.msg;
        }else{
          this.session = this.apiStorage.loadSessionData();
          
          if(!this.session){
            this.apiStorage.setCurrentSession(this.session);
            this.session = this.apiStorage.getCurrentSession();
            console.log(this.session);
          }
          this.msg = "Login Successfull";
          //this.ngZone.run(() => this.router.navigateByUrl('/'))
          console.log('Login successfull')
        }
      }, (err) => {
        console.log(err);
      });
  }

}