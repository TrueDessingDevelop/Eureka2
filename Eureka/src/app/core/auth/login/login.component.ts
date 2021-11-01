import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user/model/user';
import { Session } from '../model/session';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  msg:string ="";
  session:Session ={token:'',user:new User()};

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private Auth: AuthService,
    private apiStorage:StorageService

  ) {
    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  onSubmit(): any {
    this.Auth.login(this.form.value)
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
          
        }
      }, (err) => {
        console.log(err);
      });
  }

}