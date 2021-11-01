import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private Auth: AuthService

  ) {
    this.form = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      repassword: ['']
    })
  }

  ngOnInit() { }

  onSubmit(): any {
    this.Auth.register(this.form.value)
      .subscribe(() => {
        console.log('Register successfull')
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      }, (err) => {
        console.log(err);
      });
  }

}